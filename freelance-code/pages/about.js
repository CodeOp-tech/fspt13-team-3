// import Image from 'next/image';
import Layout from "../components/Layout";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function About() {
  return (
    <Layout>
      <div className="w-full max-w-3xl mx-auto mb-24">
          <div className="px-4 sm:px-0">
              <h2 className="text-2xl font-light mb-4 text-coBlue mt-8 sm:text-3xl">About us</h2>
          </div>
          <div className="max-w-m mx-auto text-sm text-black bg-white shadow-md rounded-md overflow-hidden p-4 sm:p-10">
            <div className="mb-6">
              <p className="mb-2"><strong>Welcome to our website! </strong>We are Golde, Katja and Shauni and we are so glad you stopped by. Here is a little bit about us:</p>
              <p className="mb-2">We are Full Stack Developer bootcamp students at Codeop in Barcelona. We created this website as our final project in the bootcamp. Besides creating a great project we also wanted to create something that could developed to be used in the future. We came up with the idea of an application where
              people can access full stack, data science, and product management
              freelance services who graduated from the CodeOp bootcamp.</p>
              <p className="mb-2">On this web application you can browse freelancers by category, skillset, price, or location as a client. Or if you are a freelancer, you can make an account and upload images, a cv, and link your accounts that showcase your work.</p>
              <p className="mb-2">We would love to hear from you if you have any questions or comments. Thank you for taking the time to learn a little bit about us, and I hope that you enjoy your visit to our website!</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center">
                        <div className="p-4">
                          <img
                          className="w-40 h-40 rounded-full object-cover"
                          src="https://avatars.githubusercontent.com/u/112785177?v=4"
                          alt="Golde profile picture"
                          />   
                        </div>
                        <div>
                            <div className="text-center text-xs sm:ml-2 sm:text-left">
                                <div>
                                  <div className="flex content-center h-8">
                                    <div className="grid place-items-center py-1 pr-1">
                                      <FaGithub className="text-xl"/></div>
                                      <a className="underline text-coBlue h-8 p-2" href={`https://github.com/goldet`} rel="noreferrer" target="_blank" >https://github.com/goldet</a>
                                  </div>
                                </div>
                            </div> 
                        </div>
                        
                </div>
                <div className="flex flex-col items-center">
                        <div className="p-4">
                        <img
                        className="w-40 h-40 rounded-full object-cover"
                        src="https://ca.slack-edge.com/T03Q80R7PFY-U03T0NRUQF2-931bfa72d5ca-512"
                        alt="Katja profile picture"
                        />   
                        </div>
                        <div>
                            <div className="text-center text-xs sm:ml-2 sm:text-left">
                                <div>
                                  <div className="flex content-center h-8">
                                    <div className="grid place-items-center py-1 pr-1">
                                      <FaGithub className="text-xl"/></div>
                                      <a className="underline text-coBlue h-8 p-2" href={`https://github.com/kpo18`} rel="noreferrer" target="_blank" >https://github.com/kpo18</a>
                                  </div>
                                </div>
                            </div> 
                        </div>   
                </div>
                <div className="flex flex-col items-center">
                        <div className="p-4">
                        <img
                        className="w-40 h-40 rounded-full object-cover"
                        src="https://avatars.githubusercontent.com/u/110176140?v=4"
                        alt="Shauni profile picture"
                        />   
                        </div>
                        <div>
                            <div className="text-center text-xs sm:ml-2 sm:text-left">
                                <div>
                                  <div className="flex content-center h-8">
                                    <div className="grid place-items-center py-1 pr-1">
                                      <FaGithub className="text-xl"/></div>
                                      <a className="underline text-coBlue h-8 p-2" href={`https://github.com/Shaunivdh`} rel="noreferrer" target="_blank" >https://github.com/Shaunivdh</a>
                                  </div>
                                </div>
                            </div> 
                        </div>   
                </div>
            </div>
          </div>
      </div>
    </Layout>
  );
}
