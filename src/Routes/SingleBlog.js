import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Cookies from "universal-cookie";
import simpleImg from './SimpleImg.jpg'
import { Rating } from '@mui/material';

const SingleBlog = () => {
  const [update,setupdate] = useState(false)
  const [data,setdata] = useState({})
  const [rate,setrate] = useState('')
  const [comments,setcomments] = useState('') 
  const [com,setcom] = useState('')
  const [loading, setLoading] = useState(true)

  const link = 'http://localhost:4000/'

  let {_id} =useParams();
  const cookies = new Cookies();
  const token = cookies.get('ut')


  useEffect(()=>{

    const customFetch = async () => {

      const [res1, res2] = await Promise.all([
        fetch(`http://localhost:4000/blog/single-blog/${_id}`),
        fetch(`http://localhost:4000/comment/by-blog/${_id}`)
      ])

      const [thatBlog, theseComments] = await Promise.all([res1.json(), res2.json()])

      setdata(thatBlog)
      setcomments(theseComments)
      setLoading(false)
    }

    customFetch()

  },[update])
  
  const submitRate = async () => {
    if(!rate)return alert('please rate')

    fetch('http://localhost:4000/blog/submit-rate',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({blogId : data._id,score : rate})
    }).then(res=>res.json()).then(data=>console.log(data))
    setupdate(!update)
    setcom('');
    alert('ok')

  }

  const submitComent= async ()=>{
    if(!com)return alert('please send a comment')

    fetch('http://localhost:4000/comment/submit',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({blogId : data._id, text : com})
    }).then(res=>res.json()).then(data=>console.log(data))
    setrate(null);setupdate(!update);  alert('secsses')
  }

console.log('rate',data.averageScore);
console.log('rate',typeof data.averageScore);

if(!data)return <div className="shadow-xl p-4 text-center m-10">
  <h1 className="text-5xl font-bold m-4">Loding</h1>
  <p className="text-xl">{'<<please wait>>'}</p>
</div> 

return (
<div className='bg-orange-50 p-20 relative pt-5'>
  {
    data == {} ? 'louding':
    <div className="">
      <h2 className="text-center bg-orange-200 text-3xl p-2 m-4 mb-6 shadow-2xl ">{data.title} </h2>
      <div className="flex justify-around m-4 p-2 bg-orange-100 ">
        <img className=' rounded w-96 h-96 ' src={data.imgurl} alt="" />
        <div className="w-[50vw] p-6 ">
          <div className="min-h-[55vh] ">
            {new DOMParser().parseFromString(data.content, "text/xml" ).firstChild.innerHTML }
          </div>
          <Rating
            name="simple-controlled"
            defaultValue={data.averageScore}
            readOnly 
          />
        </div>
      </div>

      <div className="flex justify-between">
      <div className="w-[45vw] mx-5 ">
        {
          token?
            <div className="flex justify-around w -[40vw] bg-orange-200 p-4 m-auto rounded-2xl ">
              <input className='inline-block rounded ' value={com} onChange={e=>setcom(e.target.value)} />
              <button className='inline-block p-2 ' onClick={submitComent}>Submit</button>
            </div>
          :
          <div className="w-[40vw] bg-orange-200 p-4 m-auto rounded-2xl">
            <h1 className="text-center">You must be logged in to post a comment</h1>
          </div>
        }

        <div className="">
          <h4 className="p-2 m-2 bg-orange-200 inline-block shadow-xl rounded font-bold">comments</h4>
          {
          !comments ? 'no comments' :
          comments.map(i=>{
          return(
          <div className="bg-orange-100 p-2 rounded m-2">
            <div className="flex">
              <img className='inline-block w-10 h-10 m-2 bg-white rounded-full '
                src={`${link}${i.user.avatar}`} alt="avatar"
                onError={e => e.target.src = simpleImg}
              />
              <p className="my-4 mx-1">{i.user.name} </p>
            </div>
            <p className="mx-4">_ {i.text} </p>
          </div>
          )})}
        </div>
        
      </div>
        {
        !data.creator ? 'louding' : 
        <div className="">

          <div className="w-[40vw] p-3 h-36 bg-orange-100 rounded mx-5 mb-2  ">
            <h1 className="p-2 m-2 bg-orange-200 inline-block shadow-xl rounded font-bold">creator</h1>
            <div className="flex justify-between ">
              <img className='w-14 h-14 p-3 bg-white rounded-full'
                src={`${link}${data.creator.avatar}`} alt="kkk" 
                onError={e => e.target.src = simpleImg}  
                />
              <div className="w-[30vw] p-1.5 ">
                <h2 className="">creator : {data.creator.name} </h2>
                <Rating
                  name="simple-controlled"
                  value={data.creator.averageScore}
                  readOnly 
                />
              </div>
            </div>
          </div>

          <div className="w-[40vw] p-3 text-center bg-orange-100 rounded mx-5 mb-2">
              
            <h2 className="font-bold">Please rate this blog</h2>
            <div className="m-2">
            <Rating
              name="simple-controlled"
              value={rate}
              onChange={(_, newVal)=>setrate(newVal)}
              precision={1}
            />
            </div> 
            <button className='' onClick={submitRate} >Submit Rate</button>
          </div>
        </div>
      }
      </div>
    </div> 
  }
</div>
)}
export default SingleBlog