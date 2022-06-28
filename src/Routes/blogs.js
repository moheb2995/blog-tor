import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Blogs = () => {
  const [data,setdata] = useState([])

useEffect(()=>{
  fetch('http://localhost:4000/blog')
  .then(data => data.json())
  .then(data => setdata(data))
},[])

if(!data.length)return <div className="shadow-xl p-4 text-center m-10">
  <h1 className="text-5xl font-bold m-4">Loding</h1>
  <p className="text-xl">{'<<please wait>>'}</p>
</div> 

return (
<div className='bg-orange-50 '>
  <div className="grid grid-cols-5  border-8 border-solid border-orange-400 ">
    {
      data.map(i=>{
        return <Link key={i._id} to={`/SingleBlog/${i._id}`}>
          <div className="bg-orange-400 m-4 p-2  text-center rounded-xl rounded-tl-none">
            <div className="">
              <h2 className="font-bold m-4">{i.title} </h2> 
              <img src={i.imgurl} alt="" />
              <h4 className="">{i.averageScore} </h4>
            </div>
            {/*<hr />
              <div className="">
              <img className='' src={i.creator.avatar} alt="avatar" />
              <h2 className="">{i.creator.name} </h2>
              <h3 className="">{i.creator.bio} </h3>
              <h4 className="">{i.creator.averageScore} </h4>
            </div> */}
          </div>
        </Link>
      })
    }
  </div>
</div>
)}
export default Blogs