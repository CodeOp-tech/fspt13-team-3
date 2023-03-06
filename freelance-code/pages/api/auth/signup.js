const db = require("@/server/helper");
const saltRounds = 10;
const bcrypt = require("bcrypt");


export default async function signup(req, res) {
    const { username, password, email, avatar, firstname } = req.body; 

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
              `INSERT INTO user_table (username, password, email, avatar, firstname) VALUES ("${username}", "${hash}", "${email}", "${avatar}", "${firstname}" );`
            );
        
            res.send({ message: "Register successful" });
          } catch (err) {
            res.status(400).send({ message: err.message });
          }
    } else {
        res.status(405).json({ message: 'We only support POST' });
      }
  }