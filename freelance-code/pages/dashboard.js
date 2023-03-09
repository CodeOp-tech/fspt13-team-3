import withAuth from "../components/withAuth";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  const removeToken = () => {
    localStorage.removeItem('token');
  }

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


  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/userdetail/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      console.log(response)
      removeToken();
    } catch (error) {
      setError("Oops! Something went wrong. Try again later");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <p>dashboard</p>

      <div className="flex flex-col border border-gray-400 rounded-lg p-5 bg-white">
        <div className="flex flex-col gap-3 justify-between mb-4 sm:flex-row">
          <div className="flex flex-col items-center sm:flex-row">
            <img
              className="w-32 h-32 rounded-full"
              src={user.avatar}
              alt={`profile image of ${user.firstname}`}
            />
            <div className="ml-2">
              <p className="font-medium text-lg text-coBlue">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-sm">{user.location}</p>
            </div>
          </div>
          <div>
            <div className="bg-coYellow py-1 px-4 font-bold">
              {user.hourly_rate} €/hr
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-xl">{user.service_type}</h3>
          <p>{user.description}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-lg">Portfolio</h4>
          <hr className="mb-2"></hr>
          <div className="flex flex-col gap-1 justify-between sm:flex-row">
            <div>
              <p>{user.github_url}</p>
              <p>{user.linkedin_url}</p>
              <p>{user.other_url}</p>
            </div>
            <div>
              <p>{user.resume}</p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-lg">Skills</h4>
          <hr className="mb-2"></hr>
         {/*  {user.skills.split(",").map((skill, index) => {
            return (
              <span
                key={index}
                className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-xs text-gray-900 mr-2 mb-2"
              >
                {skill}
              </span>
            );
          })} */}
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-lg">Languages</h4>
          <hr className="mb-2"></hr>
          <p>{user.languages}</p>
        </div>
        <div className="mb-4">
          <h4 className="font-bold text-lg">Contact Info</h4>
          <hr className="mb-2"></hr>
          <p>{user.email}</p>
        </div>
        <div className="flex justify-center gap-3">
          <button className="bg-coGreen hover:bg-emerald-500 text-white py-1 px-4 rounded-md">
            Edit
          </button>
          <button  onClick={() => deleteUser(user.user_id)} className=" bg-red-600 hover:bg-red-800 text-white py-1 px-4 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default withAuth(DashboardPage);
