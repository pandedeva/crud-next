import db from "../../../libs/db";
import authorization from "../../../middlewares/authorization";

// untuk read db
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = await authorization(req, res);

  const posts = await db("posts");

  res.status(200).json({
    message: "Posts data",
    data: posts,
  });
}
