import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Link from "next/link";
import clientPromise from "../../lib/mongodb";

interface Room {
  _id: ObjectId;
  hostId: ObjectId;
  name: string;
}

interface RoomListProps {
  rooms: Room[];
}

const RoomList = (props: RoomListProps) => {
  return (
    <main>
      <h1 className="room-list__title">Select a room</h1>
      <section className="room-list__room__container">
        {props.rooms.map((room) => (
          <Link
            className="room-list__room"
            href={`/rooms/${room._id.toString()}`}
            key={room._id.toString()}
          >
            <h2 className="room-list__room__title">{room.name ?? room._id}</h2>
          </Link>
        ))}
      </section>
    </main>
  );
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("unodb");

    const rooms = await db.collection("rooms").find({}).toArray();

    return {
      props: { rooms: JSON.parse(JSON.stringify(rooms)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { rooms: [] },
    };
  }
}

export default RoomList;
