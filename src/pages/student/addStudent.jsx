import React, { useEffect, useState } from 'react'
import "./student.css"
import { getClass, getSectionByClass } from '../../services/fetchFunction';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
const AddStudent = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [section, setSection] = useState();
    const [validationError, setValidationError] = useState({
        email: '',
        primaryContact: '',
        secondaryContact: ''

    });
    const [studentData, setStudentData] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        dob: '',
        primaryContact: '',
        secondaryContact: '',
        temp_address: '',
        perm_address: '',
        class_id: '',
        section_id: '',
        blood_group: '',
        nationality: '',
        role: 'student',
        gender: ''

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
        setStudentData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
        setValidationError((prev) => ({ ...prev, [name]: ifValid ? '' : `Invalid ` }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(validationError).some((error) => error);
        if (hasErrors) {
            alert("Fill form correctly")
        } else {
            console.log(studentData)
            // alert("Form can be submitted")

            axios.post("http://localhost:8080/api/register", studentData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                navigate("/admin/students");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response)
                    alert(error.response.data.error)
                }
            })
        }
    }
    const getClassData = async () => {
        const classData = await getClass();
        setClasses(classData)
    }
    const getSectionData = async (class_id) => {
        if (class_id) {

            const sectionData = await getSectionByClass(class_id);
            setSection(sectionData)
        }
    }
    useEffect(() => {
        getClassData();
    }, [])
    useEffect(() => {
        getSectionData(studentData.class_id);
    }, [studentData.class_id])


    return (
        <div className='main_container'>
            <h1 style={{ textAlign: 'center' }}>Adding Student</h1>

            <h1><Link className='link' to={"/admin/students"}> <IoMdArrowRoundBack /></Link></h1>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} type="text" id='fname' name="fname" required />
                </div>
                <div className='input-container'>

                    <label htmlFor="mname">Middle Name</label>
                    <input onChange={handleChange} id='mname' type="text" name="mname" />
                </div>
                <div className='input-container'>

                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} id='lname' type="text" name="lname" required />
                </div>
                <div className='input-container'>

                    <label htmlFor="email">Email</label>
                    <input required onChange={handleChange} id='email' type="text" name="email" />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input required onChange={handleChange} id='dob' type="date" name="dob" />
                </div>
                <div className='input-container'>
                    <label htmlFor="contacts">Contact One</label>
                    <input required onChange={handleChange} id='contacts' type="text" name="primaryContact" />
                    {validationError.primaryContact && (<span>{validationError.primaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="text" name="secondaryContact" />
                    {validationError.secondaryContact && (<span>{validationError.secondaryContact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temp_address">Temporary Address</label>
                    <input required onChange={handleChange} id='temp_address' type="text" name="temp_address" />
                </div>
                <div className='input-container'>

                    <label htmlFor="perm_address">Permanent Address</label>
                    <input required onChange={handleChange} id='perm_address' type="text" name="perm_address" />
                </div>
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <input required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                    <input required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                    <input required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                </div>
                <div className='input-container'>

                    <label htmlFor="class_id">Class</label>
                    <select required className='selectBox' onChange={handleChange} name="class_id" id="">
                        <option value="">Select Class</option>
                        {
                            classes?.map((_class) => {
                                return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>

                    <label htmlFor="section_id">Section</label>
                    <select required className='selectBox' onChange={handleChange} name="section_id" id="">
                        <option value="">Select Section</option>
                        {
                            section?.map((sec) => {
                                return <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>

                    <label htmlFor="blood_group">Blood Group</label>
                    <select required className='selectBox' onChange={handleChange} name="blood_group" id="">
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
                <div className='input-container'>

                    <label htmlFor="nationality">Nationaligy</label>
                    <select required className='selectBox' onChange={handleChange} name="nationality" id="">
                        <option value="">Select Nationality</option>
                        <option value="nepali">Nepali</option>
                        <option value="indian">Indian</option>
                        <option value="american">American</option>
                        <option value="australian">Australian</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddStudent