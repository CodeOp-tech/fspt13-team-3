import withAuth from "../components/withAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Popup from "@/components/Popup";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    user_id: null,
  });

  const removeToken = () => {
    localStorage.removeItem("token");
  };
  const router = useRouter();

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
        } catch (error) {}
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  // trigger popup
  const handleDelete = (user_id) => {
    setPopup({
      show: true,
      user_id,
    });
  };

  const handleDeleteTrue = async (user_id) => {
    if (popup.show && popup.user_id) {
      try {
        await fetch(
          `http://localhost:3000/api/users/userdetail/${popup.user_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setPopup({
          show: false,
          user_id: null,
        });
        /* console.log(response) */
        removeToken();

        setUserDeleted(true);
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }

        await sleep(2000);
        router.push("/");
      } catch (error) {
        setError("Oops! Something went wrong. Try again later");
      }
    }
  };

  // cancel delete request
  const handleDeleteFalse = () => {
    setPopup({
      show: false,
      user_id: null,
    });
  };

  // open edit profile page
  const openEditProfile = (user_id) => {
    router.push(`/editprofile/${user_id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {userDeleted ? (
        <div className="bg-coGrey my-1/6 mx-auto border-solid border-4 border-coGreen rounded-md w-3/4 m-0 py-10 pl-5 leading-4 font-semibold text-lg">
          Sorry to see you go! Your account has been safely deleted.{" "}
        </div>
      ) : (
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
                
                <p>{user.linkedin_url}</p>
                <p>{user.github_url}</p>
                <p>{user.other_url}</p>
                <p>{user.images}</p>
              </div>
              <div>
                <p>{user.resume}</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-bold text-lg">Skills</h4>
            <hr className="mb-2"></hr>
            {user.skills.split(",").map((skill, index) => {
              return (
                <span
                  key={index}
                  className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-xs text-gray-900 mr-2 mb-2"
                >
                  {skill}
                </span>
              );
            })}
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
            <button
              onClick={() => openEditProfile(user.user_id)}
              className="bg-coGreen hover:bg-emerald-500 text-white py-1 px-4 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.user_id)}
              className=" bg-red-600 hover:bg-red-800 text-white py-1 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {popup.show && (
        <Popup
          handleDeleteTrue={handleDeleteTrue}
          handleDeleteFalse={handleDeleteFalse}
        />
      )}
    </div>
  );
};
export default withAuth(DashboardPage);
