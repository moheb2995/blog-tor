import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const NewBlog = () => {
  const [title,settitle] = useState('league of legends')
  const [imgurl,setimgurl] = useState('https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt20a4b154b1756b56/5db05fe7a6470d6ab91ce5a0/RiotX_ChampionList_nasus.jpg?quality=90&width=250')
  const [value, setValue] = useState('good game')

  const cookies = new Cookies();
  const token = cookies.get('ut')

  const submitBLog = async () => {
    fetch('http://localhost:4000/blog/write', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({title, imgurl, content: value,})
      
    }).then(data => {
      console.log(data)
      return data.json()
    }).then(data=>console.log('lll',data))
    clean()
  }

  function clean(){
    settitle('');setimgurl('');setValue('');
  }

  const modules = {
    toolbar: [
      [{ 'header': [1,2,3,4,5,6, false] }, {'size': [1, "small", "large",'huge']},],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},],
      ['link', 'image', 'video'],
    ],
  }
  const formats = [
    "header","font","size","bold","italic","underline","align",//?
    "strike","script","blockquote","list","bullet","indent",
    "link","image","video","color","code-block"//?
  ]

if(!token)return <div className="shadow-xl p-4 text-center m-10">
  <h1 className="text-3xl font-bold m-4">please Login</h1>
  <Link to={'/Login'} >Login</Link>
</div> 

return (
<div>
  <div className="bg-orange-50 min-h-[91vh] ">
    <h2 className="text-3xl text-center p-4 shadow-lg italic">نوشتن مقاله </h2>
    <div className="w-[85vw] bg-orange-300 px-10 pt-0 mt-10 mx-auto relative ">
      <div className="flex justify-around ">
        <div className="">
          <label className="m-2.5 mr-7">موضوع : </label>
          <input className="input w-52 mr-7 text-sm p-1 " value={title} onChange={e=>settitle(e.target.value)} /> 
        </div>
        <div className="">
          <label className="m-2.5 mt ">لینک عکس : </label> 
          <input className="input w-52 text-sm p-1 " value={imgurl} onChange={e=>setimgurl(e.target.value)} />
        </div>
      </div>
      <br />
      <div className="justify-center flex  ">
        <img className="bg-white w-52 h-52 rounded " src={imgurl} alt="img" />
      </div>
      <br />

      <div className="bg-white  ">
        <ReactQuill 
          theme="bubble" 
          modules={modules}
          formats={formats}
          value={value} onChange={setValue}
        />
      </div>
      <div className="flex justify-between">
      <button className="m-2 p-1" onClick={submitBLog}>ثبت</button>
      <button className="m-2 p-1" onClick={clean}>پاک کردن</button>
      </div>
    </div>
  </div>
</div>
)}
export default NewBlog