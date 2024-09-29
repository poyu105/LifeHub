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
                console.error('Error fetching posts on foodRec:', error);
            }
        }
        fetchPosts();
    },[])
    return(
        <>
            <PostCard posts={posts} />
        </>
    )
}