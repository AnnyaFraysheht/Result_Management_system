import React, { useEffect, useState } from 'react'
import "./section.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getClass } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
const AddSection = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [sectionData, setSectionData] = useState({
        section_name: '',
        class_id: '',
        section_capacity: '',
        schedule: ''

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(sectionData)
        // alert("Form can be submitted")

        const response = axios.post("http://localhost:8080/api/section", sectionData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Section Added successfully")
            navigate("/admin/section");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    const getClassData = async () => {
        const data = await getClass();
        setClasses(data)

    }
    useEffect(() => {
        getClassData();
    }, [])
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/section`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Add Section</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="sec_name">Section Name</label>
                    <input id='sec_name' onChange={handleChange} type="text" name="section_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Section capacity</label>
                    <input onChange={handleChange} type="number" name='section_capacity' id="_class" placeholder='Enter class' />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <select onChange={handleChange} name="class_id" id="_class">
                        <option value="">Choose Your class</option>
                        {
                            classes?.map((_class) => {
                                return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
                            })
                        }
                    </select>
                </div>
                <div className='input-container'>

                    <label htmlFor="sch">Section Schedule</label>
                    <input onChange={handleChange} type="text" name='schedule' id="sch" placeholder='Enter class' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default AddSection