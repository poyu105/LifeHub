import { useState } from "react"
import Footer from "./Footer"
import Login from "./Login"
import Register from "./Register"
export default function ProfileMenu({showProfileMenu, setShowProfileMenu}){
    const [currentComponent, setCurrentComponent] = useState('Login')
    const renderComponent = ()=>{
        switch(currentComponent){
            case 'Login':
                return <Login switchToRegister={()=>{setCurrentComponent('Register')}} />;
            case 'Register':
                return <Register switchToLogin={()=>{setCurrentComponent('Login')}}/>;
            default:
                return <Login switchToRegister={()=>{setCurrentComponent('Register')}} />;
        }
    }

    return(
        <>
            {showProfileMenu && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
                    <div className="absolute top-0 right-0 bg-white md:w-96 sm:w-64 customer-ssm:w-7/12 w-full h-full shadow-xl transform transition-transform duration-300 ease-in-out" style={{ transform: showProfileMenu ? 'translateX(0)' : 'translateX(100%)' }}>
                        {/* Header */}
                        <div className="flex justify-between p-3 border-b-2">
                            <h2 className="text-xl font-bold">個人檔案</h2>
                            <button className="text-gray-700" onClick={() => setShowProfileMenu(false)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            </button>
                        </div>
                        {/* Body */}
                        <div className="m-2">
                            {renderComponent()}
                        </div>
                        {/* Footer */}
                        <Footer/>
                    </div>
                </div>
            )}
        </>
    )
}