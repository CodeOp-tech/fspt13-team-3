// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require("@/server/helper")

export default async function getServices(req, res) {
  const service_type = req.body.service_type; 
  const category = req.body.category; 
  const description = req.body.description; 
  const skills = req.body.skills; 
  const languages = req.body.languages; 
  const hourly_rate = req.body.hourly_rate; 
  const resume = req.body.resume; 
  const github_url = req.body.github_url; 
  const linkedin_url = req.body.linkedin_url; 
  const other_url = req.body.other_url; 
  const images = req.body.images; 
  const user_id = req.body.user_id; 

  if (req.method === "POST") {
    try {
      await db(
        `INSERT INTO services (service_type, service_category, description, skills, languages, hourly_rate, resume, github_url, linkedin_url, other_url, images, user_id) VALUES ("${service_type}", "${category}", "${description}", "${skills}", "${languages}", "${hourly_rate}", "${resume}", "${github_url}", "${linkedin_url}", "${other_url}", "${images}", "${user_id}" );`
      );
      res.status(201).send({ message: "Profile creation successful" });
    } catch (err) {
      res.status(500).send(err); 
    }
  } else if (req.method === "GET") {
    const services = await db ("SELECT * FROM services ORDER BY service_id ASC;") 
    res.json(services);
  } else {
    res.status(405).json({ message: "Method not supported" });
  }
}