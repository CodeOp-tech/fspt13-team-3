import React, { useRef, useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios";

export default function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
      }, [])
  
      useEffect(() => {
          setErrMsg('');
      }, [username, password])
  
      const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/login`,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            //store it locally
          localStorage.setItem("token", response?.data?.token);
          console.log(response?.data?.message, response?.data?.token);
            
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                </section>
            ) : (
                <section>
                    <div>
                    <h2>Login to your account</h2>
                        <div className="w-full max-w-lg mx-auto">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div ref={errRef} className={errMsg ? "bg-red-100 border border-red-400 text-red-700 p-2 rounded relative text-xs mb-4" : "absolute"} aria-live="assertive">{errMsg}</div>
                            <div className="mb-4">
                                <label className="block text-gray-900 text-sm font-medium mb-2" htmlFor="username">Username or email:</label>
                                    <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-coBlue"
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        required
                                    /> 
                                    </div>  
                                    <div className="mb-6">    
                                    <label className="block text-gray-900 text-sm font-medium mb-2"  htmlFor="password">Password:</label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:border-blue-500"
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    />
                                    </div>  
                                    <button className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md mb-4">Sign In</button>
                                    <div className="block text-gray-900 text-sm mb-2">
                                        <p>Need an account? </p>
                                        <Link className="font-medium text-sm text-coBlue hover:text-blue-800" href="/signup">Register</Link>
                                    </div>
                                    </form>
                                    
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
  }