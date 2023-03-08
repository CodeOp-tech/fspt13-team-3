import withAuth from "../components/withAuth";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const tokenPayload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf-8")
      );

      if (token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/userdetail/${tokenPayload.user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>

      <div className="name-location-hourlyrate">
        {/* change to image tag later  */}
        <div>{user.avatar}</div>
        <h1>
          {user.firstname} {user.lastname ? <h1>{user.lastname}</h1> : null}
        </h1>
        <p>{user.locaton}</p>
        <p>{user.hourly_rate}/hour</p>
      </div>

      <div className="service-info">
        <h1>{user.service_type}</h1>
        <p>{user.description}</p>
      </div>

      <div className="portfolio-section"></div>
      <p>{user.resume}</p>
      <p>{user.github_url}</p>
      <p>{user.linkedin_url}</p>
      <p>{user.other_url}</p>
      
      <p>{user.skills}</p>
      <p>{user.languages}</p>
      <p>Contact: {user.email}</p>

      <buton>Edit</buton>
      <button>Delete Profile</button>
    </section>
  );
};
export default withAuth(DashboardPage);
