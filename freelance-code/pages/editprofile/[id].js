import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BASE_URL = "http://localhost:3000";

const EditProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [tempProfile, setTempProfile] = useState();
  const [changed, setChanged] = useState(false);

  const categories = [
    { name: "Full Stack", id: 1 },
    { name: "Data Science", id: 2 },
    { name: "Product Management", id: 3 },
  ];

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/userdetail/${id}`, {
          method: "GET",
        });
        const user = await response.json();
        setUser(user);
        setTempProfile(user);
      } catch (error) {
        setError(error);
      }
    };
    getUser();
  }, [id]);

  // Update item
  const updateProfile = async (user_id) => {
    try {
      await fetch(`${BASE_URL}/api/users/userdetail/${user_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempProfile),
      });
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      await sleep(2000);
      //route to other page
      router.push(`/dashboard`);
    } catch (error) {
      setError(error);
    }
  };

  const goBack = () => {
    router.push(`/dashboard`);
  }

  return (
    <>
      {user && tempProfile ? (
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h3 className="font-bold mb-4">Personal Details</h3>
            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                First Name
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.firstname}
                  name="firstname"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      firstname: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Last Name
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.lastname}
                  name="lastname"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      lastname: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Username
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.username}
                  name="username"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      username: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Email
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.email}
                  name="email"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      email: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Avatar
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.avatar}
                  name="avatar"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      avatar: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Location
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.location}
                  name="location"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      location: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <h3 className="font-bold mb-4">Portfolio</h3>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Job title
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.service_type}
                  name="service_type"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      service_type: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Choose a category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400"
                name="category"
                value={tempProfile.service_category}
                onChange={(e) => {
                  setChanged(true);
                  setTempProfile({
                    ...tempItem,
                    service_category: e.target.value,
                  });
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                About you
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.description}
                  name="description"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      description: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                What languages do you speak?
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.languages}
                  name="languages"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      languages: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Hourly Rate
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.hourly_rate}
                  name="hourly_rate"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      hourly_rate: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Skills
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.skills}
                  name="skills"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      skills: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Github
              </label>
              <div>
                <input
                  type="url"
                  value={tempProfile.github_url}
                  name="github_url"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      github_url: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Linkedin
              </label>
              <div>
                <input
                  type="url"
                  value={tempProfile.linkedin_url}
                  name="linkedin_url"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      linkedin_url: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Additional links
              </label>
              <div>
                <input
                  type="url"
                  value={tempProfile.other_url}
                  name="other_url"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      other_url: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Resume
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.resume}
                  name="resume"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      resume: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-900 text-sm font-medium mb-2">
                Add additional files or images to showcase your work
              </label>
              <div>
                <input
                  type="text"
                  value={tempProfile.images}
                  name="images"
                  maxLength="225"
                  onChange={(e) => {
                    setChanged(true);
                    setTempProfile({
                      ...tempProfile,
                      images: e.target.value,
                    });
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                />
              </div>
            </div>

            {changed ? (
              <div>
                <button
                  className="w-full bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md mb-4"
                  onClick={(e) => {
                    setTempProfile({ ...user });
                    setChanged(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md mb-4"
                  onClick={() => updateProfile(tempProfile.user_id)}
                >
                  Save changes
                </button>
              </div>
            ) : (
              <button
                className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md mb-4"
                onClick={() => goBack(tempProfile.user_id)}
              >
                No changes to save
              </button>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProfile;
