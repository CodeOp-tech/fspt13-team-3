import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'; 
import { MdLogout } from 'react-icons/md';
import freelancecodeicon from '../public/freelancecodeicon.png'
import Image from "next/image";


const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const [token, setToken] = useState(""); 
const [user, setUser] = useState(null);

const handleToggle = () => {
  setIsOpen(!isOpen);
}

useEffect(() => {
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const tokenPayload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString("utf-8")
    );

    if (token) {
      setToken(token); 
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/userdetail/${tokenPayload.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  getUser();
}, []);

const router = useRouter();
const logout = () => {
  localStorage.removeItem("token");
  router.push(`/`);
  window.location.reload();
};



  return (
    <header className="w-full bg-coBlue border-b">
      <div className="max-w-5xl mx-auto flex justify-between py-2.5 px-4 ">
      <Link className="font-medium text-xl text-white" href="/"><Image src={freelancecodeicon} height="60" width="60" alt="freelance code logo"/></Link>
        <div className="hidden justify-end gap-2 sm:flex self-center">
        {token && user && (
            <>
              <button className="text-white text-sm cursor-pointer" onClick={logout}>Log out</button>
              <Link href="/dashboard">
                <img
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src={user.avatar}
                alt={`profile image of ${user.firstname}`}
                />
              </Link>
             
            </>
           )}
          {!token && !user && (
            <>
            <Link className="bg-coBlue text-white py-1.5 px-4 rounded-md cursor-pointer text-sm font-bold" href="/login">Login</Link>
            <Link className="bg-white text-black py-1.5 px-4 rounded-md cursor-pointer text-sm font-bold" href="/signup">Register</Link>
            </>
          )}
          
        </div>
        {/* Hamburger menu */}
        <div className="block hamburger sm:hidden focus:outline-none">
          <button onClick={handleToggle}
          className={`hamburger ${isOpen ? "open" : null}`}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      <div className="sm:hidden">
      <div className={`absolute flex-col items-center self-end py-8 px-4 mt-2 space-y-2.5  bg-white sm:w-auto sm:self-center left-0 right-0 drop-shadow-md ${isOpen ? "flex" : "hidden"}`}> 
      {!token && !user && (
        <>
           <Link className="w-full border border-black text-black py-2 px-4 rounded-md text-center" href="/login">Login</Link>
           <Link className="w-full bg-coGreen hover:bg-emerald-500 text-white py-2 px-4 rounded-md text-center" href="/signup">Register</Link>
        </>
       )}
      {token && user && (
        <>
            <Link href="/dashboard">
              <div className="flex items-center">
                    <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src={user.avatar}
                    alt={`profile image of ${user.firstname}`}
                    />
                    <div className="ml-2 font-bold">{user.firstname} {user.lastname}</div>
              </div>
            </Link>
            <hr className="w-full"></hr> 
            <div className="flex content-center cursor-pointer h-10" onClick={logout}>
              <div className="grid place-items-center py-1 pr-1">
              <MdLogout className="text-xl"/>
              </div>
              <div className="text-black mb-4 h-10 p-2">Log out</div>
            </div>
        </>
        )}
      </div>
      </div>
    </header>
  );
};

export default Navbar;