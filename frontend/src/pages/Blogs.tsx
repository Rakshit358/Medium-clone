import Appbar from "../components/Appbar";
import {BlogCard} from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export default function Blogs(){
    const {loading,blogs} = useBlogs();

    if(loading){
        return <div className="flex flex-col justify-center">
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        </div>
    }

    return   <div>
            <Appbar/>
           <div className="flex justify-center">
    <div >
        {blogs.map(blog => <BlogCard 
        key={blog.id}
        id={blog.id}
        authorName={blog.author.name || "Anonymous"} 
        title={blog.title}
        content={blog.content}
        publishedDate={"17 May 2024"}
        />)}
    </div>
  </div>
  </div>
}