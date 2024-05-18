import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

export function FullBlog({blog}: {blog : Blog}){
   return <div>
    <Appbar/>
    <div className="flex justify-center">
   <div className="grid grid-cols-12 p-10">
     <div className="col-span-8">
          <div className="text-[60px] font-extrabold">
              {blog.title}
          </div>
          <div className="text-slate-400">
              Published on 2nd December 2023
          </div>
          <div className="pt-2 text-[20px]">
              {blog.content}
          </div>
     </div>
     <div className="col-span-4">
        Author
         <div>
            <div className="flex">
              <div className="flex justify-center flex-col pr-2">
               <Avatar initials="R"/>
               </div>
            <div className="text-[26px] font-bold">
                 Anonymous
            </div>
            </div>
           <div className="text-slate-500">
                 Random quotes to grab the attention of the user.
          </div>
     </div>
     </div>
   </div>
   </div>
   </div>
}