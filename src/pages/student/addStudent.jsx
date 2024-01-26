import React, { useEffect, useState } from 'react'
import "./student.css"
import { getClass, getSectionByClass } from '../../services/fetchFunction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        role: 'student'

    });
    const regexPatterns = {

        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        primaryContact: /^\d{10}$/,
        secondaryContact: /^\d{10}$/,

    };
    const handleChange = (e) => {
            const {name, value} = e.target;
            const regexPattern = regexPatterns[name];
            const ifValid = value === '' || (regexPattern ? regexPattern.test(value) : true);
            setStudentData(prev => ({ ...prev, [name]: value}));
            // console.log(studentData)
            setValidationError((prev) => ({...prev, [name]: ifValid ? '' : `Invalid `}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(validationError).some((error) => error);
        if(hasErrors){
            alert("Fill form correctly")
        }else{
            console.log(studentData)
            // alert("Form can be submitted")
            try {
                const response = axios.post("http://localhost:8080/api/register",studentData,{
                    withCredentials: true,
                })
                if(response.stutus === 200){
                    // console.log("Form Submitted");
                    navigate("/admin/students")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const getClassData = async() =>{
        const classData = await getClass();
        setClasses(classData)
    }
    const getSectionData = async(class_id) =>{
        const sectionData = await getSectionByClass(class_id);
        setSection(sectionData)
    }
    useEffect(()=>{
        getClassData();
    },[])
    useEffect(()=>{
        getSectionData(studentData.class_id);
    },[studentData.class_id])

   
    return (
        <div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div>

                    <label htmlFor="fname">First Name</label>
                    <input onChange={handleChange} type="text" name="fname" placeholder='Enter first name' required />
                </div>
                <div>

                    <label htmlFor="mname">Middle Name</label>
                    <input onChange={handleChange} type="text" name="mname" placeholder='Enter middle name' />
                </div>
                <div>

                    <label htmlFor="lname">Last Name</label>
                    <input onChange={handleChange} type="text" name="lname" placeholder='Enter last name' required />
                </div>
                <div>

                    <label htmlFor="email">Email</label>
                    <input required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div>

                    <label htmlFor="fname">Dob</label>
                    <input required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' />
                </div>
                <div>

                    <label htmlFor="contacts">Contact One</label>
                    <input required onChange={handleChange} type="text" name="primaryContact" placeholder='Enter primary contact' />
                    {validationError.primaryContact && (<span>{validationError.primaryContact}</span>)}

                </div>
                <div>

                    <label htmlFor="contacts">Contact Two</label>
                    <input required onChange={handleChange} type="text" name="secondaryContact" placeholder='Enter secondary contact' />
                    {validationError.secondaryContact && (<span>{validationError.secondaryContact}</span>)}

                </div>
                <div>

                    <label htmlFor="temp_address">Temporary Address</label>
                    <input required onChange={handleChange} type="text" name="temp_address" placeholder='Enter your Permanent Address' />
                </div>
                <div>

                    <label htmlFor="perm_address">Permanent Address</label>
                    <input required onChange={handleChange} type="text" name="perm_address" placeholder='Enter your secondary address' />
                </div>
                <div>

                    <label htmlFor="class_id">Class</label>
                    <select required className='selectBox' onChange={handleChange} name="class_id" id="">
                        <option value="">Select Class</option>
                        {
                            classes?.map((_class)=>{
                                return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                            })
                        }
                    </select>
                </div>
                <div>

                    <label htmlFor="section_id">Section</label>
                    <select required className='selectBox' onChange={handleChange} name="section_id" id="">
                        <option value="">Select Section</option>
                        {
                            section?.map((sec)=>{
                                return <option key={sec.section_id} value={sec.section_id}>{sec.section_name}</option>
                            })
                        }
                    </select>
                </div>
                <div>

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
                <div>

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