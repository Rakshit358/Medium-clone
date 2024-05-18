import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
// import { Alert } from "@material-tailwind/react";
 
export  function Auth({type}:{type:"signup" | "signin"}){
   //  const [ishidden,setHidden] = useState<Boolean>(true);
    const navigate = useNavigate();

    const [postInput,setPostInput]  = useState<{email:String,
        password:String,}>({
      email:"",
      password:""
    });
     

     async function sendRequest(){  
      try {
         console.log(postInput);
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "signin" ? "signin" : "signup"}`,postInput);
         const jwt = response.data.token;
         localStorage.setItem("token",jwt);
         navigate("/blogs");
      } catch (error) {
         alert("Some error occured")
         // console.log(error);
      }
     }


    return <div>
   {/* <div role="alert" className={`${ishidden} ? "hidden" : "block"` }>
     <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
       Danger
    </div>
    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
       <p>Something not ideal might be happening.</p>
     </div>
   </div> */}
   <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col">
           <div className="text-3xl font-extrabold">
              {type == "signin" ? "Log into existing account" :"Create an account"} 
           </div>
           <div className="text-slate-400 text-center">
           {type == "signin" ? "Don't have an account?" :"Already have an account?"} 
               <Link to={type == "signup" ? "/signin" : "/signup"} className="text-blue-400 underline"> {type == "signin" ? "Signup":"Login"}</Link>
           </div>
           <div className="p-2">
           <LabelledInput label="Email" placeholder="abcd@gmail.com" onChange={(e) => {
             setPostInput({
                ...postInput,
                email:e.target.value
             })
           }}/>
            <LabelledInput label="Password" placeholder="123456" onChange={(e) => {
             setPostInput({
                ...postInput,
                password:e.target.value
             })
           }}/>
           </div>
           <div className="m-3">
             <button type="button" onClick={sendRequest} className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign up" : "Sign In"}</button>
           </div>
        </div>
      </div>
    </div>
}

interface labelledInputType{
   label:string;
   placeholder:string;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function LabelledInput({label,placeholder,onChange}:labelledInputType){
   return <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
    <input type="text" onChange={onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
   </div>
}