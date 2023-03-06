//conect to mysql
const db = require("@/server/helper");

//get request to get all users from user_table AND service info 
export default async function getUsers(req, res) {
    const users = await db("SELECT * FROM user_table, services WHERE user_table.user_id = services.user_id;");


    res.json(users);
}

//ORDER BY user_id ASC


