import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Select from "react-select"; // belongs to autocomplete component
import makeAnimated from "react-select/animated"; // belongs to autocomplete component


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const FIRSTNAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
const LASTNAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
const LOCATION_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,24}$/;

export default function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [validFirstname, setValidFirstname] = useState(false);
  const [firstnameFocus, setFirstnameFocus] = useState(false);

  const [lastname, setLastname] = useState("");
  const [validLastname, setValidLastname] = useState(false);
  const [lastnameFocus, setLastnameFocus] = useState(false);

  const [location, setLocation] = useState("");
  const [validLocation, setValidLocation] = useState(false);
  const [locationFocus, setLocationFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [validAvatar, setValidAvatar] = useState(false);
  const [avatarFocus, setAvatarFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidFirstname(FIRSTNAME_REGEX.test(firstname));
  }, [firstname]);

  useEffect(() => {
    setValidLastname(LASTNAME_REGEX.test(lastname));
  }, [lastname]);

  useEffect(() => {
    setValidLocation(LOCATION_REGEX.test(location));
  }, [location]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, firstname, lastname, location, email, matchPwd]);

  const router = useRouter();

  const [userId, setUserId] = useState(null);

  /* image */
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState("");
  /* image */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);

    /* const userResponse = await createUser(); */

    try {
      const response = await createUser();
      const userId = response?.data.user_id;
      console.log("test 2", userId);


      /*     const response = await createUser();
      const userId = response?.data.user_id; */
      /*  console.log("HIIII", response?.data.user_id) */


      await axios.post(
        `http://localhost:3000/api/uploads/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    console.log(username, password);
    
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        JSON.stringify({
          username,
          password,
          email,
          avatar: image,
          firstname,
          lastname,
          location,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUserId(response?.data.user_id); // Store the user_id in state
      console.log("test1", userId);

      console.log("hi", response);
      console.log(response?.data.user_id);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      localStorage.setItem("token", response?.data?.token);
      setSuccess(true);
      router.push(`/ProfileForm`);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername("");
      setFirstname("");
      setLastname("");
      setLocation("");
      setEmail("");
      setAvatar(image);
      setPassword("");
      setMatchPwd("");
      return response;
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email already exist");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };


  const LocationOptions = [
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "Belgium", label: "Belgium" },
    { value: "Denmark", label: "Denmark" },
    { value: "Germany", label: "Germany" },
    { value: "Ireland", label: "Ireland" },
    { value: "Greece", label: "Greece" },
    { value: "Portugal", label: "Portugal" },
    { value: "Spain", label: "Spain" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "the Netherland", label: "the Netherland" },

  ];


  const animatedComponents = makeAnimated(); // belongs to autocomplete componen

  const handleLocation = (selectedLocation) => {
    setLocation((location) => ({ ...location, location: selectedLocation }));
  };
  


  return (
    <Layout navTwo={true}>
      <section>
        <div>
          <div className="w-full max-w-lg mx-auto mb-24">
            <div className="px-4 sm:px-0">
              <h2 className="text-2xl font-light mb-4 text-coBlue mt-8 sm:text-3xl">
                Create an account
              </h2>
              <div className="text-gray-900 text-sm">
                Already registered?{" "}
                <Link
                  className="underline underline-offset-2 font-medium text-sm text-coBlue hover:text-blue-800"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            </div>
            <form
              className="bg-white shadow-md rounded px-4 sm:px-8 pt-8 pb-8 mt-6 mb-4"
              onSubmit={handleSubmit}
            >
              <div
                ref={errRef}
                className={
                  errMsg
                    ? "bg-red-100 border border-red-400 text-red-700 p-2 rounded relative text-xs mb-4"
                    : "absolute"
                }
                aria-live="assertive"
              >
                {errMsg}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validName
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="firstname"
                >
                  Firstname
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="firstname"
                  ref={userRef}
                  onChange={(e) => setFirstname(e.target.value)}
                  value={firstname}
                  required
                  aria-invalid={validFirstname ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setFirstnameFocus(true)}
                  onBlur={() => setFirstnameFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    firstnameFocus && firstname && !validFirstname
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  Must have at least one character
                  <br />
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="lastname"
                >
                  Lastname
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="lastname"
                  ref={userRef}
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  required
                  aria-invalid={validLastname ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setLastnameFocus(true)}
                  onBlur={() => setLastnameFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    lastnameFocus && lastname && !validLastname
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  Must have at least one character
                  <br />
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-900 text-sm font-medium mb-2">
                  Profile picture
                  {image ? (
                  <img
                    src={
                       URL.createObjectURL(image)
                    }
                    alt="avatar"
                    className="h-16 w-16 rounded-full mb-2"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full mb-2 bg-gray-200"></div>
                )}
                  <input
                    type="file"
                    onChange={handleImage}
                    className="mt-2 block"
                  ></input>
                </label>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="location"
                >
                  Location
                </label>

                <Select
                  onChange={handleLocation}
                  //value={Location}
                  required
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={LocationOptions[0]}
                  isSingle
                  options={LocationOptions}
                />

                {/* <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="location"
                  ref={userRef}
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  required
                  aria-invalid={validLocation ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setLocationFocus(true)}
                  onBlur={() => setLocationFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    locationFocus && location && !validLocation
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  Must have at least one character
                  <br />
                </p>
              </div>
              <div className="mb-4"> */}
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="email"
                  ref={userRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validEmail
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  Please enter a valid email address.
                </p>
              </div>
              {/*   <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="avatar"
                >
                  Profile Picture
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="text"
                  id="avatar"
                  ref={userRef}
                  onChange={(e) => setAvatar(e.target.value)}
                  value={avatar}
                  required
                  aria-describedby="uidnote"
                  onFocus={() => setAvatarFocus(true)}
                  onBlur={() => setAvatarFocus(false)}
                />
              </div> */}
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-900 text-sm font-medium mb-2"
                  htmlFor="confirm_pwd"
                >
                  Confirm Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />

                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch
                      ? "text-red-500 text-xs italic pt-2.5"
                      : "absolute hidden"
                  }
                >
                  Must match the first password input field.
                </p>
              </div>
              <button
                className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md mb-4"
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
