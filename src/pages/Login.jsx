import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer"
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const navigate =useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        //手動檢查表單驗證
        if (!e.target.checkValidity()) {
            e.stopPropagation();
            return;
        }
        try{
            const response = await axios.post('http://localhost:3001/api/users/login',{
                email,
                password
            });
            login(response.data.user);
            navigate('/Profile');
        } catch(error){
            alert('登入失敗，請重試!');
        }
    };

    return(
        <>
            <h2 className="text-2xl font-bold text-center mt-3">登入</h2>
            <form onSubmit={handleSubmit} className="md:w-4/12 sm:w-5/12 customer-ssm:w-7/12 customer-ssm:mx-auto mx-2">
                <div className="mb-2">
                    <label>
                        <strong>帳號(email):</strong>
                    </label>
                    <input type="text" placeholder="帳號(email)" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="w-full border-stone-200 border-2" required></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>密碼:</strong>
                    </label>
                    <input type="password" placeholder="密碼" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full border-stone-200 border-2" required></input>
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