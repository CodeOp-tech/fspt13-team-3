import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../components/Layout"; 

export default function Login() {
  const router = useRouter();
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");


  useEffect(() => {
    if (useRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
   
      console.log(response?.data);
    

      //store it locally
      localStorage.setItem("token", response?.data?.token);

     

      setUsername("");
      setPassword("");
      router.push("/dashboard");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  
    return (
      <Layout navTwo={true}>
        
                <section>
                    <div>
                        <div className="w-full max-w-lg mx-auto mb-24">
                          <div className="px-4 sm:px-0">
                              <h2 className="text-2xl font-light mb-4 text-coBlue mt-8 sm:text-3xl">Sign into your account</h2>
                              <div className="text-gray-900 text-sm">
                              Not yet a member? <Link className="underline underline-offset-2 font-medium text-sm text-coBlue hover:text-blue-800" href="/signup">Register here</Link>
                             </div>
                          </div>
                            <form className="bg-white shadow-md rounded pt-8 pb-8 mb-4 mt-6 px-4 sm:px-8" onSubmit={handleSubmit}>
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
                                    </form>     
                        </div>
                    </div>
                </section>
        
      </Layout>
    );
  }

