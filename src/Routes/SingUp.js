import React, { useState } from 'react'
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


const SingUp = () => {
  const [name,setname] =useState('')
  const [username,setusername] =useState('')
  const [msg,setmsg] =useState('false')
  
  const cookies = new Cookies();
  const navigate = useNavigate();

const submitUser = async () => {
  fetch('http://localhost:4000/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username,name})

  }).then(res=>{if(!res.ok){setmsg(res.ok)}else{navigate('/Login')}; return res.json()}).then(data =>{cookies.set('ut' , data.token);})
}


return (
<div className='text-center bg-orange-100 min-h-[94vh] '><br />
  <div className="w-[80vw] bg-orange-300  mx-auto p-2 italic">
    <p className="">سلام به وب سایت ما خوش آمدید </p>
    <p className="">برای نوشتن مقاله لطفا ثبت نام کنید </p>
  </div>
  <br />
  <div className=" bg-orange-200 w-[60vw] inline-block p-4 px-2.5 rounded ">
    <label>name : </label>
    <input className="input p-1 ml-10 " value={name} onChange={e=>setname(e.target.value)} placeholder='Ali' /> <br />
    <label>user name : </label>
    <input className="input p-1 " value={username} onChange={e=>setusername(e.target.value)} placeholder='Ali-AXC2' /><br />
    <h4 className={msg?'hidden':'block'}>نام کاربری قبلا انتخاب شده <br />لطفا نام دیگری را امتحان کنید</h4>
    <button className='font-bold p-1 m-2 ' onClick={submitUser}>ثبت نام</button>
  </div>
</div>
)}
export default SingUp