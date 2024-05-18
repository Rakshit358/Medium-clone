import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Publish(){
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const navigate = useNavigate();

return ( <div>
    <Appbar/>
    <div className="flex justify-center w-full pt-8 ">
        <div className="w-full max-w-screen-lg">
       <input type="text" onChange={(e) => {
        setTitle(e.target.value)
       }}  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title"/>
       <TextArea onChange={(e) => {
          setContent(e.target.value)
       }}
       /> 
       <button type="submit" onClick={async () => {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                title,
                content,
            },{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            navigate(`/blog/${response.data.id}`);
           }}  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600">
               Publish post
           </button>
       </div>
    </div>
    </div>)
}

function TextArea({onChange}: {onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void}){
    return (
        <form className="p-2">
           <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
               <div className="px-4 py-2 bg-white rounded-b-lg outline-none">
                   <textarea onChange={onChange} rows={10} className="block outline-none w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required ></textarea>
               </div>
           </div>

        </form>
        )
}