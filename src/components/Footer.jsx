import React, { useState, useEffect } from 'react';

export default function Footer() {
    const [lastModifiedDate, setLastModifiedDate] = useState('');

    useEffect(() => {
    const date = new Date(document.lastModified);
    setLastModifiedDate(formatDate(date));
    }, []);

    const formatDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${day}, ${month} ${dayOfMonth}, ${year}`;
    };

    return (
    <footer className="absolute bottom-0 bg-black text-zinc-50 text-center mt-3 px-2 md:text-sm text-xs">
        <div className="py-2">
            <small className="lastModifiedDate text-center">Update: {lastModifiedDate}</small><br/>
            <small>&copy;2024 <a className="text-center hover:text-zinc-300" href="https://poyu105.github.io/myweb" target="_blank">Poyu webDev.</a></small>
            <span>
                <a className="m-1 hover:text-zinc-300" href="https://github.com/poyu105" target="_blank"><i className="bi bi-github"></i></a>
            </span>
            <span>
                <a className="m-1 hover:text-zinc-300" href="https://www.instagram.com/ch_03105?igsh=Z2oxNDQ4MHZ5dm53&utm_source=qr" target="_blank"><i className="bi bi-instagram"></i></a>
            </span>
            <span>
                <a className="m-1 hover:text-zinc-300" href="https://www.facebook.com/profile.php?id=100015264487352" target="_blank"><i className="bi bi-facebook"></i></a>
            </span><br/>
            <small>本網頁所用之圖片、資訊皆為製作個人作品使用，非商業營利用途，如有冒犯，請郵件: <a className="text-center hover:text-zinc-300" href="mailto:chen06115@gmail.com">chen06115@gmail.com (點擊開啟)</a>，收到後將盡速下架!</small>
        </div>
    </footer>
    );
}