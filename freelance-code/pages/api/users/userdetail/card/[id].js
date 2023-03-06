import  getUserByCard  from "../../getUserByCard";


//handler for different methods that handles card details by id (unsure if we will need other methods, so may be to refactor this later)
export default function handler(req, res) {
  const method = req.method;
  switch (method) {
    case "GET":
      return getUserByCard(req, res);
  }
}
