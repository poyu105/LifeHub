export default function Post() {
    // 創建一個包含多個 Post 的數組
    const posts = Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="container w-9/12 mx-auto my-5 border-b-2 border-slate-500">
            {/* Post Header */}
            <div className="flex sm:flex-row flex-col justify-between mx-auto border-b-2">
                <h3 className="md:text-lg text-base font-bold">{/* Bootstrap icon */}<i className="bi bi-person-circle"></i>UserName<span> (Badge)</span></h3>
                <span className="md:text-sm text-xs sm:self-center">{/* Bootstrap icon */}<i className="bi bi-send"></i>台中市,沙鹿區</span>
            </div>
            {/* Post Img */}
            <div className="bg-slate-500 my-3 rounded">
                <img src="" alt="IMG" className="w-full h-auto" />
            </div>
            {/* Post Content */}
            <div className="md:text-lg my-2">
                <p>This is post content number {i + 1}.</p>
            </div>
            {/* Post Footer */}
            <div className="flex justify-between sm:flex-row flex-col md:text-base sm:text-sm text-xs my-2">
                <span>-2024/7/17</span>
                <label>#台中市#沙鹿區#美食推薦</label>
            </div>
        </div>
    ));

    return (
        <>
            {posts}
        </>
    );
}
