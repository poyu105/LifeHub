import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostSlider from "../components/PostSlider";

export default function Post() {
    // post日期狀態
    const [postDate, setPostDate] = useState('');
    useEffect(() => {
        // 獲取當前日期
        const currentDate = new Date();
        // 格式化日期為 YYYY/MM/dd
        const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
        setPostDate(formattedDate);
    }, []);

    const { user } = useAuth();
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    // 標籤更動
    const handleTagsChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setTags([...tags, value]);
        } else {
            setTags(tags.filter(tag => tag !== value));
        }
    }
    // 照(影)片更動
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        //判斷上傳的檔案為照片或影片
        const newFiles = files.map(file => ({
            url: URL.createObjectURL(file),
            type: file.type.startsWith('video') ? 'video' : 'image',
            file//儲存原本的檔案
        }));
        setMediaFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
    // 刪除照(影)片
    const handleDeleteFile = () => {
        setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== currentSlide));
        // 如果刪除的照片在最後一張，需要更新 currentSlide 的值以避免錯誤的顯示
        if (currentSlide >= mediaFiles.length - 1 && mediaFiles.length > 1) {
            setCurrentSlide(currentSlide - 1);
        }
    };
    
    // 上傳按鈕觸發
    const handleFileClick = ()=>{
        $('#fileInput').click();
    }

    // 處理提交後端
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //手動檢查表單驗證
        if (!e.target.checkValidity()) {
            e.stopPropagation();
            return;
        }
        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('userName', user.username);
        formData.append('city', city);
        formData.append('district', district);
        formData.append('content', content);
        formData.append('postDate', postDate);
        tags.forEach(element => {
            formData.append('tags',element);
        });
        mediaFiles.forEach(element => {
            formData.append('mediaFiles', element.file);
            console.log(`F: 照片URL: ${element.file}`);
        });
        try {
            const response = await axios.post('http://localhost:3001/api/posts',formData);
            if(response.status==201){
                alert('貼文已成功新增!');
                navigate('/');
            }
            else{
                alert('貼文新增失敗!');
            }
        } catch (error) {
            console.log(`F:貼文新增失敗!${error}`);
            alert('貼文新增失敗!');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="container w-9/12 mx-auto my-5 border-b-2 border-slate-500">
                {/* Post Header */}
                <div className="flex sm:flex-row flex-col justify-between mx-auto border-b-2">
                    {/* UserName 由系統自動帶入 */}
                    <h3 className="md:text-lg text-base font-bold">{/* Bootstrap icon */}<i className="bi bi-person-circle"></i>{user.username}<span> (Badge)</span></h3>
                    <div className="md:text-sm text-xs sm:self-center border-1 border-red-600 rounded p-1">
                        {/* Bootstrap icon */}<i className="bi bi-send me-1"></i>
                        <input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} placeholder="請輸入縣市" className="me-1 sm:w-20 w-16 border border-black rounded" required />,
                        <input type="text" value={district} onChange={(e) => { setDistrict(e.target.value) }} placeholder="請輸入區域" className="ms-1 sm:w-20 w-16 border border-black rounded" required />
                    </div>
                </div>
                {/* Post Img */}
                <div className="flex flex-col bg-slate-200 my-3 border-1 border-red-600 rounded p-1">
                    <div className="flex flex-row justify-between items-center mb-1">
                        <label className="font-bold sm:text-lg">選取照片</label>
                        <div className="flex flex-row gap-2">
                            <input id="fileInput" type="file" multiple accept="image/*,video/*" onChange={handleFileChange} className="hidden" required />
                            <button type="button" onClick={handleFileClick} className="border border-gray-500 rounded bg-blue-500 hover:bg-blue-600 text-white p-1">上傳檔案</button>
                            <button type="button" onClick={handleDeleteFile} className="border border-gray-500 rounded bg-red-500 hover:bg-red-600 text-white p-1">移除</button>
                        </div>
                    </div>
                    {mediaFiles.length > 0 && (
                        <PostSlider mediaFiles={mediaFiles} setCurrentSlide={setCurrentSlide} />
                    )}
                </div>
                {/* Post Content */}
                <div className="md:text-lg my-2 border-1 border-red-600 rounded p-1">
                    <label className="font-bold text-sm">請輸入貼文內容:</label>
                    <textarea value={content} onChange={(e) => { setContent(e.target.value) }} placeholder="貼文內容" className="w-full border rounded-lg" required></textarea>
                </div>
                {/* Post Reply */}
                <div className="text-sm">
                    <p>這是一則評論。</p>
                </div>
                {/* Post Footer */}
                <div className="flex justify-between sm:flex-row flex-col md:text-base sm:text-sm text-xs my-2">
                    {/* 時間由系統帶入 */}
                    <div className="flex flex-col">
                        <label className="font-bold text-sm">發文時間(系統帶入)</label>
                        <input type="text" value={postDate} className="border pointer-events-none text-sm w-20" readOnly />
                    </div>
                    <div className="flex flex-row items-center flex-wrap gap-2 border-1 border-red-600 rounded p-1">
                        <label className="font-bold text-sm">請選取標籤(至少一項):</label>
                        <label className="block">
                            <input type="checkbox" value="#美食推薦" onChange={handleTagsChange} />
                            #美食推薦
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#交通指南" onChange={handleTagsChange} />
                            #交通指南
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#購物指南" onChange={handleTagsChange} />
                            #購物指南
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#休閒娛樂" onChange={handleTagsChange} />
                            #休閒娛樂
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded p-1 mb-1">完成</button>
            </form>
        </>
    );
}
