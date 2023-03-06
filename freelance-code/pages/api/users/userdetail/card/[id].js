import  getUserByCard  from "../../getUserByCard";

export default function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
      return getUserByCard(req, res);
  }
}
