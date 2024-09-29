import { useEffect, useState } from 'react';
import axios from 'axios';
import PostSlider from './PostSlider';

export default function PostCard() {
    const [posts, setPosts] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/posts');
                console.log(`response data: ${response.data}`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {posts.map((post) => (
                <div key={post._id} className="container w-9/12 mx-auto my-5 border-b-2 border-slate-500">
                    {/* Post Header */}
                    <div className="flex sm:flex-row flex-col justify-between mx-auto border-b-2">
                        <h3 className="md:text-lg text-base font-bold">
                            {/* Bootstrap icon */}
                            <i className="bi bi-person-circle"></i>
                            {post.userName}
                            <span> (Badge)</span>
                        </h3>
                        <span className="md:text-sm text-xs sm:self-center">
                            {/* Bootstrap icon */}
                            <i className="bi bi-send"></i>
                            {post.city},{post.district}
                        </span>
                    </div>
                    {/* Post Img */}
                    <div className="bg-slate-500 my-3 rounded">
                        {post.mediaFiles.length > 0 && (
                            <PostSlider mediaFiles={post.mediaFiles} setCurrentSlide={setCurrentSlide}/>
                        )}
                    </div>
                    {/* Post Content */}
                    <div className="md:text-lg my-2">
                        <p>{post.content}</p>
                    </div>
                    {/* Post Reply */}
                    <div className="text-sm">
                        <p>This is post reply number {post._id}</p>
                    </div>
                    {/* Post Footer */}
                    <div className="flex justify-between sm:flex-row flex-col md:text-base sm:text-sm text-xs my-2">
                        <span>{post.postDate}</span>
                        <label>{post.tags.join(' ')}</label>
                    </div>
                </div>
            ))}
        </>
    );
}
