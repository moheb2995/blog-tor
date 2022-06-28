

import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import simpleImg from './SimpleImg.jpg'
import { Rating } from '@mui/material';

const Home = () => {
  const [topUser,settopUser] = useState([])
  const [topBlog,settopBlog] = useState([])
  const link = 'http://localhost:4000/'

  useEffect(()=>{
    fetch('http://localhost:4000/user/top-users')
    .then(res=>res.json()).then(topUser=>settopUser(topUser))

    fetch('http://localhost:4000/blog/top-blogs')
    .then(res=>res.json()).then(data=>settopBlog(data))
  }, [])

  const topUsers = topUser.map(i=>
  <div key={i._id} className=''>
    <div className="bg-orange-400 m-4 p-2  text-center rounded-xl rounded-tl-none">
      <Link className='' to={`/SingleUsers/${i._id}`}>
        <img
          className='w-[24vw] m-auto '
          src={`${link}${i.avatar}`}
          alt="avatar" 
          onError={e => e.target.src = simpleImg}
          /> <br />
      </Link>
        <h2 className="">{i.name} </h2>
        <h3 className="">bio : {i.bio ? i.bio : 'no bio'} </h3>
        <Rating
          name="simple-controlled"
          value={i.averageScore}
          readOnly 
        />

      </div>
  </div>)

  const topBlogs = topBlog ? topBlog.map(i=>
  <div className='bg-orange-400 p-2 'key={i._id}>
    <div className="">
    <Link to={`/SingleBlog/${i._id}`}> 
      <img className='rounded-sm w-[100%] '
        src={i.imgurl}
        onError={e => e.target.src = simpleImg} 
        alt="poto" 
      />
    </Link>
    <h2 className="font-bold">{i.title} </h2>
    <Rating
        name="simple-controlled"
        value={i.averageScore}
        readOnly 
      />
    </div>
  </div>)
  :''

// if(!topBlog.length || !topUser.length)return <div className="shadow-xl p-4 text-center m-10">
//   <h1 className="text-5xl font-bold m-4">Loding</h1>
//   <p className="text-xl">{'<<please wait>>'}</p>
// </div>

return (
<div className='bg-orange-50 '> 
  <h1 className="text-center text-3xl p-4 text-rose-900	italic shadow-xl ">welcome to Blag Tor</h1>
  <h2 className="shadow inline-block p-2 text-xl italic m-1.5 bg-orange-200 ">best blogers</h2>
  <div className="grid grid-cols-3 m-10 mt-0 my-5">
    {topUsers}
  </div>
  <h2 className="shadow inline-block p-2 text-xl italic bg-orange-200">best blogs</h2>
  <div className="grid grid-cols-3  border-8 border-solid border-orange-400 ">
    {topBlogs}
  </div>
</div>
)}
export default Home