//conect to mysql
const db = require("@/server/helper");
import getUserById from "../getUserById"
import { updateUserById } from "../updateUserById";
import { deleteUserById } from "../deleteUserById";

//handler to switch between different methods handle the user by ID
export default function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
      return getUserById(req, res);
    case "PATCH":
      return updateUserById(req, res);
    case "DELETE":
      return deleteUserById(req, res);
    default:
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
 

