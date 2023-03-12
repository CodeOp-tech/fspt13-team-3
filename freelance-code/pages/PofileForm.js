import { useState, useEffect } from "react";
import axios from "axios";
import AutoCompleteComponent from "./AutoCompleteComponent";

const BASE_URL = "http://localhost:3000";

export default function ProfileForm() {
  const [services, setServices] = useState({
    job_title: "",
    description: "",
    skills: "",
    languages: "",
    hourly_rate: 0,
    resume: "",
    github_url: "",
    linkedin_url: "",
    other_url: "",
    images: "",
    user_id: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const inputEl = event.target;
    const name = inputEl.name;
    const value = inputEl.value;
    setServices((services) => ({ ...services, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const previewUrl = event.target.result;
      // Set the preview URL as a state variable or update a preview element in the DOM
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    services.user_id = userID;
    try {
      await axios.post(
        `${BASE_URL}/api/users/services`,
        JSON.stringify(services),
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
    <div>
      {success ? (
        <p>Success!</p>
      ) : (
        <>
          <div className="w-full max-w-lg mx-auto">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
                    Set Hourly rate:
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
                    <input
                      type="text"
                      placeholder="Name your skills here, ReactJS, CCS etc."
                      name="skills"
                      value={services.skills}
                      onChange={(e) => handleChange(e)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue placeholder:text-xs placeholder:text-gray-400 placeholder:font-light"
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
                      type="text"
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
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageUpload}
                    />
                    <button type="submit">Upload</button>
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
    </div>
  );
}
