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
                        <div>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">Username or email:</label>
                                    <input
                                        type="text"
                                        id="username"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        required
                                    />         
                                    <label htmlFor="password">Password:</label>
                                    <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    />
                                    <button>Sign In</button>
                                    </form>
                                    <p>
                                        Need an account?<br />
                                        <Link href="/signup">Register</Link>
                                    </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
  }