import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get all freelancers
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json(); 
      setUsers(users.data)
      console.log(users.data)
    } catch(error) {
      setError("Oops, something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Open User Detail
  const router = useRouter();

  const openUserDetail = (id) => {
    router.push(`/userdetail/${id}`);
    console.log(id)
  };





  return (
    <>
      <Navbar/>
      {/* Hero section */}
      <section className="bg-coBlue text-white px-6">
       <div className="w-full max-w-5xl mx-auto">
          <div className="w-full mx-auto flex flex-col-reverse items-center py-9 gap-6 sm:flex-row">
            <div className="">
              <h1 className="font-bold text-xl sm:text-2xl">Find freelance services from our CodeOp Bootcamp alumni network</h1>
              <div>search</div>
            </div>
            <div className="">
              <img
                className="w-full rounded w-64 sm:w-96"
                src="https://codeop.tech/wp-content/uploads/2021/06/learn@2x.png"
                alt="CodeOp Community"
              />
            </div>
          </div>
         </div>
        </section>
      {/* Freelancer Grid */}
      <div className="w-full max-w-5xl mx-auto">
      <h2 className="text-2xl mt-6 mb-6">Our freelancers</h2>
       {/* Category Selection */}
      <div className="flex flex-col sm:flex-row mb-6 gap-2">
        <div className="flex items-center bg-coBlue border rounded p-2">
          <div className="border-r border-white pr-2 pl-1"><img className="w-6 h-6" src="https://codeop.tech/wp-content/uploads/2023/01/coding-1-1.svg"/></div>
          <div className="p-2 text-white text-sm">Full Stack Development</div>
        </div>
        <div className="flex items-center bg-coGreen border rounded p-2">
          <div className="border-r border-white pr-2 pl-1"><img className="w-6 h-6" src="https://codeop.tech/wp-content/uploads/2023/01/data-scicence-2-1.svg"/></div>
          <div className="p-2 text-white text-sm">Data Science</div>
        </div>
        <div className="flex items-center bg-coPurple border rounded p-2">
          <div className="border-r border-white pr-2 pl-1"><img className="w-6 h-6" src="https://codeop.tech/wp-content/uploads/2023/01/product-management-1-1.svg"/></div>
          <div className="p-2 text-white text-sm">Product Management</div>
        </div>
      </div>
       {/* END Category Selection */}
       {/* Filters */}
       <div className="flex flex-row mb-6 gap-2">
       <div className="bg-white border border-black rounded">
       <select>
          <option defaultValue>Location</option>
          <option>Barcelona</option>
          <option>London</option>
      </select>
      </div>
      <div className="mx-2 bg-white border border-black rounded">
      <select>
          <option defaultValue>Skills</option>
          <option>Skill1</option>
          <option>Skill2</option>
      </select>
      </div>
      <div className="mx-2 bg-white border border-black rounded">
      <select>
          <option defaultValue>Budget</option>
          <option>Bracket 1</option>
          <option>Bracket 2</option>
      </select>
      </div>
      </div>
       {/* END Filters */}
       {/* Sort */}
       <div className="flex justify-between">
       <div className="font-bold text-gray-500 text-sm mb-4">{users.length} freelancers available</div>
       <div className="text-sm">Sort by <span className="font-bold">Newest Arrivals</span></div>
       </div>
       {/* END Sort */}
        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => {
            return (
              <div className="flex flex-col border border-gray-400 rounded-lg p-5 bg-white" key={index}>
                  <div className="relative">
                    <div className="absolute top-0 right-0 font-medium text-xs">{user.hourly_rate}€/hr</div>
                  
                    <div className="flex justify-center mb-4">
                      <img
                    className="w-24 h-24 rounded-full"
                    src={user.avatar}
                    alt={`profile image of ${user.firstname}`}
                      />
                    </div>
                  </div>
                
                <p className="text-center font-bold text-lg">{user.firstname}</p>
                <p className="text-center font-light text-base mb-2">{user.service_type}</p>
                <div>
                <p className="text-center font-normal text-sm">{user.location}</p>
                </div>
                <div className="mt-4 mb-4">
                {user.skills.split(',').map((skill, index) => {
                  return (
                    <span key={index} className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-xs text-gray-900 mr-2 mb-2">
                      {skill}
                    </span>
                  )
                })}
                </div>
                <div className="mt-auto flex justify-center">
                <button onClick={() => openUserDetail(user.user_id)} className="bg-coGreen hover:bg-emerald-500 text-sm text-white py-1 px-4 rounded-md">
                  See more
                </button>
                </div>
              </div>
            )
          })}
        </div>
         {/* END Grid */}
        <div className="mt-auto flex justify-center">
                <button className="mt-6 border border-black text-sm text-black py-1 px-4 rounded-md">
                See all freelancers →
                </button>
        </div>
      </div>
      <Footer/>
    </>
  )
}
