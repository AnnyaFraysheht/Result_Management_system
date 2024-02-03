import React, { useEffect, useState } from 'react'
import "./notice.css"
const OpenNotice = () => {
    const [notices, setNotices] = useState();
    useEffect(()=>{
        const fetchOpenNotice = async () => {
            const response = await fetch("http://localhost:8080/api/opennotice")
            const data = await response.json();
            setNotices(data.data);
        }
        fetchOpenNotice();
    },[])
  return (
    <div className="notice">
                <div className="heading"><h1>Public Notice</h1></div>
                <div className="notices">
                    {
                        notices?.map((notice) => {
                            return <div key={notice.notice_id} className="eachNotice">
                                <div className="date"><h2>{notice.date_posted.slice(0, 10)}</h2></div>
                                <div className="details"><h2>{notice.notice_text}</h2></div>
                            </div>
                        })
                    }

                </div>
            </div>
  )
}

export default OpenNotice