import React, { useEffect, useState } from 'react'
import "./teacher.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
const AddTeacher = () => {
    const navigate = useNavigate();
    // const [subjects, setSubjects] = useState()
    const [validationError, setValidationError] = useState({
        email: '',
        primaryContact: '',
        secondaryContact: ''

    });
    const [teacherData, setTeacherData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        primaryContact: '',
        secondaryContact: '',
        temp_address: '',
        perm_address: '',
        subject : '',
        role: 'teacher'

    });
    const regexPatterns = {

        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        primaryContact: /^\d{10}$/,
        secondaryContact: /^\d{10}$/,

    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const regexPattern = regexPatterns[name];
        const ifValid = value === '' || (regexPattern ? regexPattern.test(value) : true);
        setTeacherData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
        setValidationError((prev) => ({ ...prev, [name]: ifValid ? '' : `Invalid ` }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(validationError).some((error) => error);
        if (hasErrors) {
            alert("Fill form correctly")
        } else {
            console.log(teacherData)
            // alert("Form can be submitted")

            axios.post("http://localhost:8080/api/register", teacherData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                navigate("/admin/teachers");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    alert(error.response.data.error)
                }
            })
        }
    }
    // const getSubjects = async () => {
    //     const subjectData = await getClass();
    //     setSubjects(subjectData)
    // }
    
    // useEffect(() => {
    //     getSubjects();
    // }, [])

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Adding Teacher</h1>
            <h1><Link className='link' to={"/admin/teachers"}> <IoMdArrowRoundBack /></Link></h1>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} type="text" name="fname" placeholder='Enter first name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input onChange={handleChange} type="text" name="mname" placeholder='Enter middle name' />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} type="text" name="lname" placeholder='Enter last name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' />
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input required onChange={handleChange} type="text" name="primaryContact" placeholder='Enter primary contact' />
                    {validationError.primaryContact && (<span>{validationError.primaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="text" name="secondaryContact" placeholder='Enter secondary contact' />
                    {validationError.secondaryContact && (<span>{validationError.secondaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temp_address">Temporary Address</label>
                    <input required onChange={handleChange} type="text" name="temp_address" placeholder='Enter your Permanent Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="perm_address">Permanent Address</label>
                    <input required onChange={handleChange} type="text" name="perm_address" placeholder='Enter your secondary address' />
                </div>
                
                
                <div className='input-container'>

                    <label htmlFor="subject">Subjects</label>
                    <select required className='selectBox' onChange={handleChange} name="subject" id="">
                        <option value="">Select subject</option>
                        <option value="operating system">Operating System</option>
                        <option value="scripting language">scripting language</option>
                        <option value="nm">nm</option>
                        <option value="dbms">dbms</option>
                        <option value="se">se</option>
                    </select>
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddTeacher