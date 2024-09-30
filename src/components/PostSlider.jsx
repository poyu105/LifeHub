import Slider from "react-slick";
export default function PostSlider({mediaFiles, setCurrentSlide}){
    // 照(影)片carousel設定
    const settings = {
        // 底下的paging
        dots: true,
        // 最後一張再滑是否回到第一張
        infinite: false,
        // 滑動時間(毫秒)
        speed: 500,
        // 一次要顯示幾張
        slidesToShow: 1,
        // 一次滑動要顯示幾張
        slidesToScroll: 1,
        // 自動輪播
        autoplay: false,
        // 當前顯示圖片索引變化時觸發
        beforeChange: (oldIndex, newIndex) => {setCurrentSlide(newIndex)}
    };
    return(
        <Slider className="h-96" {...settings}>
            {mediaFiles.map((file, index) => (
                <div key={index} className="h-96">
                    {file.type === 'image' ? (
                        //上傳檔案(Post.jsx)會與從抓取所有檔案(PostCard.jsx)時產生URL衝突，故需進行判斷
                        <img src={file.url.includes('uploads') ? `http://localhost:3001/${file.url}` : file.url} alt={`media-${index}`} className="max-w-full h-full object-cover mx-auto" />
                    ):(
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="max-w-full h-full object-cover mx-auto"
                            onClick={(e) => {
                                // 切換靜音狀態
                                e.target.muted = !e.target.muted;
                            }}
                        >
                            {/* 上傳檔案(Post.jsx)會與從抓取所有檔案(PostCard.jsx)時產生URL衝突，故需進行判斷 */}
                            <source src={file.url.includes('uploads') ? `http://localhost:3001/${file.url}` : file.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            ))}
        </Slider>
    )
}