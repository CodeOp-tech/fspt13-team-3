import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
          const response = await fetch(
            `http://localhost:3000/api/users/userdetail/${id}`,
            {
              method: "GET",
            }
          );
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
        await fetch(
        `http://localhost:3000/api/users/userdetail/${user_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempProfile),
        }
      );
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

  return (
    <>

    
      {user && tempProfile ? (
        <div className="form">
          <div>
            <label>First Name</label>
          </div>
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
            />
          </div>

          <div>
            <label>Last Name</label>
          </div>
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
            />
          </div>
          <div>
            <label>Username</label>
          </div>
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
            />
          </div>

          <div>
            <label>Email</label>
          </div>
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
            />
          </div>

          <div>
            <label>Avatar</label>
          </div>
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
            />
          </div>

          <div>
            <label>Location</label>
          </div>
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
            />
          </div>

          <div>
            <label>Service</label>
          </div>
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
            />
          </div>

          <div>
            <label>Choose a category</label>
          </div>
          <select
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
            />
          </div>

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
            />
          </div>

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
            />
          </div>

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
            />
          </div>

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
            />
          </div>

          <div>
            <input
              type="text"
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
            />
          </div>

          <div>
            <input
              type="text"
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
            />
          </div>

          <div>
            <input
              type="text"
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
            />
          </div>

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
            />
          </div>

          <div>
            <input
              type="text"
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
            />
          </div>
          {changed ? (
            <div>
              <button
                className="modal-cancel"
                onClick={(e) => {
                  setTempProfile({ ...user });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="btn-taken"
                onClick={() => updateProfile(tempProfile.user_id)}
              >
                Save changes
              </button>
            </div>
          ) : (
            <button className="modal-cancel">No changes to save</button>
          )}
        </div>
        
      ): (null)}

     
    </>
  );
};

export default EditProfile;
