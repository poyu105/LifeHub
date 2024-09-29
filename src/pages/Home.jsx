import { useEffect, useState } from "react"
import PostCard from "../components/PostCard"
import axios from "axios";
export default function Home(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts at HomePage:', error);
            }
        };
        fetchPosts();
    },[])
    return(
        <>
            <PostCard posts={posts}/>
        </>
    )
}