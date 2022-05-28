import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import Cookies from "universal-cookie";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const EditBlogs = () => {
  const [data,setdata] = useState({})
  const [title,settitle] = useState('')
  const [imgurl,setimgurl] = useState('')
  const [content,setcontent] = useState('')
console.log(data);

  let {_id} =useParams();
  const cookies = new Cookies();
  const token = cookies.get('ut')

  useEffect(()=>{
    fetch(`http://localhost:4000/blog/single-blog/${_id}`)
    .then(res=>res.json()).then(data=>{setdata(data);setcontent(data.content);setimgurl(data.imgurl);settitle(data.title)})
    // if(data){setcontent(data.content);setimgurl(data.imgurl);settitle(data.title)}
  },[])

  const submitBLog = async ()=>{
    console.log('kkk');
    fetch(`http://localhost:4000/blog/edit`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': `ut ${token}`
      },
      body: JSON.stringify({ 
        blogId: _id,
        data: {
          title,imgurl,content,
        }
      })
    }).then(res=>{console.log(res.json()); return res.json()}).then(data=>console.log(data))
    clean()
    alert('secsses')
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

function clean(){
  settitle('');setimgurl('');setcontent('');
}


return (
<div className="">
{
  data == {} ? 'loding' :
  <div>
    <div className="bg-orange-50 min-h-[91vh] ">
      <h2 className="text-3xl text-center p-4 shadow-lg italic">ویرایش مقاله </h2>
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
            value={content} onChange={setcontent}
          />
        </div>
        <div className="flex justify-between">
        <button className="m-2 p-1" onClick={submitBLog}>ثبت</button>
        <button className="m-2 p-1" onClick={clean}>پاک کردن</button>
        </div>
      </div>
    </div>
  </div>
}
</div>
)}
export default EditBlogs