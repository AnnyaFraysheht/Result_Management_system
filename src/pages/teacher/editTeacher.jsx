import React, { useEffect, useState } from 'react'
import "./teacher.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getSubjects, getTeacherById } from '../../services/fetchFunction';
import SubjectInput from '../../components/SubjectInput';
const EditTeacher = () => {
    const navigate = useNavigate();
    const { id } = useParams();
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
        subject_id: '',
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
        console.log(teacherData)
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

            axios.patch("http://localhost:8080/api/update/", teacherData, {
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
    useEffect(() => {
    const getData = async () => {
        const result = await getTeacherById(id);
        console.log(result)
        const filteredData = {
            fname: result[0].fname,
            mname: result[0].mname,
            lname: result[0].lname,
            email: result[0].email,
            dob: result[0].dob,
            primaryContact: result[0].primarycontact,
            secondaryContact: result[0].secondarycontact,
            temp_address: result[0].temp_address,
            perm_address: result[0].perm_address,
            subject_id: result[0].subject_id,
            role: 'teacher'
    
        }
        setTeacherData(filteredData);
        // setSubjects(data)
    }
        getData();
    }, [])

    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/teachers`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Teacher</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input value={teacherData?.fname} onChange={handleChange} type="text" name="fname" placeholder='Enter first name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input value={teacherData?.mname} onChange={handleChange} type="text" name="mname" placeholder='Enter middle name' />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input value={teacherData?.lname} onChange={handleChange} type="text" name="lname" placeholder='Enter last name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input value={teacherData?.email} required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input value={teacherData?.dob} required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' />
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input value={teacherData?.primaryContact} required onChange={handleChange} type="number" name="primaryContact" placeholder='Enter primary contact' />
                    {validationError.primaryContact && (<span>{validationError.primaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input value={teacherData?.secondaryContact} required onChange={handleChange} type="number" name="secondaryContact" placeholder='Enter secondary contact' />
                    {validationError.secondaryContact && (<span>{validationError.secondaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temp_address">Temporary Address</label>
                    <input value={teacherData?.temp_address} required onChange={handleChange} type="text" name="temp_address" placeholder='Enter your Permanent Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="perm_address">Permanent Address</label>
                    <input value={teacherData?.perm_address} required onChange={handleChange} type="text" name="perm_address" placeholder='Enter your secondary address' />
                </div>


                <div className='input-container'>

                    <label htmlFor="subject">Subjects</label>
                    <SubjectInput value={teacherData?.subject_id} handleChange={handleChange} />

                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditTeacher