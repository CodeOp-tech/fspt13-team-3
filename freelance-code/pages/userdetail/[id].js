import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout"; 
import Link from 'next/link'; 

export default function UserDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            if (id) {
                try {
                const response = await fetch(`http://localhost:3000/api/users/userdetail/${id}`, {
                    method: "GET"
                });
                const user = await response.json(); 
                setUser(user);
                
                } catch (error) {
                setError(error);
                }
            }
        };
        getUser();
      }, [id]);


  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto mb-24">
      {user ? (
          <>
          <div className="mt-8 mb-8 px-4 sm:px-0">
          <Link className="font-light text-sm text-coBlue hover:text-blue-800" href="/">Home</Link> 
          {/* 
          <Link className="font-light text-sm text-coBlue hover:text-blue-800" href="/login">{user.service_category}</Link> */}
          </div>
          <div className="flex flex-col border border-gray-400 rounded-lg p-4 sm:p-10 bg-white">
              <div className="flex flex-col gap-3 justify-between mb-8 sm:flex-row">
                <div className="flex flex-col items-center sm:flex-row">
                    <div className="p-4 sm:p-0">
                    <img
                    className="w-32 h-32 rounded-full object-cover"
                    src={user.avatar}
                    alt={`profile image of ${user.firstname}`}
                    />   
                    </div>
                    <div className="text-center sm:ml-2 sm:text-left">
                        <p className="font-medium text-lg text-coBlue">{user.firstname} {user.lastname}</p>
                        <p className="text-sm">{user.location}</p>
                    </div> 
                </div>
                <div>
                    <div className="bg-coYellow py-1 px-4 font-bold w-24">{user.hourly_rate} €/hr</div>
                </div>
              </div>
              <div className="mb-8">
                  <h3 className="font-bold text-xl mb-2">{user.service_type}</h3> 
                  <p className="text-sm">{user.description}</p> 
              </div>
              <div className="mb-8">
                  <h4 className="font-bold text-lg">Portfolio</h4> 
                  <hr className="mb-4"></hr>
                  <div className="flex flex-col gap-1 justify-between text-sm sm:flex-row">
                      <div>
                          {user.github_url && ( <div><a className="underline text-coBlue" href={`https://${user.github_url}`} rel="noreferrer" target="_blank" >{user.github_url}</a></div>)}
                          {user.linkedin_url && ( <div><a className="underline text-coBlue" href={`https://${user.linkedin_url}`} rel="noreferrer" target="_blank" >{user.linkedin_url}</a></div>)}
                          {user.other_url && ( <div><a className="underline text-coBlue" href={`https://${user.other_url}`} rel="noreferrer" target="_blank" >{user.other_url}</a></div>)}
                      </div>
                      <div>
                          <p>{user.resume}</p>
                      </div>
                  </div>
              </div>
              <div className="mb-8">
              <h4 className="font-bold text-lg">Skills</h4> 
              <hr className="mb-4"></hr>
              {user.skills.split(',').map((skill, index) => {
                    return (
                      <span key={index} className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-sm text-gray-900 mr-2 mb-2">
                        {skill}
                      </span>
                    )
                  })}
              </div>
              <div className="mb-8">
                  <h4 className="font-bold text-lg">Languages</h4> 
                  <hr className="mb-4"></hr>
                  <p className="text-sm">{user.languages}</p>
              </div>
              <div className="mb-4">
                  <h4 className="font-bold text-lg">Contact info</h4> 
                  <hr className="mb-4"></hr>
                  <a className="text-sm underline text-coBlue" href={`mailto:${user.email}`} rel="noreferrer" target="_blank" >{user.email}</a>
              </div>
              <div className="flex justify-center">
                  <a href={`mailto:${user.email}`} rel="noreferrer" target="_blank" ><button className="bg-coGreen hover:bg-emerald-500 text-white py-1 px-4 rounded-md">Contact
                  </button></a>
              </div>
          </div>
          </>
      ) : null}
      </div>
    </Layout>
  );
}