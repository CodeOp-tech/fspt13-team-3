//conect to mysql
const db = require("@/server/helper");

//get request to get all users from user_table AND service info 
export default async function getUsers(req, res) {
    const category = req.query.category;
    const location = req.query.location; 
    const price = req.query.price; 
    const search = req.query.search; 
    const sort = req.query.sort; 
    const skill = req.query.skill; 

    let queryString = ""; 
    if (category && category !== "all") {
        queryString += ` AND service_category = "${category}"`; 
    }
    if (location && location !== "all") {
        queryString += ` AND location = "${location}"`;
    }
    if (price && price !== "all") {
        const min = Number(price.split('-')[0]); 
        const max = Number(price.split('-')[1]);
        queryString += ` AND hourly_rate BETWEEN ${min} AND ${max}`;
    }
    if (skill && skill !== "all") {
        queryString += ` AND skills LIKE "%${skill}%"`;
    }
    if (search && search !== "") {
        queryString += ` AND service_type LIKE "%${search}%" `;
    }
    
    if (sort === "lowest") {
        queryString += ` ORDER BY hourly_rate ASC`;
    } else if (sort === "highest") {
        queryString += ` ORDER BY hourly_rate DESC`;
    } else {
        queryString += ` ORDER BY services.user_id DESC`;
    }
   
    console.log(queryString); 

    if (req.method === "GET") {
        try {
            const response = await db(`SELECT * FROM user_table, services WHERE user_table.user_id = services.user_id${queryString};`);
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


