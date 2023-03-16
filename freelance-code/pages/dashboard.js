import withAuth from "../components/withAuth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Popup from "@/components/Popup";
import Layout from "../components/Layout";
import Link from "next/link";
import GeneralLoadingMessage from "@/components/GeneralLoadingMessage";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { BsChevronCompactRight } from 'react-icons/bs';
import SuccessMessage from "@/components/SuccessMessage";

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { successMessage } = router.query;
  const [successEmpty, setSuccessEmpty] = useState("");
  
  const [userDeleted, setUserDeleted] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    user_id: null,
  });

  const removeToken = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (successMessage) {
      setSuccessEmpty(decodeURIComponent(successMessage));
      setTimeout(() => {
        setSuccessEmpty("");
      }, 3000);
    }
  }, [successMessage]);

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

  // open edit profile page
  const openEditProfile = (user_id) => {
    router.push(`/editprofile/${user_id}`);
  };

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

  if (!user) {
    return <GeneralLoadingMessage />;
  }

  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto mb-24">
        <div className="mt-8 mb-6 px-4 sm:px-0">
            <div className="flex">
                  <Link
                  className="font-light text-sm text-coBlue hover:text-blue-800"
                  href="/"
                >
                  Home
                </Link>
                  <div className="grid place-items-center">
                    <BsChevronCompactRight className="text-coBlue text-sm w-6"/>
                  </div>
                  <Link
                  className="font-light text-sm text-coBlue hover:text-blue-800"
                  href="/dashboard"
                >
                  Your Dashboard
                </Link>
            </div>
        </div>

        <div>
          {successMessage && successEmpty.length > 0 ? (
            <SuccessMessage successMessage={successMessage} />
          ) : null}
        </div>

        {userDeleted ? (
          <div className="bg-coGrey my-1/6 mx-auto border-solid border-4 border-coGreen rounded-md w-3/4 m-0 py-10 pl-5 leading-4 font-semibold text-lg">
            Sorry to see you go! Your account has been safely deleted.
          </div>
        ) : (
          <div className="flex flex-col border border-gray-400 rounded-lg p-4 sm:p-10 bg-white">
            <div className="flex flex-col gap-3 justify-between mb-8 sm:flex-row">
            <div className="flex flex-col items-center sm:flex-row">
                <div className="p-4 sm:p-0">
                    <img
                    className="w-32 h-32 rounded-full object-cover"
                    src={user.avatar}
                    alt={`profile image of ${user.firstname}`}
                    />   
                </div>
                <div>
                    <div className="text-center sm:ml-2 sm:text-left">
                        <p className="ml-0.5 font-medium text-xl text-coBlue">{user.firstname} {user.lastname}</p>
                        <div className="flex justify-center sm:content-center sm:justify-start">
                        <div className="grid place-items-center">
                                    <MdLocationOn /></div>
                        <p className="py-1 px-1">{user.location}</p>
                        </div>
                    </div> 
                 </div>
                    
              </div>
              <div>
                    <div className="bg-coYellow py-1 px-4 font-bold w-24">{user.hourly_rate} €/hr</div>
              </div>
            </div>
            <div className="mb-8">
                  <h3 className="font-bold text-xl mb-2">{user.service_type}</h3> 
                  <p className="text-sm">{user.description}</p> 
            </div>
            <div className="mb-8">
              <h4 className="font-bold text-lg">Portfolio</h4>
              <hr className="mb-4"></hr>
              <div className="flex flex-col gap-1 justify-between text-sm sm:flex-row">
              <div>
                          {user.github_url && ( <div className="flex content-center h-10"><div className="grid place-items-center py-1 pr-1"><FaGithub className="text-xl"/></div><a className="underline text-coBlue h-10 p-2" href={`https://${user.github_url}`} rel="noreferrer" target="_blank" >{user.github_url}</a></div>)}
                          {user.linkedin_url && ( <div className="flex content-center h-10"><div className="grid place-items-center py-1 pr-1"><FaLinkedin className="text-xl"/></div><a className="underline text-coBlue h-10 p-2" href={`https://${user.linkedin_url}`} rel="noreferrer" target="_blank" >{user.linkedin_url}</a></div>)}
                          {user.other_url && ( <div className="mt-6 mb-4"><a className="underline text-coBlue" href={`https://${user.other_url}`} rel="noreferrer" target="_blank" >{user.other_url}</a></div>)}
                </div>
                <div>
                  <iframe src={user.resume} height="300" width="100%">
                    <p>
                      <em>
                        <strong>ERROR: </strong>
                        An &#105;frame should be displayed here but your browser
                        version does not support &#105;frames.{" "}
                      </em>
                      Please update your browser to its most recent version and
                      try again.
                    </p>
                  </iframe>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h4 className="font-bold text-lg">Skills</h4>
              <hr className="mb-4"></hr>
              {user.skills.split(",").map((skill, index) => {
                return (
                  <span
                    key={index}
                    className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-sm text-gray-900 mr-2 mb-2"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
            <div className="mb-8">
              <h4 className="font-bold text-lg">Languages</h4>
              <hr className="mb-4"></hr>
              <p className="text-sm">{user.languages}</p>
            </div>
            <div className="mb-4">
              <h4 className="font-bold text-lg">Contact Info</h4>
              <hr className="mb-4"></hr>
              <div className="flex content-center h-10 text-sm"><div className="grid place-items-center py-1 pr-1"><MdEmail className="text-xl"/></div><p className="underline text-coBlue h-10 p-2">{user.email}</p></div>
             
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
    </Layout>
  );
};
export default withAuth(DashboardPage);
