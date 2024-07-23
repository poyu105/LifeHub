export default function Login({switchToRegister}){
    return(
        <>
            <h2 className="text-2xl font-bold text-center">登入</h2>
            <form>
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
                    <button onClick={switchToRegister}>註冊</button>
                </div>
            </form>
        </>
    )
}