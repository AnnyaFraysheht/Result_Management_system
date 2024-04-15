import React, { useEffect, useState } from 'react'
import "./teacher.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getSubjects, getTeacherById } from '../../services/fetchFunction';
import SubjectInput from '../../components/SubjectInput';
import { toast } from 'react-toastify';
import MultipleSubject from '../../components/MultipleSubject';
const EditTeacher = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedOptions, setSelectedOptions] = useState()
    const [validationError, setValidationError] = useState({
        email: '',
        primary_contact: '',
        secondary_contact: ''

    });
    const [teacherData, setTeacherData] = useState();
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
    const handleChangeSubject = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
        console.log(selectedOptions)
        setTeacherData(prev => ({ ...prev, subjects: selectedOptions }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(validationError).some((error) => error);
        if (hasErrors) {
            // alert("Fill form correctly")
            toast.warn("Fill form correctly")
        } else {
            console.log(teacherData)
            // alert("Form can be submitted")

            axios.patch("http://localhost:8080/api/update/", teacherData, {
                withCredentials: true,
            }).then(response => {
                console.log(response.data)
                toast.success("Teacher edited Successfully")
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
    useEffect(() => {
        const getData = async () => {
            const result = await getTeacherById(id);
            console.log("result", result)
            const filteredData = {
                fname: result[0].fname,
                mname: result[0].mname,
                lname: result[0].lname,
                dob: result[0].dob,
                gender: result[0].gender,
                primary_contact: result[0].primary_contact,
                secondary_contact: result[0].secondary_contact,
                temporary_address: result[0].temporary_address,
                permanent_address: result[0].permanent_address,
                email: result[0].email,
                subjects: result[0].subjects,
                role: 'teacher',
                teacher_id: id,
                user_id: result[0].user_id

            }
            setSelectedOptions(result[0].subjects)
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
                    <input disabled value={teacherData?.email} required onChange={handleChange} type="text" name="email" placeholder='Enter your email' />
                    {validationError.email && (<span>{validationError.email}</span>)}
                </div>
                <div className='input-container'>

                    <label htmlFor="dob">Dob</label>
                    <input value={teacherData?.dob} required onChange={handleChange} type="date" name="dob" placeholder='Enter your dob' />
                </div>
                <div className='input-container gender'>

                    <label htmlFor="gender">Gender</label>
                    <div className="genderinput">

                        <input checked={teacherData?.gender === "M"} required onChange={handleChange} type="radio" name="gender" value={"M"} />Male
                        <input checked={teacherData?.gender === "F"} required onChange={handleChange} type="radio" name="gender" value={"F"} />Female
                        <input checked={teacherData?.gender === "O"} required onChange={handleChange} type="radio" name="gender" value={"O"} />Other
                    </div>
                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact One</label>
                    <input value={teacherData?.primary_contact} required onChange={handleChange} type="number" name="primary_contact" placeholder='Enter primary contact' />
                    {validationError.primary_contact && (<span>{validationError.primary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="contacts">Contact Two</label>
                    <input value={teacherData?.secondary_contact} required onChange={handleChange} type="number" name="secondary_contact" placeholder='Enter secondary contact' />
                    {validationError.secondary_contact && (<span>{validationError.secondary_contact}</span>)}

                </div>
                <div className='input-container'>

                    <label htmlFor="temporary_address">Temporary Address</label>
                    <input value={teacherData?.temporary_address} required onChange={handleChange} type="text" name="temporary_address" placeholder='Enter your Permanent Address' />
                </div>
                <div className='input-container'>

                    <label htmlFor="permanent_address">Permanent Address</label>
                    <input value={teacherData?.permanent_address} required onChange={handleChange} type="text" name="permanent_address" placeholder='Enter your secondary address' />
                </div>


                <div className='input-container'>

                    <label htmlFor="subject">Subjects</label>
                    {/* <SubjectInput value={teacherData?.subject_id} handleChange={handleChange} /> */}
                    <MultipleSubject handleChangeSubject={handleChangeSubject} selectedOptions={selectedOptions} />


                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditTeacher