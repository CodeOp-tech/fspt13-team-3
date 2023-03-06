//conect to mysql
const db = require("@/server/helper");

//get card info by ID to use in grids
export default async function getUserById(req, res) {
  const id = req.query.id;
  try {
    const user = await db(`SELECT user_table.firstname, user_table.lastname, user_table.location, services.skills FROM user_table, services WHERE user_table.user_id = services.user_id AND user_table.user_id = ${id};`);

    if (!user.data || user.data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.data[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

