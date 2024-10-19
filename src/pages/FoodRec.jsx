import axios from "axios";
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";

export default function FoodRec(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async ()=>{
            try {
                const response = await axios.get('http://localhost:3001/api/posts/foodRec');
                setPosts(response.data);
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
                    console.log(`貼文載入失敗! ${error.message}`);
                    alert(`貼文載入失敗! ${error.message}`);
                }
            }
        }
        fetchPosts();
    },[])
    return(
        <>
            <PostCard posts={posts} setPosts={setPosts}/>
        </>
    )
}