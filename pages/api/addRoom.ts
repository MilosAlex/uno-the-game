import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = client.db("unodb");
    const { name, hostId } = req.body;

    if (!hostId) {
      res.status(400).json({ message: "Missing hostId" });
      return;
    }

    const room = await db.collection("rooms").insertOne({
      hostId: new ObjectId(hostId),
      name,
    });

    res.json(room);
  } catch (e) {
    console.error(e);
    //throw new Error(e).message;
  }
};
