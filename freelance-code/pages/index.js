import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

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
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div>
      <h2>Browse our Freelancers</h2>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => {
            return (
              <div className="flex flex-col border border-gray-400 rounded-lg p-5" key={index}>
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
      </div>
    </div>
    </>
  )
}
