import clientPromise from "../../lib/mongodb";

export default async (req: any, res: any) => {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    const { name, value } = req.body;

    const post = await db.collection("comments").insertOne({
      name,
      value,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
    //throw new Error(e).message;
  }
};