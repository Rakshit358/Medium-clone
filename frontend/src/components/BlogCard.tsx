import { Link } from "react-router-dom";

interface BlogCardProps{
    id:string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export function BlogCard({id,authorName,title,content,publishedDate}:BlogCardProps){
    return <Link to={`/blog/${id}`}>
    <div className="border-b-2 p-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
            <div className="flex justify-center flex-col">
                 <Avatar initials={`R`}/>
           </div>
            <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
            . 
            <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-xl font-bold pt-2">
            {title}
        </div>
        <div className="text-md font-normal">
            {content.length > 100 ? content.slice(0,100) + "..." : content}
        </div>
        <div className="text-xs text-slate-500 pt-4">
            {`${Math.ceil(content.length / 50)} min read`}
        </div>
    </div>
    </Link>
}

export function Avatar({initials}:{initials:string}){
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <span className="font-medium text-gray-600 dark:text-gray-300 text-xs">{initials}</span>
</div>
}