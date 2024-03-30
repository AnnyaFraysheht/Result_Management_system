import React, {  useEffect, useState } from 'react'
import "./admin.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { toast } from 'react-toastify';
import { getAdminById } from '../../services/fetchFunction';
const EditAdmin = () => {
    const navigate = useNavigate();
    const [validationError, setValidationError] = useState({
        email: '',
        primary_contact: '',
        secondary_contact: ''

    });
    const {id} = useParams();
    const [adminData, setAdminData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        gender:'',
        primary_contact: '',
        secondary_contact: '',
        temporary_address: '',
        permanent_address: '',
        role: 'admin'

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

            axios.patch("http://localhost:8080/api/update", adminData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                toast.success("Admin edited successfully")
                navigate("/admin/admins");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    toast.error(error.response.data.error)
                    // alert(error.response.data.error)
                }
            })
        }
    }
    useEffect(()=>{
        const getData = async () =>{
            const result = await getAdminById(id);
            console.log(result);
            setAdminData(result[0]);
        }
        getData();
    },[])

    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/admins`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Admin</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input value={adminData?.fname} onChange={handleChange} type="text" name="fname" placeholder='Enter first name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input value={adminData?.mname} onChange={handleChange} type="text" name="mname" placeholder='Enter middle name' />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input value={adminData?.lname} onChange={handleChange} type="text" name="lname" placeholder='Enter last name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input disabled value={adminData?.email} required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input value={adminData?.dob} required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' />
                </div>
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <input checked={adminData?.gender === 'M'} required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                    <input checked={adminData?.gender === 'F'} required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                    <input checked={adminData?.gender === 'O'} required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input value={adminData?.primary_contact} required onChange={handleChange} type="number" name="primary_contact" placeholder='Enter primary contact' />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input value={adminData?.secondary_contact} required onChange={handleChange} type="number" name="secondary_contact" placeholder='Enter secondary contact' />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input value={adminData?.temporary_address} required onChange={handleChange} type="text" name="temporary_address" placeholder='Enter your Permanent Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input value={adminData?.permanent_address} required onChange={handleChange} type="text" name="permanent_address" placeholder='Enter your secondary address' />
                </div>



                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditAdmin