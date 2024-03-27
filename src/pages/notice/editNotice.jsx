import React, { useEffect, useState } from 'react'
import "./notice.css"
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getClass, getNoticeById } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from 'react-icons/io';
const EditNotice = ({ role }) => {
    const { id } = useParams();
    const [classes, setClasses] = useState();
    const [noticeData, setNoticeData] = useState({
        class_id: null,
        notice_text: '',
        notice_id : id,
    })
    const navigate = useNavigate()
    const getData = async () => {
        console.log(id)

        const classData = await getClass();
        setClasses(classData);
        const noticeData = await getNoticeById(id);
        setNoticeData(noticeData[0]);
    }
    useEffect(() => {
        getData();
    }, [])
    const updateNotice = async (e) => {
        e.preventDefault();
        try {
            // console.log()
            const response = await axios.patch("http://localhost:8080/api/notice/update", noticeData, {
                withCredentials: true,
            })
            if (response.status === 200) {
                toast.success("Notice updated Successfully")
                navigate(`/${role}/notice`)
            }
        } catch (error) {
            toast.error("Error updating notice");
            console.log(error)
        }
    }
    const handleChange = (e) => {
        setNoticeData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(noticeData)
    }
    return (
        <>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/${role}/notice`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Update Notice</h1>
            </div>
            <form onSubmit={updateNotice} >
                <div className="contain input-container classSelect">

                    <label htmlFor="class">Select Class</label>
                    <select value={noticeData.class_id} className='selectBox' name="class_id" id="class" onChange={handleChange}>

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
                    <textarea value={noticeData.notice_text} onChange={handleChange} name="notice_text" id="message" cols="30" rows="10"></textarea>

                </div>
                <button className='btn'>Submit</button>
            </form>
        </>
    )
}

export default EditNotice