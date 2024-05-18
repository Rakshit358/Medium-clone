import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export default function Appbar(){
    return <div className="border-b flex justify-between p-3 w-screen">
        <Link to={"/blogs"}>
        <div>
             Medium
        </div>
        </Link>
        <div className="flex gap-4">
        <Link to={"/publish"}>
         <button type="button" className="text-white mr-2 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Publish</button>
        </Link>
        <div className="mr-2">
            <Avatar initials="R"/>
        </div>
        </div>
    </div>
}