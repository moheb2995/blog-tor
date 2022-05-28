import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import simpleImg from './SimpleImg.jpg'
import { Rating } from '@mui/material';


const Users = () => {

const [data,setdata] = useState([])
const link = 'http://localhost:4000/'

useEffect(()=>{
  fetch(`http://localhost:4000/user`)
  .then(res=>{console.log(res); return res.json()}).then(data =>setdata(data))
},[])
console.log(data);

const userList = data.map(i=>
  <Link className='text-center ' to={`/SingleUsers/${i._id}`}>
    <div className="m-2 bg-orange-400 min-h-[70vh] rounded-b-full rounded-t-lg p-4 ">
      <img className='bg-white w-40 h-40 m-auto'
        src={`${link}${i.avatar}`} alt="avatar"
        onError={e => e.target.src = simpleImg}
        />
      <h2 className="">name : {i.name} </h2>
      <h3 className="">bio : {!i.bio?'no bio': i.bio} </h3>
      <Rating
        name="simple-controlled"
        value={i.averageScore}
        readOnly 
      />
    </div>
  </Link>)

if(!data)return <div className="shadow-xl p-4 text-center m-10">
  <h1 className="text-5xl font-bold m-4">Loding</h1>
  <p className="text-xl">{'<<please wait>>'}</p>
</div> 

return (
<div className='bg-orange-300 bg-gradient-to-b min-h-[91vh] from-white'>
  <div className=" grid grid-cols-6 m-4  ">
    {userList}
  </div> 
</div>
)}
export default Users