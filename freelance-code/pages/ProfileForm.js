import { useState, useEffect } from "react";
import axios from "axios";
/* import AutoCompleteComponent from "./AutoCompleteComponent"; */
import Select from "react-select"; // belongs to autocomplete component
import makeAnimated from "react-select/animated"; // belongs to autocomplete component
import Layout from "../components/Layout"; 

const BASE_URL = "http://localhost:3000";

export default function ProfileForm() {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const getUserID = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const tokenPayload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString("utf-8")
      );
      setUserID(tokenPayload.user_id);
      console.log(userID);
    };

    getUserID();
  }, []);

  console.log(userID);

  const [services, setServices] = useState({
    service_type: "",
    category: "",
    description: "",
    skills: "",
    languages: "",
    hourly_rate: 0,
    resume: "",
    github_url: "",
    linkedin_url: "",
    other_url: "",
    images: "",
    user_id: ""
  });

  const categories = [
    { name: "Full Stack", id: 1 },
    { name: "Data Science", id: 2 },
    { name: "Product Management", id: 3 },
  ];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState();
  const [profileImage, setProfileImage] = useState();

  const animatedComponents = makeAnimated(); // belongs to autocomplete componen

  //Autocomplete component
  const options = [
    { value: "JavaScript", label: "Javascript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "NextJS", label: "NextJS" },
    { value: "MySQL", label: "MySQL" },
  ];

  const handleSkills = (selectedSkills) => {
    setServices((services) => ({ ...services, skills: selectedSkills }));
  };

  const handleChange = (event) => {
    const inputEl = event.target;
    const name = inputEl.name;
    const value = inputEl.type === "number" ? inputEl.valueAsNumber : inputEl.value;
    setServices((services) => ({ ...services, [name]: value })); 
  };

  console.log(services);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  /*   const handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
  }; */

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const previewUrl = event.target.result;
  //     // Set the preview URL as a state variable or update a preview element in the DOM
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    services.user_id = userID; 
    try {
      const skills = services.skills.map((skill) => skill.value).join(", ");
      await axios.post(
        `${BASE_URL}/api/users/services`,
        JSON.stringify({ ...services, skills }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(true);
    } catch (error) {
      setError("Something went wrong! Please try again later.");
    } finally {
      setServices({
        service_type: "",
        category: "",
        /* profileImage:"", */
        description: "",
        skills: "",
        languages: "",
        hourly_rate: 0,
        resume: "",
        github_url: "",
        linkedin_url: "",
        other_url: "",
        images: "",
      });
    }
  };

  return (
    <Layout navTwo={true}>
      {success ? (
        <p>Success!</p>
      ) : (
        <>
          <div className="w-full max-w-lg mx-auto mb-24">
            <div className="px-4 sm:px-0">
              <h2 className="text-2xl font-light mb-4 text-coBlue mt-8 sm:text-3xl">Almost done. Complete your profile!</h2>
              <div className="text-gray-900 text-sm">
              Complete your profile to start matching with jobs
              </div>
             </div>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4 mt-6"
            >
              <div>
                <h3 className="font-bold mb-4">Profile</h3>
                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Job title
                    <input
                      type="text"
                      name="service_type"
                      value={services.service_type}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">Category</label>
                
                <select
                  name="category"
                  value={services.category}
                  onChange={(e) => handleChange(e)}
                  className="shadow  border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                </div>

                {/* <div>      Choose your profile image
                    <label>
                      <input type="file" onChange={handleProfileImage}></input>
            </label></div> */}
                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    About you
                    <textarea
                      name="description"
                      rows="4"
                      cols="50"
                      value={services.description}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400 placeholder:font-light"
                      placeholder="Tell us about your background, education and relevant experience in the field. Max. 500 characters."
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    What languages do you speak?
                    <input
                      type="text"
                      name="languages"
                      value={services.languages}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                    />
                  </label>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Set Hourly rate (???):
                    <input
                      type="number"
                      name="hourly_rate"
                      value={services.hourly_rate}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                    />
                  </label>
                </div>

                <h3 className="font-bold mb-4">Portfolio</h3>

                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Set Skills
                    <Select
                      onChange={handleSkills}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={options[0]}
                      isMulti
                      options={options}
                    />
                  </label>
                </div>

                <div className="flex gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      Github
                      <input
                        type="url"
                        name="github_url"
                        value={services.github_url}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                      />
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-900 text-sm font-medium mb-2">
                      LinkedIn
                      <input
                        type="url"
                        name="linkedin_url"
                        value={services.linkedin_url}
                        onChange={(e) => handleChange(e)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                      />
                    </label>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Additional links
                    <input
                      type="url"
                      name="other_url"
                      value={services.other_url}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400 placeholder:font-light"
                      placeholder="Any other links, for example a personal portfolio website"
                    />
                  </label>
                </div>

                {/* TODO: Image & resume upload option  */}
                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Upload your resume
                    <input
                      type="file"
                      name="resume"
                      value={services.resume}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-900 text-sm font-medium mb-2">
                    Add additional files or images to showcase your work
                    <input type="file" name="images" onChange={handleImage} />
                    {/* <button type="submit">Upload</button>*/}
                  </label>
                </div>

                <button className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md mb-4">
                  Finish setup
                </button>
              </div>
            </form>
          </div>
        </>
      )}
     </Layout>
  );
}
