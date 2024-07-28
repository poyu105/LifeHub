import { Link } from "react-router-dom";
export default function PageHeader({title}){
    return (
        <>
            <div className="w-full flex justify-center border-b-2 bg-slate-100">
                <div className="flex flex-row justify-between items-center w-10/12">
                    <h1>{/* Bootstrap icon */}<i className="bi bi-caret-right"></i>{title}</h1>
                    {title === "新增貼文" ?  
                        <Link to='/' className="md:text-sm text-xs border rounded bg-red-500 hover:bg-red-600 text-white p-1">{/* Bootstrap icon */}<i className="bi bi-x-square me-1"></i>取消</Link>
                        :
                        <Link to='/Post' className="md:text-sm text-xs border rounded bg-blue-500 hover:bg-blue-600 text-white p-1">{/* Bootstrap icon */}<i className="bi bi-plus-square me-1"></i>新增貼文</Link>
                    }
                </div>
            </div>
        </>
    )
}