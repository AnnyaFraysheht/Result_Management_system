import React, {  useState } from 'react'
import "./class.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
const AddClass = () => {
    const navigate = useNavigate();
    
    const [classData, setClassData] = useState({
        class_name: '',
        _class: '',

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
            console.log(classData)
            // alert("Form can be submitted")

            const response = axios.post("http://localhost:8080/api/class", classData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                navigate("/admin/class");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    alert(error.response.data.error)
                }
            })
        
    }
    return (
        <div>
            <h1><Link className='link' to={"/admin/class"}> <IoMdArrowRoundBack /></Link></h1>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="class_name">Class Name</label>
                    <input onChange={handleChange} type="text" name="class_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <input onChange={handleChange} type="text" name="_class" placeholder='Enter class' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddClass