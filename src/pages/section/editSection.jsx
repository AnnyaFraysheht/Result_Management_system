import React, { useEffect, useState } from 'react'
import "./section.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getClass, getSectionByID } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
import ClassInput from '../../components/ClassInput';
const EditSection = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [sectionData, setSectionData] = useState({
        section_name: '',
        class_id: '',
        section_capacity: '',
        schedule: '',
        id: ''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData(prev => ({ ...prev, [name]: value }));
        console.log(sectionData)
        // console.log(studentData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(sectionData)
        // alert("Form can be submitted")

        axios.patch("http://localhost:8080/api/section/edit", sectionData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Section Edited successfully")
            navigate("/admin/section");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    useEffect(() => {
        const getData = async () => {
            const result = await getSectionByID(id);
            console.log(result)
            setSectionData(result[0]);
            // setClasses(data)
        }
        getData();
    }, [])
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/section`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Section</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="sec_name">Section Name</label>
                    <input id='sec_name' value={sectionData.section_name} onChange={handleChange} type="text" name="section_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Section capacity</label>
                    <input value={sectionData.section_capacity} onChange={handleChange} type="number" name='section_capacity' id="_class" placeholder='Enter class' />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <ClassInput value={sectionData.class_id} onChange={handleChange} />

                </div>
                <div className='input-container'>

                    <label htmlFor="sch">Section Schedule</label>
                    <input value={sectionData.schedule} onChange={handleChange} type="text" name='schedule' id="sch" placeholder='Enter class' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditSection