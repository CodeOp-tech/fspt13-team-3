import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout"; 

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
      <div className="w-full max-w-3xl mx-auto">
      <p>this is the user detail page</p>
      {user ? (
          <div className="flex flex-col border border-gray-400 rounded-lg p-5 bg-white">
              <div className="flex flex-col gap-3 justify-between mb-4 sm:flex-row">
                  <div className="flex flex-col items-center sm:flex-row">
                  <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={user.avatar}
                  alt={`profile image of ${user.firstname}`}
                  />   
              <div className="ml-2">
                  <p className="font-medium text-lg text-coBlue">{user.firstname} {user.lastname}</p>
                  <p className="text-sm">{user.location}</p>
              </div> 
              </div>
              <div>
                  <div className="bg-coYellow py-1 px-4 font-bold">{user.hourly_rate} €/hr</div>
              </div>
              </div>
              <div className="mb-4">
                  <h3 className="font-bold text-xl">{user.service_type}</h3> 
                  <p>{user.description}</p> 
              </div>
              <div className="mb-4">
                  <h4 className="font-bold text-lg">Portfolio</h4> 
                  <hr className="mb-2"></hr>
                  <div className="flex flex-col gap-1 justify-between sm:flex-row">
                      <div>
                          <p>Github Link</p>
                          <p>LinkedIn Link</p>
                          <p>Personal Website Link</p>
                      </div>
                      <div>
                          <p>{user.resume}</p>
                      </div>
                  </div>
              </div>
              <div className="mb-4">
              <h4 className="font-bold text-lg">Skills</h4> 
              <hr className="mb-2"></hr>
              {user.skills.split(',').map((skill, index) => {
                    return (
                      <span key={index} className="inline-block bg-coGrey rounded-full px-3 py-0.5 text-xs text-gray-900 mr-2 mb-2">
                        {skill}
                      </span>
                    )
                  })}
              </div>
              <div className="mb-4">
                  <h4 className="font-bold text-lg">Languages</h4> 
                  <hr className="mb-2"></hr>
                  <p>{user.languages}</p>
              </div>
              <div className="mb-4">
                  <h4 className="font-bold text-lg">Contact Info</h4> 
                  <hr className="mb-2"></hr>
                  <p>{user.email}</p>
              </div>
              <div className="flex justify-center">
                  <button className="bg-coGreen hover:bg-emerald-500 text-white py-1 px-4 rounded-md">
                    Contact
                  </button>
                  </div>
          </div>
      ) : null}
      </div>
    </Layout>
  );
}