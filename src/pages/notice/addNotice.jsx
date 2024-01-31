import React, { useEffect, useState } from 'react'
import "./notice.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getClass } from '../../services/fetchFunction';
const AddNotice = () => {
    const [classes, setClasses] = useState();
    const [noticeData, setNoticeData] = useState({
        class_id: null,
        notice_text: ''
    })
    const navigate = useNavigate()
    const getData = async () => {

        const data = await getClass();
        setClasses(data)
    }
    useEffect(() => {
        getData();
    }, [])
    const submitNotice = async (e) => {
        e.preventDefault();
        try {
            // console.log()
            const response = await axios.post("http://localhost:8080/api/notice", noticeData, {
                withCredentials: true,
            })
            if(response.status === 200){
                navigate("/admin/notice")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setNoticeData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(noticeData)
    }
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Add Notice</h1>
            <form onSubmit={submitNotice} >
                <div className="contain input-container classSelect">

                    <label htmlFor="class">Select Class</label>
                    <select className='selectBox' name="class_id" id="class" onChange={handleChange}>

                        <option value={''}>Open Notice</option>
                        {
                            classes?.map((_class) => {
                                return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                            })
                        }

                    </select>
                </div>
                <div className="contain input-container">
                    <label htmlFor="message">Message</label>
                    <textarea onChange={handleChange} name="notice_text" id="message" cols="30" rows="10"></textarea>

                </div>
                <button >Submit</button>
            </form>
        </>
    )
}

export default AddNotice