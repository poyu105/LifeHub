import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //手動檢查表單驗證
        if (!e.target.checkValidity()) {
            e.stopPropagation();
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/api/users/register', {
                username,
                email,
                password,
                phoneNumber,
                birthDate
            });
            console.log('Registration successful:', response.data);
            navigate('/Login');
        } catch (error) {
            if(error.response){
                // 伺服器有回應，但發生錯誤
                console.log(`伺服器回應錯誤! 狀態碼: ${error.response.status}`);
                alert(`伺服器回應錯誤: ${error.response.status}`)
            }else if(error.request){
                // 請求發送出去了，但沒有收到回應
                console.log('伺服器無回應或無法連線!');
                alert('伺服器無回應或無法連線!');
            }else{
                // 其他錯誤
                console.log(`註冊失敗! ${error.message}`);
                alert(`註冊失敗! ${error.message}`);
            }
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold text-center mt-3">註冊</h2>
            <form onSubmit={handleSubmit} className="md:w-4/12 sm:w-5/12 customer-ssm:w-7/12 customer-ssm:mx-auto mx-2">
                <div className="mb-2">
                    <label>
                        <strong>使用者名稱:</strong>
                    </label>
                    <input type="text" placeholder="使用者名稱" value={username} onChange={(e) => { setUsername(e.target.value) }} className="w-full border-stone-200 border-2" required />
                </div>
                <div className="mb-2">
                    <label>
                        <strong>Email(帳號):</strong>
                    </label>
                    <input type="email" placeholder="Email(帳號)" value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full border-stone-200 border-2" required />
                </div>
                <div className="mb-2">
                    <label>
                        <strong>密碼:</strong>
                    </label>
                    <input type="password" placeholder="密碼" value={password} onChange={(e) => { setPassword(e.target.value) }} className="w-full border-stone-200 border-2" required />
                </div>
                <div className="mb-2">
                    <label>
                        <strong>確認密碼:</strong>
                    </label>
                    <input type="password" placeholder="確認密碼" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className="w-full border-stone-200 border-2" required />
                </div>
                <div className="mb-2">
                    <label>
                        <strong>電話:</strong>
                    </label>
                    <input type="number" placeholder="電話" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} className="w-full border-stone-200 border-2 appearance-none" required />
                </div>
                <div className="mb-2">
                    <label>
                        <strong>生日:</strong>
                    </label>
                    <input type="date" value={birthDate} onChange={(e) => { setBirthDate(e.target.value) }} className="w-full border-stone-200 border-2" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white w-full rounded">註冊</button>
                <div className="mt-1 text-sm text-center">
                    <span>已經有帳號?&emsp;</span>
                    <Link to='/Login' className=" text-blue-700 border-b-2 border-blue-700 hover:text-blue-400 hover:border-blue-400">登入</Link>
                </div>
            </form>
            <Footer />
        </>
    )
}
