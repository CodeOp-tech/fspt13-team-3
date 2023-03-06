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
