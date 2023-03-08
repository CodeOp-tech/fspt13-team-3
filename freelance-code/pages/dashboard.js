import withAuth from "../components/withAuth";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenPayload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );

    console.log(tokenPayload.user_id);
    if (token) {
      fetch(
        `http://localhost:3000/api/users/userdetail/${tokenPayload.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error(error));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
    </div>
  );
};
export default withAuth(DashboardPage);
