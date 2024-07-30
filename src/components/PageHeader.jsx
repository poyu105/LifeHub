import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PageHeader({ title }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    // 判斷使用者是否已經登入
    const handlePostClick = () => {
        if (user == null) {
            alert('請先登入!');
            navigate('/login');
        } else {
            navigate('/post');
        }
    };

    return (
        <>
            <div className="w-full flex justify-center border-b-2 bg-slate-100">
                <div className="flex flex-row justify-between items-center w-10/12">
                    <h1>
                        <i className="bi bi-caret-right"></i>{title}
                    </h1>
                    {title === "新增貼文" ?  
                        <Link to='/' className="md:text-sm text-xs border rounded bg-red-500 hover:bg-red-600 text-white p-1">
                            <i className="bi bi-x-square me-1"></i>取消
                        </Link>
                        :
                        <button onClick={handlePostClick} className="md:text-sm text-xs border rounded bg-blue-500 hover:bg-blue-600 text-white p-1">
                            <i className="bi bi-plus-square me-1"></i>新增貼文
                        </button>
                    }
                </div>
            </div>
        </>
    );
}
