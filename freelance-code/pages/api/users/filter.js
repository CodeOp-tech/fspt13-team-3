//conect to mysql
const db = require("@/server/helper");

//get request to get all users from user_table AND service info 
export default async function category(req, res) {
    const category = req.query.category;

    if (req.method === "GET") {
        if (category) {
            try {
                const response = await db(`SELECT * FROM user_table, services WHERE user_table.user_id = services.user_id AND service_category = "${category}";`);
                const users = response.data; 
          
                if (!users) {
                  res.status(404).send("No matches found");
                  return; 
                }
                res.send(response.data);
              } catch(error) {
                res.status(500).send(error);
              }
        }
    }
}

//ORDER BY user_id ASC