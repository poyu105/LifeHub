import { Link } from "react-router-dom";

export default function Register(){
    return(
        <>
            <h2 className="text-2xl font-bold text-center">註冊</h2>
            <form>
            <div className="mb-2">
                    <label>
                        <strong>使用者名稱:</strong>
                    </label>
                    <input type="text" placeholder="使用者名稱" className="w-full border-stone-200 border-2"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>Email(帳號):</strong>
                    </label>
                    <input type="text" placeholder="Email(帳號)" className="w-full border-stone-200 border-2"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>密碼:</strong>
                    </label>
                    <input type="password" placeholder="密碼" className="w-full border-stone-200 border-2"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>確認密碼:</strong>
                    </label>
                    <input type="password" placeholder="確認密碼" className="w-full border-stone-200 border-2"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>電話:</strong>
                    </label>
                    <input type="number" placeholder="電話" className="w-full border-stone-200 border-2 appearance-none"></input>
                </div>
                <div className="mb-2">
                    <label>
                        <strong>生日:</strong>
                    </label>
                    <input type="date" className="w-full border-stone-200 border-2"></input>
                </div>
                <button type="submit" className="bg-blue-500 text-white w-full rounded">註冊</button>
                <div className="mt-1 text-sm text-center">
                    <span>已經有帳號?&emsp;</span>
                    <Link to='/Login'>登入</Link>
                </div>
            </form>
        </>
    )
}