import { Link } from "react-router-dom";
import Footer from "../components/Footer"

export default function Login(){
    return(
        <>
            <h2 className="text-2xl font-bold text-center mt-3">登入</h2>
            <form className="md:w-4/12 sm:w-5/12 customer-ssm:w-7/12 customer-ssm:mx-auto mx-2">
                <div className="mb-2">
                    <label>
                        <strong>帳號(email):</strong>
                    </label>
                    <input type="text" placeholder="帳號(email)" className="w-full border-stone-200 border-2"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>密碼:</strong>
                    </label>
                    <input type="text" placeholder="密碼" className="w-full border-stone-200 border-2"></input>
                </div>
                <button type="submit" className="bg-blue-500 text-white w-full rounded">登入</button>
                <div className="mt-1 text-sm text-center">
                    <span>沒有帳號?&emsp;</span>
                    <Link to='/Register' className=" text-blue-700 border-b-2 border-blue-700 hover:text-blue-400 hover:border-blue-400">註冊</Link>
                </div>
            </form>
            <Footer/>
        </>
    )
}