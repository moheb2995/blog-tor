import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import simpleImg from './SimpleImg.jpg'
import { Rating } from '@mui/material';

const SingleUsers = () => {

  const [data,setdata] = useState({})
  const [blogs,setblogs] = useState([])

  const [loading, setLoading] = useState(true)

  const link = 'http://localhost:4000/'
let {_id} =useParams();

useEffect(()=>{
  fetch(`http://localhost:4000/user/singleUser/${_id}`)
  .then(res=>res.json()).then(data =>setdata(data))

  fetch('http://localhost:4000/blog/by-user',{
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id })
  })
  .then(res=>res.json()).then(data=>{
    setblogs(data)
    setLoading(false)
  })
},[])

if(!data)return <div className="shadow-xl p-4 text-center m-10">
  <h1 className="text-5xl font-bold m-4">Loding</h1>
  <p className="text-xl">{'<<please wait>>'}</p>
</div>

function blogsByUser() {
  if(!blogs.length) return 'no blog'

  if(blogs.length) return blogs.map(i=>
  <div className=''>
    <h2 className="">{i.title} </h2>
    <img src={i.imgurl} alt="img" />
    <Rating
      name="simple-controlled"
      value={i.averageScore}
      readOnly
    />
  </div>)
}

if (loading) return <h1> loading </h1>

return (
<div className='bg-orange-50 min-h-[94vh] p-10'>
  {
    toString(data) == {} ? 'loding'
    :
    <div className="bg-orange-400 w-[86vw] p-3 m-auto rounded-sm">
      <h2 className="text-center text-3xl italic p-4 shadow-xl ">{data.name} </h2>
      <img className='rounded-b-full w-72 m-auto h-80 mt-2 bg-white p-14'
        src={`${link}${data.avatar}`} alt="avatar" 
        onError={e => e.target.src = simpleImg}
        />
      <div className="w-[80vw] ">
        {!data.bio?<p className="">no bio</p>:<h3 className="">{data.bio}</h3>} 
        <Rating
        name="simple-controlled"
        value={data.averageScore}
        readOnly 
        />
      </div>
    </div>
  }

  <div className="bg-orange-300 w-[86vw] p-3 m-auto rounded-sm">
    <h1 className="font-bold  ">blogs : </h1>
    {blogsByUser()}
  </div>

</div>
)}
export default SingleUsers