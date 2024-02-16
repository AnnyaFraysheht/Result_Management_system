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
                <div className="heading"><h3>Public Notice</h3></div>
                <div className="notices">
                    {
                        notices?.map((notice) => {
                            return <div key={notice.notice_id} className="eachNotice">
                                <div className="date">{notice.date_posted.slice(0, 10)}</div>
                                <div className="details">{notice.notice_text}</div>
                            </div>
                        })
                    }

                </div>
            </div>
  )
}

export default OpenNotice