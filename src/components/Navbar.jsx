import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <>
            <nav>
                <div className="flex justify-between align-middle px-5 py-3 bg-orange-300 drop-shadow-md">
                    {/* HomePage */}
                    <Link to='/' className=" text-4xl">LifeHub</Link>
                    {/* Mobile Menu Button */}
                    <button className="sm:hidden">
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
                    {/*Main Navigates */}
                    <ul className="sm:flex justify-between md:min-w-96 min-w-80 hidden">
                        <li className="my-auto">
                            <Link>美食推薦</Link>
                        </li>
                        <li className="my-auto">
                            <Link>交通指南</Link>
                        </li>
                        <li className="my-auto">
                            <Link>購物指南</Link>
                        </li>
                        <li className="my-auto">
                            <Link>休閒娛樂</Link>
                        </li>
                        <li className="my-auto">
                            <button>
                                <i className="bi bi-person-circle"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}