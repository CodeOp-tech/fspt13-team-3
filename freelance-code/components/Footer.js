import React from "react";
import Link from 'next/link'; 

const Footer = () => {
    return (
        <footer className="bg-coBlue mt-24">
            <div className="text-white p-8 flex flex-col justify-between md:space-x-24 md:flex-row">
                <div className="mb-6">CodeOp is a tech school that offers courses for women, trans and non-binary people (women+).</div>
                <div className="flex flex-col justify-around md:space-x-24 md:flex-row">
                <div className="flex flex-col md:space-y-3 text-white mb-6">ABOUT</div>
                <div className="flex flex-col md:space-y-3 text-white mb-6">COMMUNITY</div>
                <div className="flex flex-col md:space-y-3 text-white mb-6">FREELANCERS</div>
                </div>
            </div>  
        </footer>
    );
};


export default Footer;