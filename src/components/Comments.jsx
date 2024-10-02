import { useState, useEffect, useRef } from "react";

export default function Comments({ reply }) {
    const [showFullReply, setShowFullReply] = useState(false);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const contentRef = useRef(null);
    const createdAtDate = new Date(reply.createAt);
    const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
    const day = String(createdAtDate.getDate()).padStart(2, '0');
    const formattedDate = `${month}月${day}日`;

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            if (contentRef.current) {
                setIsOverflowed(contentRef.current.scrollWidth > contentRef.current.clientWidth);
            }
        });

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => {
            if (contentRef.current) {
                observer.unobserve(contentRef.current);
            }
        };
    }, [reply.content]);

    return (
        <div className="flex flex-col border-b-1 border-gray-300 gap-1">
            <div className='flex items-center gap-3 flex-row'>
                <h1 className='md:text-lg sm:text-md text-sm'>{reply.username}</h1>
                <span className='md:text-sm sm:text-xs text-xxs'>{formattedDate}</span>
            </div>
            <div>
                <p ref={contentRef} className={`md:text-md sm:text-sm text-xs max-w-fit ${showFullReply ? 'max-h-auto' : 'overflow-hidden whitespace-nowrap text-ellipsis'}`}>
                    {reply.content}
                </p>
                {isOverflowed && !showFullReply && (
                    <button className="text-gray-400 font-bold text-sm inline" onClick={() => setShowFullReply(true)}>更多內容</button>
                )}
                {showFullReply && (
                    <button className="text-gray-400 font-bold text-sm inline" onClick={() => setShowFullReply(false)}>收起內容</button>
                )}
            </div>
        </div>
    );
}