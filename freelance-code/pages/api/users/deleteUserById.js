//conect to mysql
const db = require("@/server/helper");

// DELETE request to delete a user from user_table
export async function deleteUserById(req, res) {
    const id = req.query.id;
    try {
      await db(`DELETE FROM user_table WHERE user_id = ${id}`);
      res
        .status(200)
        .json({ message: `User with id ${id} deleted successfully` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
  