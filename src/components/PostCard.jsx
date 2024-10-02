import { useEffect, useState } from 'react';
import axios from 'axios';
import PostSlider from './PostSlider';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Comments from './Comments';

export default function PostCard({posts, setPosts}) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const {user} = useAuth();
    const [newReply, setNewReply] = useState({});
    const handleAddNewReply = async (post)=>{
        const commentData = {
            userId: user.id,
            content: newReply[post._id]
        };
        try {
            const response = await axios.post(`http://localhost:3001/api/posts/${post._id}/comments`,commentData);
            if(response.status==201){
                alert('成功新增評論!');
                //更新貼文的評論
                const updatedPosts = posts.map((p)=>{
                    if(p._id===post._id){
                        return{
                            ...p,
                            comments:[{_id:`temp_ReplyId ${new Date()}` ,username: user.username, content: newReply[post._id], createAt: new Date()}, ...p.comments]
                        }
                    }
                    return p;
                })
                setPosts(updatedPosts); // 更新狀態
            }
            setNewReply({...newReply, [post._id]: ''});
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
        //查看更多留言
        const handleLoadMoreComments = (post) => {
            const updatedPosts = posts.map((p) => {
                if (p._id === post._id) {
                    return {
                        ...p,
                        visibleCommentsCount: (p.visibleCommentsCount || 3) + 3
                    };
                }
                return p;
            });
            setPosts(updatedPosts); // 更新狀態
        };
    return (
        <>
            {posts.map((post) => {
                //設定每則貼文留言顯示數量
                const visibleCommentsCount = post.visibleCommentsCount || 3;
                return(
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
                        <div className="bg-gray-200 my-3 rounded">
                            {post.mediaFiles.length > 0 && (
                                <PostSlider mediaFiles={post.mediaFiles} setCurrentSlide={setCurrentSlide}/>
                            )}
                        </div>
                        {/* Post Content */}
                        <div className="md:text-lg text-sm my-6 border-b-1">
                            <p className='whitespace-pre-wrap'>{post.content}</p>
                        </div>
                        {/* Post Reply */}
                        <div className="flex flex-col">
                            {post.comments.length > 0 ? post.comments.slice(0, visibleCommentsCount).map((reply)=><Comments key={reply._id} reply={reply} />):<p className="text-gray-500">目前還沒有回覆哦!</p>}
                            {post.comments.length > visibleCommentsCount && (
                                <button onClick={() => handleLoadMoreComments(post)} className="mt-2 text-blue-500">更多評論</button>
                            )}
                        </div>
                        {user ? 
                            (<form onSubmit={(e)=>{
                                e.preventDefault();
                                handleAddNewReply(post);}} className='flex align-bottom flex-wrap mt-5'>
                                <label className='self-end'>{user.username}&emsp;</label>
                                <div className='sm:w-2/5 w-full flex flex-col justify-end relative'>
                                    <textarea value={newReply[post._id]||''} onChange={(e)=>{setNewReply({...newReply, [post._id]: e.target.value})}} placeholder='寫點什麼吧...' className='border-b-1 w-full resize-none pr-8' rows='1' required></textarea>
                                    {newReply && (
                                        <button type="button" onClick={()=>setNewReply('')} className="text-stone-400 hover:text-stone-300 text-sm rounded p-1 mx-1 absolute right-1"><i className="bi bi-x-circle-fill"></i></button>
                                    )}
                                </div>
                                <button type='submit' className='bg-slate-500 hover:bg-slate-400 text-white rounded text-sm p-1'><i className="bi bi-send"></i>新增留言</button>
                            </form>) :
                            <div className='bg-amber-200 border-2 rounded mt-5 p-1 md:text-lg text-sm'>
                                <Link to="/login" className=" text-blue-500 border-b-1 border-blue-500 hover:text-blue-700 hover:border-blue-700">登入</Link>以留言
                            </div>
                        }
                        {/* Post Footer */}
                        <div className="flex justify-between sm:flex-row flex-col md:text-base sm:text-sm text-xs my-2">
                            <span>{post.postDate}</span>
                            <label>{post.tags.join(' ')}</label>
                        </div>
                    </div>
            )})}
        </>
    );
}
