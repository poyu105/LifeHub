import axios from "axios";
import { useEffect, useState } from "react"
import PostCard from "../components/PostCard";

export default function ShoppingGuide(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts/shoppingGuide');
                setPosts(response.data);
            } catch (error) {
                console.error('Failed fetching posts at entertainment:', error);
            }
        }
        fetchPosts();
    },[]);
    return(
        <>
            <PostCard posts={posts} setPosts={setPosts}/>
        </>
    )
}