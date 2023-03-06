//conect to mysql
const db = require("@/server/helper");

//get user by ID
export default async function getUserById(req, res) {
  const id = req.query.id;
  try {
    const user = await db(`SELECT * FROM user_table, services WHERE user_table.user_id = services.user_id AND user_table.user_id = ${id};`);
  console.log(user.data)
    if (!user.data || user.data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.data[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
