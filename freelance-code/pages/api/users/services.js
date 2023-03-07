// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require("@server/helper")

export default async function getServices(req,res) {
  const services=await db ("SELECT * FROM services ORDER BY type ASC;"  )
  res.json(services);
}