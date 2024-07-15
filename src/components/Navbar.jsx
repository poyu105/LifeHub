import { Link } from "react-router-dom"
export default function Navbar(){
    return(
        <>
            <nav>
                <div className="flex justify-between align-middle px-5 py-3 bg-custom-navbar drop-shadow-md text-slate-900">
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
                    <ul className="sm:flex justify-between hidden">
                        <li className="my-auto mx-3 hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/FoodRec">美食推薦</Link>
                        </li>
                        <li className="my-auto mx-3 hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/TrafficGuide">交通指南</Link>
                        </li>
                        <li className="my-auto mx-3 hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/ShoppingGuide">購物指南</Link>
                        </li>
                        <li className="my-auto mx-3 hover:border-b-2 hover:border-b-stone-600">
                            <Link to="/Entertainment">休閒娛樂</Link>
                        </li>
                        <li className="my-auto mx-3">
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