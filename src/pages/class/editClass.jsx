import React, { useEffect, useState } from 'react'
import "./class.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getClassById } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
const EditClass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [classData, setClassData] = useState({
        class_name: '',
        _class: '',

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(classData)
        // alert("Form can be submitted")

        axios.patch("http://localhost:8080/api/class/edit", classData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Class edited successfully");
            navigate("/admin/class");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    useEffect(() => {
        const getData = async () => {
            const result = await getClassById(id)
            console.log("result", result)
            const filteredData = {
                class_name: result[0].class_name,
                _class: result[0].class,
                class_id: result[0].class_id
            }
            setClassData(filteredData);
        }
        getData();
    }, [])
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/class`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Class</h1>
            </div>
            <form onSubmit={handleUpdate} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="class_name">Class Name</label>
                    <input value={classData.class_name} onChange={handleChange} type="text" name="class_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <input value={classData._class} onChange={handleChange} type="text" name="_class" placeholder='Enter class' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditClass