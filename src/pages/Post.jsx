import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

export default function Post(){
    //post日期狀態
    const [postDate, setPostDate] = useState('');
    useEffect(()=>{
        // 獲取當前日期
        const currentDate = new Date();
        // 格式化日期為 YYYY/MM/dd
        const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`;
        setPostDate(formattedDate);
    },[]);

    return(
        <>
            <PageHeader title={"新增貼文"}/>
            <form className="container w-9/12 mx-auto my-5 border-b-2 border-slate-500">
                {/* Post Header */}
                <div className="flex sm:flex-row flex-col justify-between mx-auto border-b-2">
                    {/* UserName 由系統自動帶入 */}
                    <h3 className="md:text-lg text-base font-bold">{/* Bootstrap icon */}<i className="bi bi-person-circle"></i>UserName<span> (Badge)</span></h3>
                    <div className="md:text-sm text-xs sm:self-center border-1 border-red-600 rounded p-1">
                        {/* Bootstrap icon */}<i className="bi bi-send me-1"></i>
                        <input type="text" placeholder="請輸入縣市" className="me-1 sm:w-20 w-16 border border-black rounded" required/>,
                        <input type="text" placeholder="請輸入區域" className="ms-1 sm:w-20 w-16 border border-black rounded" required/>
                    </div>
                </div>
                {/* Post Img */}
                <div className="flex flex-col bg-slate-500 my-3 border-1 border-red-600 rounded p-1">
                    <label className="font-bold text-sm">選取照片</label>
                    <input type="file" multiple accept="image/*,video/*" className="" required/>
                </div>
                {/* Post Content */}
                <div className="md:text-lg my-2 border-1 border-red-600 rounded p-1">
                    <label className="font-bold text-sm">請輸入貼文內容:</label>
                    <textarea placeholder="貼文內容" className="w-full border rounded-lg" required></textarea>
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
                        <input type="text" value={postDate} className="border pointer-events-none text-sm w-20" readOnly/>
                    </div>
                    <div className="flex flex-row items-center flex-wrap gap-2 border-1 border-red-600 rounded p-1">
                        <label className="font-bold text-sm">請選取標籤(至少一項):</label>
                        <label className="block">
                            <input type="checkbox" value="#美食推薦" />
                            #美食推薦
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#交通指南" />
                            #交通指南
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#購物指南" />
                            #購物指南
                        </label>
                        <label className="block">
                            <input type="checkbox" value="#休閒娛樂" />
                            #休閒娛樂
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded p-1 mb-1">完成</button>
            </form>
        </>
    )
}