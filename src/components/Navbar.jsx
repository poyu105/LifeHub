import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import PageHeader from "./PageHeader";

export default function Navbar({ title }) {
    // 漢堡選單boolean
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useAuth();

    // 日期狀態
    const [date, setDate] = useState('');
    useEffect(() => {
        // 獲取當前日期
        const currentDate = new Date();
        // 格式化日期為 YYYY/MM/dd
        const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
        setDate(formattedDate);
    }, []);

    // 導覽列隱藏/顯示狀態
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollerY, setLastScrollerY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 103 && window.scrollY > lastScrollerY) {
                // 向下滑動隱藏Navbar
                setShowNavbar(false);
            } else if (window.scrollY < lastScrollerY) {
                // 向上滑動顯示Navbar
                setShowNavbar(true);
            }
            setLastScrollerY(window.scrollY);
            console.log(lastScrollerY);
        };
        window.addEventListener('scroll', handleScroll);

        //clear eventListener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollerY]);

    return (
        <>
            <nav className={`${window.scrollY>110 ? 'sticky transition-transform duration-300 ease-in-out' : ''} ${showNavbar? 'top-0 translate-y-0' : '-translate-y-full'}`}>
                <div className="flex justify-between align-middle sm:flex-row flex-col px-5 py-3 bg-custom-navbar drop-shadow text-slate-900">
                    <div className="flex justify-between">
                        {/* HomePage */}
                        <Link to='/' className=" text-4xl">LifeHub</Link>
                        {/* Mobile Menu Button */}
                        <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
                            <svg
                                className="w-6 h-6 text-gray-500"
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                    {/*Main Navigates */}
                    <ul className={"text-sm text-center flex sm:flex-row flex-col sm:gap-4 gap-2 justify-between sm:mx-0 sm:max-h-screen sm:transition-none transition-max-height duration-500 ease-in-out overflow-hidden " + (showMenu ? "max-h-screen" : "max-h-0")}>
                        <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                {/* Bootstrap icon */}
                                <i className="bi bi-house"></i>首頁
                            </Link>
                        </li>
                        <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/FoodRec" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                {/* Bootstrap icon */}
                                <i className="bi bi-cake"></i>美食推薦
                            </Link>
                        </li>
                        <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/TrafficGuide" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                {/* Bootstrap icon */}
                                <i className="bi bi-bus-front"></i>交通指南
                            </Link>
                        </li>
                        <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/ShoppingGuide" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                {/* Bootstrap icon */}
                                <i className="bi bi-cart"></i>購物指南
                            </Link>
                        </li>
                        <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/Entertainment" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                {/* Bootstrap icon */}
                                <i className="bi bi-balloon"></i>休閒娛樂
                            </Link>
                        </li>
                        {user ?
                            <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                                <Link to="/Profile" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                    {/* Bootstrap icon */}
                                    <i className="bi bi-person-circle"></i>個人檔案
                                </Link>
                            </li>
                            :
                            <li className="my-auto hover:border-b-2 hover:border-b-stone-600">
                                <Link to="/Login" className="block w-full" onClick={() => setShowMenu(!showMenu)}>
                                    {/* Bootstrap icon */}
                                    <i className="bi bi-person-circle"></i>登入
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="flex justify-center items-center sm:flex-row flex-col sm:text-base customer-ssm:text-sm text-xs font-bold bg-amber-200 drop-shadow">
                    <span>網頁處於開發階段 最後更新日期:{date} &emsp;</span>
                    <small>&copy;2024 <a className="text-center border-b-2 border-black hover:text-gray-600 hover:border-gray-600" href="https://poyu105.github.io/myweb" target="_blank">Poyu webDev.</a></small>
                </div>
                {title == null ? undefined : <PageHeader title={title} />}
            </nav>
        </>
    );
}