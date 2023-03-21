import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "../components/Card"; 
import Layout from "../components/Layout"; 
import { MdSearch } from 'react-icons/md';

const locations = [
  { name: "United Kingdom", id: 1 },
  { name: "Belgium", id: 2 },
  { name: "Denmark", id: 3 },
  { name: "Germany", id: 4 },
  { name: "Ireland", id: 5 },
  { name: "Greece", id: 6 },
  { name: "Portugal", id: 7 },
  { name: "Spain", id: 8 },
  { name: "France", id: 9 },
  { name: "Italy", id: 10 },
  { name: "Luxembourg", id: 11 },
  { name: "the Netherland", id: 12 },
];


const prices = [
  {
    name: '1 to 50 €/hr',
    value: '1-50',
  },
  {
    name: '51 to 100 €/hr',
    value: '51-100',
  },
  {
    name: '101 to $500 €/hr',
    value: '101-500',
  },
];

const categories = [
  { name: "Full Stack", id: 1 }, 
  { name: "Data Science", id: 2 },
  { name: "Product Management", id: 3 },
]; 


const skills = [
  { name: "JavaScript", id: 1 },
  { name: "HTML", id: 2 },
  { name: "CSS", id: 3  },
  { name: "ReactJS", id: 4 },
  { name: "NextJS", id: 5 },
  { name: "MySQL", id: 6 },
];

export default function Home() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(''); 

  const {
    category = '',
    location = '',
    price = '',
    skill = '',
    sort = 'newest',
  } = router.query;

  const filterSearch = ({
    category,
    location,
    price,
    skill,
    search,
    sort,
  }) => {
    const { query } = router;
    if (category) query.category = category;
    if (location) query.location = location;
    if (price) query.price = price;
    if (skill) query.skill = skill; 
    if (search) query.search = search;
    if (sort) query.sort = sort;


    router.push({
      pathname: router.pathname,
      query: query,
    });

    setFilter(Object.entries(query).map(([key, value]) => `${key}=${value}`).join("&"));
  };


  // Get all freelancers & filter
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    console.log(filter); 
    let queryString = filter ? `?${filter}` : ''; 
    try {
      const response = await fetch(`http://localhost:3000/api/users${queryString}`);
      const users = await response.json(); 
      setUsers(users);
      console.log(users)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [filter]);



  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const locationHandler = (e) => {
    filterSearch({ location: e.target.value });
  };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e) => {
    filterSearch({ price: e.target.value });
  };
  const searchHandler = (e) => {
    filterSearch({ search: e.target.value })
  }
  const skillsHandler = (e) => {
    filterSearch({ skill: e.target.value })
  }



  // Open User Detail
  const openUserDetail = (id) => {
    router.push(`/userdetail/${id}`);
    console.log(id)
  };

  
  let state = <></>
  if (error) {
    state = <>{error}</>
  } else if (loading) {
    state = <>Loading...</>;
  } else if (users?.length === 0) {
    state = <><p>No services found that match your search. Why not try a different keyword or category?</p></>;
  }




  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-coBlue w-full text-white">
        <div className="max-w-5xl mx-auto px-4 py-9">
          <div className="flex flex-col-reverse items-center gap-6 sm:flex-row">
              <div>
                <h1 className="font-bold text-xl sm:text-2xl mb-4">Find freelance services from our CodeOp Bootcamp alumni network</h1>
                <div className="flex">
                  <div className="grid place-items-center h-10 w-8 bg-white rounded-l-md">
                    <MdSearch className="text-gray-400 text-xl"/>
                  </div>
                    <input
                      onChange={searchHandler}
                      type="text"
                      className="w-full text-black bg-white h-10 px-0 pr-16 rounded-r-md text-sm focus:outline-none md:w-4/5"
                      placeholder="Search for services"
                    />
                </div>
              </div>
              <div>
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
      <div className="w-full max-w-5xl mx-auto px-4">
      <h2 className="text-2xl mt-6 mb-6">Our freelancers</h2>
       {/* Category Selection - need to decide if we want to open a category specific page upon clicking one of these or if we want to filter by category */}
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
       <div className="flex flex-col mb-6 gap-2 sm:flex-row">
       <div>
          <h2>Location</h2>
          <select className="bg-white border border-black rounded" value={location} onChange={locationHandler}>
          <option value="all">All</option>
           {locations && 
              locations.map((location) =>  (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>))}
          </select>
        </div>
        <div >
          <h2>Categories</h2>
          <select className="bg-white border border-black rounded" value={category} onChange={categoryHandler}>
           <option value="all">All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
          </select>
        </div>
        <div >
          <h2>Budget</h2>
          <select className="bg-white border border-black rounded" value={price} onChange={priceHandler}>
           <option value="all">All</option>
              {prices &&
                prices.map((price) => (
                      <option key={price.value} value={price.value}>
                        {price.name}
                      </option>
                    ))}
          </select>
        </div>
        <div >
          <h2>Skills</h2>
          <select className="bg-white border border-black rounded" value={skill} onChange={skillsHandler}>
           <option value="all">All</option>
              {skills &&
                skills.map((skill) => (
                      <option key={skill.id} value={skill.value}>
                        {skill.name}
                      </option>
                    ))}
          </select>
        </div>
      </div>
       {/* END Filters */}
       {/* Sort */}
       <div className="flex justify-between">
       {users.length === 1 ? (<div className="font-bold text-gray-500 text-sm mb-4">{users.length} freelancer available</div>) : (<div className="font-bold text-gray-500 text-sm mb-4">{users.length} freelancers available</div>)}
       <div className="text-sm text-right">
        Sort by{' '}
              <select className="font-bold bg-transparent" value={sort} onChange={sortHandler}>
                <option value="newest">Newest Arrivals</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
              </select>
       </div>
       </div>
       {/* END Sort */}
       {state}
        {/* Grid */}
        {users ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user, index) => {
            return (
              <Card user={user} key={index}/>
            )
          })}
        </div>

        ) : null}
        
         {/* END Grid */}
         
        <div className="mt-auto flex justify-center mb-24">
                {/*   <button className="mt-6 border border-black text-sm text-black py-1 px-4 rounded-md">
                See all freelancers →
                </button>*/}
                
        </div>
      </div>
    </Layout>
  )
}
