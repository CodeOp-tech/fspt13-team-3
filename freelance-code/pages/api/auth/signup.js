const db = require("@/server/helper");
const saltRounds = 10;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const supersecret = process.env.SUPER_SECRET;


export default async function signup(req, res) {
    const { username, password, email, avatar, firstname, lastname, location } = req.body; 

    if (req.method === "POST") {
          const results = await db(
            `SELECT * FROM user_table WHERE username = "${username}" OR email = "${email}";`
          );
          const user = results.data[0];
          if (user) {
            res.status(409).send("User already exists");
            return;
          }
        
          try {
            const hash = await bcrypt.hash(password, saltRounds);
        
            await db(
              `INSERT INTO user_table (username, password, email, avatar, firstname, lastname, location) VALUES ("${username}", "${hash}", "${email}", "${avatar}", "${firstname}", "${lastname}", "${location}" );`
            );

            const results = await db(
              `SELECT * FROM user_table WHERE username = "${username}" OR email = "${username}"`
            );
            const user = results.data[0];
            const user_id = user.user_id;
            const token = jwt.sign({ user_id }, supersecret);
            res.send({ message: "Register successful, here is your token", token, user_id });
          } catch (err) {
            res.status(400).send({ message: err.message });
          }
    } else {
        res.status(405).json({ message: "We only support POST" });
      }
  }