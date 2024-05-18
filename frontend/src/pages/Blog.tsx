import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";


export default function Blog(){
    const {id} = useParams();
    const {loading,blog} = useBlog({id});
    if(loading){
        return <div>
            <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
        </div>
    }
    return <div>
        <FullBlog blog={blog}/>
    </div>
}