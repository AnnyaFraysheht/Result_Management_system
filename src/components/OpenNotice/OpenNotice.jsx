import React, { useEffect, useState } from 'react'
import "./notice.css"
import Spinner from '../loader/Spinner';
const OpenNotice = () => {
    const [notices, setNotices] = useState();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchOpenNotice = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:8080/api/opennotice")
            const data = await response.json();
            setNotices(data.data);
            setLoading(false);
        }
        fetchOpenNotice();
    }, [])
    return (

        <div className="notice">
            <div className="heading"><h3>Public Notice</h3></div>
            {
                loading ? <Spinner /> : <div className="notices">
                    {
                        notices?.map((notice) => {
                            return <div key={notice.notice_id} className="eachNotice">
                                <div className="date">{notice.date_posted.slice(0, 10)}</div>
                                <div className="details">{notice.notice_text}</div>
                            </div>
                        })
                    }

                </div>
            }
        </div>
    )
}

export default OpenNotice