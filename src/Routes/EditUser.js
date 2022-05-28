import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';

const EditUser = () => {
  const [name,setname] = useState('')
  const [bio,setbio] = useState('')
  const [file,setfile] = useState(null)
  const [blogs,setblogs] = useState([])

const cookies = new Cookies();
const token = cookies.get('ut')

  useEffect(()=>{
    fetch('http://localhost:4000/blog/my-blogs',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
    })
    .then(res=>res.json()).then(data =>setblogs(data))
  },[])

  const EditUser = async () => {
    if(!bio || !name)return alert('بنویس !!!')
    submitAvatar()
    fetch('http://localhost:4000/user/edit', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({bio,name})
  
    }).then(res=>{console.log(res); return res.json()}).then(data =>console.log(data))
    setfile(null);setbio('');setname('');
  }

  const submitAvatar = async () => {
      if (!file) return alert('عکس انتخاب کن !!!')
      const formData = new FormData()
      formData.append('avatar', file)

      fetch('http://localhost:4000/user/update-avatar', {
        method: 'POST',
        headers: {
          'auth':` ut ${token}`
        },
        body: formData
      }).then(res=>res.json()).then(data=>console.log('img : ',data))

      fetch('http://localhost:4000/blog/my-blogs',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth': `ut ${token}`
        },
      })
      .then(res=>res.json()).then(data =>setblogs(data))
  }
  console.log('blogs:',blogs);


return (
<div className='bg-orange-50'>
  <h1 className="text-center text-3xl italic p-4 shadow-xl m-6">user panel</h1>
  <div className="bg-orange-300 p-6 mb-10 mx-20 rounded-xl ">
    <label className=''>نام : </label>
    <input className='ml-14 inline-block rounded m-1 ' value={name} onChange={e=>setname(e.target.value)}/><br />
    <label className=''>بیوگرافی : </label>
    <input className='rounded m-1 ml-4' value={bio}  onChange={e=>setbio(e.target.value)} /><br />
    <label className=''> آپلود عکس :  </label>
    <input className='m-1' type="file" accept='image/*' name='img' onChange={e=>setfile(e.target.files[0])}/>
    <button className='' onClick={EditUser}>ثبت</button>
  </div>

  <div className="">
  <h1 className="p-2 bg-orange-200 inline-block rounded font-bold shadow">my blogs</h1>
  {
  !blogs.length ? 'loding'
  :
  <div className="grid grid-cols-5 border-8 border-solid border-orange-400">
  { 
  blogs.map(i=>
    <Link to={`/EditBlog/${i._id}`} >
      <div className='bg-orange-400 p-2 m-1'>
        <h2 className="font-bold">{i.title} </h2>
        <img className='rounded-sm w-[100%]' src={i.imgurl} alt="img" />
        <h4 className="">{i.averageScore} </h4>
      </div>
    </Link>)
  }

  </div>
  }
  </div>
</div>
)}
export default EditUser