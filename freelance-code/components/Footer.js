import React from "react";
import Link from "next/link";
import Router from "next/router";

function handleClick() {
  Router.push("/about");
}

const Footer = () => {
  return (
    <footer className="bottom-0 bg-coBlue mt-auto w-full">
      <div className="max-w-5xl mx-auto text-white px-4 py-8 flex flex-col justify-between md:space-x-24 md:flex-row">
        <div className="mb-6">
          CodeOp is a tech school that offers courses for women, trans and
          non-binary people (women+).
        </div>
        <div className="flex flex-col justify-around md:space-x-24 md:flex-row">
          <div className="flex flex-col md:space-y-3 text-white mb-6">
            <Link href="/about">
              <button onClick={handleClick}>ABOUT</button>
            </Link>
          </div>
          <div className="flex flex-col md:space-y-3 text-white mb-6">
            COMMUNITY
          </div>
          <div className="flex flex-col md:space-y-3 text-white mb-6">
            FREELANCERS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
