const db = require("@/server/helper");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const supersecret = process.env.SUPER_SECRET;

export default async function login(req, res) {
    const { username, password } = req.body; 

    if (req.method === "POST") {
        try {
            const results = await db(
              `SELECT * FROM user_table WHERE username = "${username}" OR email = "${username}"`
            );
            const user = results.data[0];
            
            if (user) {
              const user_id = user.user_id;
              const correctPassword = await bcrypt.compare(password, user.password);
              
              if (correctPassword) {
                const token = jwt.sign({ user_id }, supersecret);
                res.send({ message: "Login successful, here is your token", token, user_id });
              } else {
                res.status(401).send("Unauthorized");
              }
            } else {
              res.status(404).send()
            }
          } catch (err) {
            res.status(400).send({ message: err.message });
          }
  }
}