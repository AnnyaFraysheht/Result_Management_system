import React, { useEffect, useState } from 'react'
import "./exam.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import ClassInput from '../../components/ClassInput';
import SubjectInput from '../../components/SubjectInput';
const AddExam = () => {
    const navigate = useNavigate();
    const [examData, setExamData] = useState({
        exam_name: '',
        class_id: '',
        subject_id: '',
        exam_date: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(examData)
        const response = axios.post("http://localhost:8080/api/exam", examData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            navigate("/admin/exam");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }

    return (
        <div>
            <h1><Link className='link' to={"/admin/section"}> <IoMdArrowRoundBack /></Link></h1>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="exam_nm">Exam Name</label>
                    <input id='exam_nm' onChange={handleChange} type="text" name="exam_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <ClassInput handleChange={handleChange} />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Exam Subject </label>
                    <SubjectInput handleChange={handleChange} />
                </div>
                <div className='input-container'>

                    <label htmlFor="sch">Exam Date</label>
                    <input onChange={handleChange} type="date" name='exam_date' id="sch" placeholder='Enter Exam Date' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddExam