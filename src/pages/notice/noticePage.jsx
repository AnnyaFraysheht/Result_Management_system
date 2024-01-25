import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import React, { useCallback, useEffect, useState } from 'react'
import "./notice.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
const NoticePage = () => {
    const [notices, setNotices] = useState()

    const getNotices = async () => {
        const response = await axios.get("http://localhost:8080/api/notice", {
            withCredentials: true,
        })
        setNotices(response.data.data)
        // console.log(response.data.data)
    }
    const handleDelete =useCallback( async (id) =>{
        try {
            await axios.delete(`http://localhost:8080/api/notice/${id}`,{
                withCredentials: true
            })
            getNotices();
            // console.log(response)
        } catch (error) {
            
        }
    },[]);
    useEffect(() => {
        getNotices();
    }, [handleDelete])
    return (
        <>
            <h2>Notices</h2>
            <button className="add"><Link className='link' to={"add"}>Add Notices</Link></button>
            <table border={"2px"}>
                <thead>
                    <tr>
                        <th>For</th>
                        <th>Notice</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        notices?.map((notice) => {
                            return <tr key={notice.notice_id}>
                                <td>{notice.class_id ? notice.class_name : "Open Notice"}</td>
                                <td>{notice.notice_text}</td>
                                <td><button><FaEdit size={20} color="green" /></button></td>
                                <td><button onClick={(e) =>handleDelete(notice.notice_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default NoticePage


