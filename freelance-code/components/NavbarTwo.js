import React from "react";
import Link from 'next/link'; 
import freelancecodeicon from '../public/freelancecodeicon.png'
import Image from "next/image";

const NavbarTwo = () => {
  return (
    <header className="w-full bg-coBlue border-b">
      <div className="max-w-5xl mx-auto flex justify-between py-2.5 px-4 ">
      <Link className="font-medium text-xl text-white" href="/"><Image src={freelancecodeicon} height="60" width="60" alt="freelance code logo"/></Link>
      </div>
    </header>
  );
};

export default NavbarTwo;