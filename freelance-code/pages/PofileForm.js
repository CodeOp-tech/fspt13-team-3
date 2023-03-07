import { useState } from "react";

const BASE_URL = "http://localhost:3000";
export default function ProfileForm() {
  const [services, setServices] = useState({
    job_title: "",
    description: "",
    hourly_rate: 0,
    skills: "",
    languages: "",
    location: "",
    profile_image: "",
    portofolio_link: "",
    file_upload: "",
  });
}

const endpoint = '/api/users/services.js'

const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

const handleChange = (event) => {
  const inputEl = event.target;
  const name = inputEl.name;
  const value = inputEl.value;
  setService((service) => ({ ...service, [name]: value }));
};

const handleSubmit = (event) => {
  event.preventDefault();
};

const createService = async (service) => {
  try {
    await fetch(`${BASE_URL}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    setSuccess(true);

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await sleep(3000);
    setSuccess(false);

  } catch (error) {
    setError("Something went wrong! Please try again later.");
  } finally {
    setProduct({
      job_title: "",
      description: "",
      hourly_rate: 0,
      skills: "",
      languages: "",
      location: "",
      profile_image: "",
      portofolio_link: "",
      file_upload: "",
    });
  }
};

return (
  <div>
    
    {success ? ( <SuccessAlert /> ) : (

<>
    <form onSubmit={(e) => handleSubmit(e)} className="">
      <div>
        <label>
          What is your job title? 
          <input
            type="text"
            value={services.job_title}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          Add your description here:
          <input
            type="text"
            value={services.description}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          Set Hourly rate:
          <input
            type="number"
            value={services.hourly_rate}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          Set Skills
          <input
            type="text"
            placeholder="Name your skills here, ReactJS, CCS etc."
            value={services.skills}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          What languages do you speak?
          <input
            type="text"
            value={services.languages}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          Where are you located? 
          <input
            type="text"
            value={services.location}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>
        
        <label>
          Add your profile image:
          <input
            type="url"
            name="image"
            value={services.profile_image}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>

        <label>
          Add social links:
          <input
            type="url"
            name="url"
            value={services.portofolio_link}
            onChange={(e) => handleChange(e)}
          ></input>
        </label>


        {/* Image upload option goes here  */}

        <button>
          Submit
        </button>
      </div>
    </form> 
   


    </>)}
  </div> 
);

