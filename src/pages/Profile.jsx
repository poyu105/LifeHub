import { useAuth } from "../context/AuthContext";
export default function Profile() {
    // 獲取當前用戶
    const { user, logout } = useAuth();
    
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

    return (
        <>
            {user != null ? 
                <>
                    <div className="w-10/12 mx-auto">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-center text-2xl">歡迎 {user.username}</h1>
                            <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">登出</button>
                        </div>
                        <hr/>
                    </div>
                </>
                :
                <div className="alert text-center">請先登入!</div>
            }
            <button onClick={()=>{console.log(`目前的用戶資訊: ${JSON.stringify(user)}`); alert(`id: ${user.id} \n使用者名稱: ${user.username} \nEmail: ${user.email}`)}} className="bg-yellow-400 text-black p-2 rounded">顯示目前用戶資訊</button>
        </>
    );
}
