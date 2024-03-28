import React, { useState } from 'react'
import "./subject.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import ClassInput from '../../components/ClassInput';
import { toast } from 'react-toastify';
const AddSubject = () => {
    const navigate = useNavigate();

    const [subjectData, setSubjectData] = useState({
        subject_name: '',
        subject_code: '',
        class_id: ''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData(prev => ({ ...prev, [name]: value }));
        console.log(subjectData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmptyField = Object.values(subjectData).some(value => value.trim() === '');

        if (isEmptyField) {
            alert('Please fill in all fields');
            return;
        }
        console.log(subjectData)
        // alert("Form can be submitted")

        const response = axios.post("http://localhost:8080/api/subject", subjectData, {
            withCredentials: true,
        }).then(response => {
            // console.log(response.data)
            if (response.status === 200) {
                toast.success("Subject Added Successfully")
                navigate("/admin/subject");
            }
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                toast.error(error.response.data.error);
                // alert(error.response.data.error)
            }
        })

    }
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/subject`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Add Subject</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="sub_name">Subject Name</label>
                    <input onChange={handleChange} type="text" id='sub_name' name="subject_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="sCode">Subject Code</label>
                    <input onChange={handleChange} id='sCode' type="text" name="subject_code" placeholder='Enter class' />
                </div>
                <div className='input-container'>

                    <label htmlFor="cid">Class</label>
                    <ClassInput handleChange={handleChange} />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddSubject