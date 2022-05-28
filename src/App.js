import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Routes/Login'
import SingUp from './Routes/SingUp'
import Nav from './Routes/Nav'
import EditUser from './Routes/EditUser';
import Home from './Routes/Home';
import Users from './Routes/Users';
import SingleUsers from './Routes/SingleUsers';
import Newblog from './Routes/Newblog'
import Blogs from './Routes/blogs';
import SingleBlog from './Routes/SingleBlog';
import EditBlog from './Routes/EditBlogs';

const App = () => {
return (
<div>
  <Routes>
    <Route path="/" element={<Nav />}>
      <Route path="Login" element={<Login/>} />
      <Route path="SingUp" element={<SingUp/>} />
      <Route path="EditUser" element={<EditUser/>} />
      <Route path="Home" element={<Home/>} />
      <Route path="Users" element={<Users/>} />
      <Route path="SingleUsers/:_id" element={<SingleUsers/>} />
      <Route path="Newblog" element={<Newblog/>} />
      <Route path="Blogs" element={<Blogs/>} />
      <Route path="SingleBlog/:_id" element={<SingleBlog/>} />
      <Route path="EditBlog/:_id" element={<EditBlog/>} />
    </Route>
  </Routes>
</div>
)}
export default App