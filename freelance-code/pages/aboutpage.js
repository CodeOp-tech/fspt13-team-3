// import Image from 'next/image';
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div class="max-w-m mx-auto text-sm text-coBlue bg-white shadow-md rounded-md overflow-hidden">
        Welcome to our website! We are Golde, Katie and Shauni and we are so
        glad you stopped by. Here is a little bit about us: We are Full Stack
        Developer bootcamp students at Codeop in Barcelona. We created this
        website as our final project in the bootcamp. Besides creating a great
        project we also wanted to create something that could developed to be
        used in the future. We came up with the idea of an application where
        people can access full stack, data science, and product management
        freelance services who graduated from the CodeOp bootcamp. On this web
        application you can browse freelancers by category, skillset, price, or
        location as a client. Or if you are a freelancer, you can make an
        account and upload images, a cv, and link your accounts that showcase
        your work. We would love to hear from you if you have any questions or
        comments. Thank you for taking the time to learn a little bit about us,
        and I hope that you enjoy your visit to our website!
        <div class="flex justify-between">
          <img
            src="https://avatars.githubusercontent.com/u/112785177?v=4"
            alt="Golde profile picture"
            width={300}
            height={200}
            className="mx-auto max-w-full rounded-md"
          />
          <img
            src="https://ca.slack-edge.com/T03Q80R7PFY-U03T0NRUQF2-931bfa72d5ca-512"
            alt="Katja profile picture"
            width={300}
            height={200}
            className="mx-auto max-w-full rounded-md"
          />
          <img
            src="https://avatars.githubusercontent.com/u/110176140?v=4"
            alt="Shauni profile picture"
            width={300}
            height={200}
            className="mx-auto max-w-full rounded-md"
          />
        </div>
      </div>
    </Layout>
  );
}
