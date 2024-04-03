import React, { useEffect, useState } from 'react'
import "./class.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { toast } from 'react-toastify';
import SubjectInput from '../../components/SubjectInput';
import { getSubjects } from '../../services/fetchFunction';
import Select from 'react-select';
import MultipleSubject from '../../components/MultipleSubject';
const AddClass = () => {
    const navigate = useNavigate();
    
    const [selectedOptions  , setSelectedOptions] = useState([])
    const [classData, setClassData] = useState({
        class_name: '',
        desc: '',
        academic_year: '',
        subjects: [selectedOptions]

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
        console.log("classData", classData)
    }
    const handleChangeSubject = (selectedOptions) =>{
        setSelectedOptions(selectedOptions);
        console.log(selectedOptions)
        setClassData(prev => ({ ...prev, subjects: selectedOptions }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(classData)
        // alert("Form can be submitted")

        axios.post("http://localhost:8080/api/class", classData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Class created successfully");
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
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/class`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Add Class</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="class_name">Class Name</label>
                    <input onChange={handleChange} type="text" name="class_name" placeholder='Enter class name' required />
                </div>

                <div className='input-container'>

                    <label htmlFor="_class">Description</label>
                    <input onChange={handleChange} type="text" name="desc" placeholder='Enter description' />
                </div>

                <div className='input-container'>

                    <label htmlFor="academic_year">Academic Year</label>
                    <input onChange={handleChange} type="text" name="academic_year" placeholder='Enter academic year' />
                </div>

                <div className='input-container'>
                    <label htmlFor="subjects">Subjects subjects</label>
                    {/* <Select
                        options={ options}
                        className={'selectBox react-select'}
                        value={selectedOptions }
                        isMulti={true}
                        onChange={handleChangeSubject}
                        styles={{backgroundColor : "black"}}
                    /> */}
                    <MultipleSubject selectedOptions={selectedOptions} handleChangeSubject={handleChangeSubject} />
                    {/* <input onChange={handleChange} type="text" name="academic_year" placeholder='Enter academic year' /> */}
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddClass