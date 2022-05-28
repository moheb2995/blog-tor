import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from './logo.png'
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Nav = () => {
const [data,setdata] = useState()
 
const cookies = new Cookies();
const token = cookies.get('ut')

function exit(){
  cookies.set('ut','')
}

useEffect(()=>{
  fetch('http://localhost:4000/user/me', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'auth': `ut ${token}`
    },
    body: JSON.stringify({})

  }).then(res=>{ return res.json()}).then(data =>setdata(data))
},[])
// console.log('data:',data);
// caches.keys('data','http://localhost:4000/user/me')
// caches.has('data')
// console.log(caches.has('has','data'));
// console.log('del',caches.delete('data'));
// caches.match('data')
// console.log('match',caches.match('data'));
caches.open('data').then((c)=>c.addAll([
  Logo,token
]))
console.log('op',caches.open('v1'));
// caches.delete('v1')
// caches.delete('data')
// caches.delete(data)
// caches.delete(undefined)


return (
<div>
  <nav className='flex justify-between'>
    <div className="">
      <Link className='px-3 inline-block ' to='/Home'><img className='w-9 rounded-xl inline-block' src={Logo} alt="logo" /></Link>
      <Link className='nav' to={'/Users'}>Users</Link>
      <Link className='nav' to={'/Newblog'}>Newblog</Link>
      <Link className='nav' to={'/Blogs'}>Blogs</Link>
    </div>
    
    {
      token?
      <div className="">
        {
          !data ? '' : <Link className='nav' to={'/EditUser'}>{data.name}</Link>
        }
        <Link to={'/Home'}> <button onClick={exit}>Exit</button></Link>
      </div>
      :
      <Link className='nav' to={'/Login'}>Login</Link>
      }
  </nav>
  <Outlet/>
</div>
)}
export default Nav