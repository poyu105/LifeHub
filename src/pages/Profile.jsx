import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
export default function Profile() {
    // 獲取當前用戶
    const { user, logout, updateUser } = useAuth();
    const [username, setUsername]=useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [birthDate, setBirthDate] = useState(user.birthDate);
    //用戶貼文
    const [posts, setPosts] = useState([]);
    //表單編輯狀態
    const [isEditable, setIsEditable] = useState(false);
    //格式化日期
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    //取消編輯按鈕
    const handleCancel = (e)=>{
        e.preventDefault();
        setIsEditable(false);
        setUsername(user.username);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setBirthDate(user.birthDate);
    }
    // 登出
    const handleLogout = () => {
        try {
            logout();
            console.log(`F:已登出用戶: ${JSON.stringify(user)}`);
        } catch (error) {
            alert('登出失敗!');
            console.log(`F:登出失敗，用戶資料: ${JSON.stringify(user)}`);
        }
    };
    //提交表單
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //手動檢查表單驗證
        if (!e.target.checkValidity()) {
            e.stopPropagation();
            return;
        }
        const upDateUserData = {
            username,
            email,
            phoneNumber,
            birthDate
        };
        try {
            await updateUser(upDateUserData);
            setIsEditable(false);
        } catch (error) {
            setIsEditable(false);
            handleCancel(e);
        }
    }
    //獲取用戶貼文
    const fetchPosts = async ()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/users/${user.id}/posts`);
            if(response.status==200){
                setPosts(response.data);
            }
        } catch (error) {
            if (error.response) {
                // 伺服器有回應，但發生錯誤
                console.log(`伺服器回應錯誤! 狀態碼: ${error.response.status}`);
                setPosts({ state: 'ERROR', message: `伺服器錯誤: ${error.response.status}` });
                alert(`伺服器回應錯誤: ${error.response.status}`);
            } else if (error.request) {
                // 請求發送出去了，但沒有收到回應
                console.log('伺服器無回應或無法連線!');
                setPosts({ state: 'ERROR', message: '伺服器無回應或無法連線!' });
                alert('伺服器無回應或無法連線!');
            } else {
                // 其他錯誤
                console.log(`載入用戶貼文失敗! ${error.message}`);
                setPosts({ state: 'ERROR', message: error.message });
                alert(`載入用戶貼文失敗! ${error.message}`);
            }
        }
    }
    useEffect(()=>{
        if(user){
            fetchPosts();
        }
    },[user]);

    return (
        <>
            {user != null ? 
                <>
                    <div className="w-10/12 mx-auto">
                        {/* header */}
                        <header className="flex flex-row justify-between items-center">
                            <h1 className="text-center text-2xl">歡迎 {user.username}</h1>
                            <div>
                                <button onClick={()=>{alert('噢噢! 此功能似乎還在開發階段無法使用!')}} className="bg-yellow-300 hover:bg-yellow-400 text-black p-1 m-1 rounded">編輯個人資料</button>
                                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white p-1 m-1 rounded">登出</button>
                            </div>
                        </header>
                        <hr/>
                        {/* body */}
                        <div className="flex justify-center flex-col items-center mb-4">
                            <div className="flex items-center my-2 w-9/12">
                                <div className="rounded-full w-fit">
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="border-3 border-slate-300 rounded-full sm:w-40 w-24"/>
                                </div>
                                <div className="flex justify-evenly w-3/4">
                                    <div className="text-center">
                                        <p className="sm:text-2xl text-lg font-bold">{posts.state==='ERROR'? 'ERROR':posts.length}</p>
                                        <p className="sm:text-xl">則貼文</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="sm:text-2xl text-lg font-bold">999</p>
                                        <p className="sm:text-xl">被讚</p>
                                    </div>
                                </div>
                                {/* 以下預計開發編輯個人資料modal */}
                                {/* <div className="w-3/6">
                                    <form onSubmit={handleSubmit} className="w-1/2">
                                        <div className="flex flex-col">
                                            <label>使用者名稱</label>
                                            <input onChange={(e)=>{setUsername(e.target.value)}} value={username} className={`w-4/5 p-0.5 ${isEditable? ('border border-slate-300 rounded'):('bg-white border-b border-slate-200 cursor-default')} `} readOnly={!isEditable} disabled={!isEditable} required={isEditable}></input>
                                        </div>
                                        <div className="flex flex-col">
                                            <label>email</label>
                                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className={`w-4/5 p-0.5 ${isEditable? ('border border-slate-300 rounded'):('bg-white border-b border-slate-200 cursor-default')} `} readOnly={!isEditable} disabled={!isEditable} required={isEditable}></input>
                                        </div>
                                        <div className="flex flex-col">
                                            <label>電話</label>
                                            <input onChange={(e)=>{setPhoneNumber(e.target.value)}} value={phoneNumber} className={`w-4/5 p-0.5 ${isEditable? ('border border-slate-300 rounded'):('bg-white border-b border-slate-200 cursor-default')} `} readOnly={!isEditable} disabled={!isEditable} required={isEditable}></input>
                                        </div>
                                        <div className="flex flex-col">
                                            <label>生日</label>
                                            <input type="Date" onChange={(e)=>{setBirthDate(e.target.value)}} value={formatDate(birthDate)} className={`w-4/5 p-0.5 ${isEditable? ('border border-slate-300 rounded'):('bg-white border-b border-slate-200 cursor-default')} `} readOnly={!isEditable} disabled={!isEditable} required={isEditable}></input>
                                        </div>
                                        {isEditable ? (
                                            <>
                                                <button onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white p-1 mt-2 me-2 rounded">取消</button>
                                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-1 mt-2 me-2 rounded">儲存</button>
                                            </>
                                        ):(
                                            <> 
                                                <button onClick={(e)=> {e.preventDefault(); setIsEditable(true);}} className="bg-yellow-300 hover:bg-yellow-400 text-black p-1 mt-2 rounded">編輯個人資料</button>
                                            </>
                                        )}
                                    </form>
                                </div> */}
                            </div>
                            {/* 以下為個人簡介 */}
                            <div className="w-9/12 mb-1">
                                <p>{user.username}</p>
                                <p>我是{user.username}的簡介，目前正在進行開發。</p>
                                <p>請見github查看代碼:</p>
                                <p>
                                    前端代碼:<a href="https://github.com/poyu105/LifeHub" className="text-blue-500" target="_blank">https://github.com/poyu105/LifeHub</a><br/>
                                    後端代碼<span className="text-xs">(請安裝相關程式以順利運行後端!)</span>:<a href="https://github.com/poyu105/LifeHub-Backend" className="text-blue-500" target="_blank">https://github.com/poyu105/LifeHub-Backend</a>
                                </p>
                                <div className="mt-3 flex justify-center gap-2">
                                    <button onClick={()=>{alert('噢噢! 此功能似乎還在開發階段無法使用!')}} className="w-5/12 p-1 bg-neutral-600 hover:bg-neutral-500 rounded text-white sm:text-base text-sm">編輯個人檔案</button>
                                    <button onClick={()=>{alert('噢噢! 此功能似乎還在開發階段無法使用!')}} className="w-5/12 p-1 bg-neutral-600 hover:bg-neutral-500 rounded text-white sm:text-base text-sm">分享個人檔案</button>
                                </div>
                            </div>
                            {/* 貼文分隔線 */}
                            <div className="bg-slate-200 w-4/5 h-0.5 rounded"></div>
                            {posts.state === 'ERROR' ? (
                                <div>
                                    <h2 className="text-xl font-bold">貼文載入失敗:</h2>
                                    <p>{posts.message}</p>
                                </div>
                            ): (
                                posts.length >0 ? (
                                    <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2 w-4/5 my-2">
                                        {posts.map((post)=>{
                                            return(
                                                <div key={post._id} className="overflow-hidden rounded">
                                                    {post.mediaFiles[0].type == 'image' ? (
                                                        <img className="w-full h-auto aspect-square object-cover rounded" src={'http://localhost:3001/'+post.mediaFiles[0].url} alt="postMedia"></img>
                                                    ):(
                                                        <video className="w-full h-auto aspect-square object-cover rounded">
                                                            <source src={'http://localhost:3001/'+post.mediaFiles[0].url} type="video/mp4"></source>
                                                        </video>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ):(
                                    <div>
                                        <h2 className="font-bold text-xl">目前沒有貼文喔!</h2>
                                    </div>
                                )
                            )
                            }
                        </div>
                    </div>
                </>
                :
                <div className="alert text-center">請先登入!</div>
            }
        </>
    );
}
