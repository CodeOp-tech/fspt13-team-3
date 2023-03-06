import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link'; 
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const FIRSTNAME_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{8,24}$/;

export default function Signup() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [firstname, setFirstname] = useState(''); 
    const [validFirstname, setValidFirstname] = useState(false);
    const [firstnameFocus, setFirstnameFocus] = useState(false);

    const [email, setEmail] = useState(''); 
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [avatar, setAvatar] = useState(''); 
    const [validAvatar, setValidAvatar] = useState(false);
    const [avatarFocus, setAvatarFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidFirstname(FIRSTNAME_REGEX.test(firstname));
    }, [firstname])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, firstname, email, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/signup`,
                JSON.stringify({ username, password, email, avatar, firstname }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUsername('');
            setFirstname('');
            setEmail('');
            setAvatar('');
            setPassword('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username or Email already exist');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            {success ? (
                        <section>
                            <h1>Success!</h1>
                            <Link href="/">Login</Link>
                        </section>
                    ) : (
                <section>
                    <div>
                        <h2>Create an account</h2>
                        <div className="w-full max-w-xl">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div ref={errRef} className={errMsg ? "bg-red-100 border border-red-400 text-red-700 p-2 rounded relative text-xs mb-4" : "absolute"} aria-live="assertive">{errMsg}</div>
                            <div class="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="username">
                                Username
                                {/*
                                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validName || !username ? "hide" : "invalid"} />
                                */}
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                                 <p id="uidnote" className={userFocus && username && !validName ? "text-red-500 text-xs italic pt-2.5" : "absolute hidden"}>
                                            4 to 24 characters.<br />
                                            Must begin with a letter.<br />
                                            Letters, numbers, underscores, hyphens allowed.
                                </p>
                                </div>
                                <div class="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="firstname">Firstname
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                                <p id="uidnote" className={firstnameFocus && firstname && !validFirstname ? "text-red-500 text-xs italic pt-2.5" : "absolute hidden"}>
                                            1 to 24 characters.<br />
                                            Must begin with a letter.<br />
                                            Letters, numbers, underscores, hyphens allowed.
                                </p>
                                </div>
                                <div class="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="email">Email
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                                <p id="uidnote" className={emailFocus && email && !validEmail ? "text-red-500 text-xs italic pt-2.5" : "absolute hidden"}>
                                Please enter a valid email address.
                                </p>
                                </div>
                                <div class="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="avatar">Profile Picture
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                                </div>
                                <div class="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" 
                                htmlFor="password">
                                Password:
                                {/*
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                                */}
                                </label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "text-red-500 text-xs italic pt-2.5" : "absolute hidden"}>
                                 8 to 24 characters.<br />
                                 Must include uppercase and lowercase letters, a number and a special character.<br />
                                </p>
                                </div>
                                <div class="mb-6">
                                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_pwd">
                                 Confirm Password:
                                 {/*
                                 <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                 <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                  */}
                                 </label>
                                 <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
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
                               
                                <p id="confirmnote" className={matchFocus && !validMatch ? "text-red-500 text-xs italic pt-2.5" : "absolute hidden"}>
                                 Must match the first password input field.
                                </p>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                                <div className="block text-gray-700 text-sm mb-2">
                                        <p>Already registered? </p>
                                        <Link className="font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">Login</Link>
                                    </div>
                                </form>
                        </div>  
                    </div>
                </section>
            )}
         </div>
      );
  }