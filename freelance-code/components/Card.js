import React from "react";
import { useRouter } from "next/router";
import { MdLocationOn } from 'react-icons/md';



const Card = ({user}) => {
const router = useRouter();

const openUserDetail = (id) => {
    router.push(`/userdetail/${id}`);
    console.log(id)
  };

    return (
        <div className="flex flex-col border border-gray-400 rounded-lg p-5 bg-white">
                <div className="relative">
                    <div className="absolute top-0 right-0 font-medium text-xs">{user.hourly_rate}€/hr</div>
                    
                    <div className="flex justify-center mb-4">
                        <img
                        className="w-24 h-24 rounded-full object-cover"
                        src={user.avatar}
                        alt={`profile image of ${user.firstname}`}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div>
                        <p className="text-center font-bold text-lg">{user.firstname}</p>
                        <p className="text-center font-light text-base mb-2">{user.service_type}</p>
                        <div className="flex justify-center">
                            <div className="py-1 pr-1"><MdLocationOn /></div>
                            <div>
                            <p className="text-sm">{user.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-4 mb-4">
                    {user.skills.split(',').slice(0, 5).map((skill, index) => {
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
    );
};


export default Card;