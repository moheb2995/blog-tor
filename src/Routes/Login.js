import React, { useState } from 'react'
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username,setusername] = useState('')
  const [password,setpassword] = useState('')

  const cookies = new Cookies()
  const navigate = useNavigate();

  const login = async ()=>{

    fetch('http://localhost:4000/user/login', {
      method: 'POST',
      headers: { 
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({
        username : username, 
        password,
      })
    }).then(data=>data.json())
    .then(({token})=>{cookies.set('ut' , token); if(token){navigate('/')}else{alert('نام کاربری یا رمز عبور نا معتبر است !!!')}})
  }

return (
<div className='min-h-[94vh] bg-orange-100 text-center pt-28'>
  <div className="p-8 drop-shadow-sm  bg-orange-300 rounded inline-block">
    <h1 className="m-2 mb-4">به وب سایت ما خوش آمدید</h1>
    <label>نام کاربری :</label>
    <input className='input' value={username} onChange={e=>setusername(e.target.value)} />
    <br />
    <label className=''>رمز عبور :</label>
    <input className='input ml-4' value={password} onChange={e=>setpassword(e.target.value)} type="password" />
    <br />
    <div className="flex justify-between">
      <button className='p-2 -m-2' onClick={login}>ورود</button>
      <Link to={'/SingUp'}><button className='m p-2'>ثبت نام</button></Link>
    </div>
  </div>
</div>
)}
export default Login