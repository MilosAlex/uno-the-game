import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import clientPromise from "../../../lib/mongodb";

interface Room {
  _id: ObjectId;
  hostId: ObjectId;
  name: string;
}

interface GameRoomProps {
  room: Room;
}

const GameRoom = (props: GameRoomProps) => {
  const { data: session }: any = useSession();
  const username = session?.user?.name;
  const user_id = session?.user?.id;
  const channel_id = "presence-" + props.room._id.toString();

  //useState for players
  const [players, setPlayers] = useState([]);

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    authEndpoint: `/api/pusher/auth`,
    auth: { params: { username, user_id } },
  });

  let channel: any;

  useEffect(() => {
    channel = pusher.subscribe(channel_id);

    // when a new member successfully subscribes to the channel
    channel.bind("pusher:subscription_succeeded", (members: any) => {
      // total subscribed
      setPlayers(membersToArray(channel.members.members as any) as any);
    });

    channel.bind("my-event", function (data: any) {
      alert(JSON.stringify(data));
    });

    console.log(channel);

    // when a new member joins the chat
    channel.bind("pusher:member_added", (member: any) => {
      console.log("count", channel.members.count);
      setPlayers(membersToArray(channel.members.members as any) as any);
    });

    // when a member leaves the chat
    channel.bind("pusher:member_removed", (member: any) => {
      console.log("count", channel.members.members);
      setPlayers(membersToArray(channel.members.members as any) as any);
    });

    return () => {
      pusher.unsubscribe(channel_id);
    };
  }, []);

  useEffect(() => {
    console.log(players);
  }, [players]);

  const membersToArray = (members: any) => {
    const membersArray = [];
    for (const id in members) {
      membersArray.push({ name: members[id].username, id });
    }
    return membersArray;
  };

  return (
    <main className="game-room">
      <h1 className="game-room__title">{props.room.name}</h1>
      <h2 className="game-room__subtitle">Players waiting in the room:</h2>
      {players.map((player: any) => (
        <p className="game-room__name" key={player.id}>{player.name}</p>
      ))}
    </main>
  );
};

export async function getServerSideProps(context: any) {
  const roomId = context.query.roomId;
  console.log(roomId);

  try {
    const client = await clientPromise;
    const db = client.db("unodb");

    const room = await db
      .collection("rooms")
      .findOne({ _id: new ObjectId(roomId) });

    console.log(room);

    return {
      props: { room: JSON.parse(JSON.stringify(room)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { room: null },
    };
  }
}

export default GameRoom;
