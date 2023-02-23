import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = client.db("unodb");
    const { roomId, userId } = req.body;

    const room = await db
      .collection("rooms")
      .findOne({ _id: new ObjectId(roomId) });

    if (!room) {
      res.status(400).json({ message: "Room not found" });
      return;
    }
    res.json({
      ...room,
      players: room.players.filter((player: any) => player.id === userId),
      deck: undefined,
    });
  } catch (e) {
    console.error(e);
    //throw new Error(e).message;
  }
};
