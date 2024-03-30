import React, {  useState } from 'react'
import "./teacher.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import SubjectInput from '../../components/SubjectInput';
import { toast } from 'react-toastify';
const AddTeacher = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({
        email: '',
        primary_contact: '',
        secondary_contact: ''

    });
    const [teacherData, setTeacherData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        gender: '',
        primary_contact: '',
        secondary_contact: '',
        temporary_address: '',
        permanent_address: '',
        subject_id : '',
        role: 'teacher'

    });
    const regexPatterns = {

        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        primary_contact: /^\d{10}$/,
        secondary_contact: /^\d{10}$/,

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
            // alert("Fill form correctly")
            toast.warning("Fill form correctly");
        } else {
            console.log(teacherData)
            // alert("Form can be submitted")

            axios.post("http://localhost:8080/api/register", teacherData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                toast.success("Teacher Added Successfully")
                navigate("/admin/teachers");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    // alert(error.response.data.error)
                    toast.error(error.response.data.error)
                }
            })
        }
    }
   

    return (
        <div>
             <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/teachers`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Add Teacher</h1>
            </div>
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
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <input required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                    <input required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                    <input required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input required onChange={handleChange} type="number" name="primary_contact" placeholder='Enter primary contact' />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="number" name="secondary_contact" placeholder='Enter secondary contact' />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input required onChange={handleChange} type="text" name="temporary_address" placeholder='Enter your Permanent Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input required onChange={handleChange} type="text" name="permanent_address" placeholder='Enter your secondary address' />
                </div>
                
                
                <div className='input-container'>

                    <label htmlFor="subject">Subjects</label>
                    <SubjectInput handleChange={handleChange} />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddTeacher