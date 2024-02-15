import React, {  useState } from 'react'
import "./admin.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
const AddAdmin = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({
        email: '',
        primaryContact: '',
        secondaryContact: ''

    });
    const [adminData, setAdminData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        primaryContact: '',
        secondaryContact: '',
        temp_address: '',
        perm_address: '',
        role: 'admin'

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
        setAdminData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
        setValidationError((prev) => ({ ...prev, [name]: ifValid ? '' : `Invalid ` }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(validationError).some((error) => error);
        if (hasErrors) {
            alert("Fill form correctly")
        } else {
            console.log(adminData)
            // alert("Form can be submitted")

            axios.post("http://localhost:8080/api/register", adminData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                navigate("/admin/admins");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    alert(error.response.data.error)
                }
            })
        }
    }


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Adding Teacher</h1>
            <h1><Link className='link' to={"/admin/admins"}> <IoMdArrowRoundBack /></Link></h1>
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
                    <input required onChange={handleChange} type="number" name="primaryContact" placeholder='Enter primary contact' />
                    {validationError.primaryContact && (<span>{validationError.primaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="number" name="secondaryContact" placeholder='Enter secondary contact' />
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



                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddAdmin