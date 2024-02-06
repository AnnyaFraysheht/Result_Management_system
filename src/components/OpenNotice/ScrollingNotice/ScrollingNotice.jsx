import React, { useEffect, useState } from 'react'
import "./scrollingNotice.css"
const ScrollingNotice = () => {
    const [notices, setNotices] = useState();
    useEffect(() => {
        const fetchOpenNotice = async () => {
            const response = await fetch("http://localhost:8080/api/opennotice")
            const data = await response.json();
            setNotices(data.data);
        }
        fetchOpenNotice();
    }, [])

    return (
        <span className="scrolling-container" id='scrollingContainer'>
            <marquee className="marquee" behavior="scroll" direction="left" scrollamount="5" style={{ display: 'inline-block' }}>

                {
                    notices?.map((notice) => (
                        <span key={notice.notice_id} className={`notices `}>
                            {notice.date_posted.slice(0, 10)}: {notice.notice_text} 
                        </span>
                    ))
                }

            </marquee>

        </span>
    )
}

export default ScrollingNotice