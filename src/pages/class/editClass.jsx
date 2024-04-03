import React, { useEffect, useState } from 'react'
import "./class.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { getClassById } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
import MultipleSubject from '../../components/MultipleSubject';
const EditClass = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [classData, setClassData] = useState();
    const [selectedOptions  , setSelectedOptions] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClassData(prev => ({ ...prev, [name]: value }));
        console.log(classData)
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log(classData)
        // alert("Form can be submitted")

        axios.patch("http://localhost:8080/api/class/edit", classData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Class edited successfully");
            navigate("/admin/class");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    useEffect(() => {
        const getData = async () => {
            const result = await getClassById(id)
            console.log("result", result)
            const filteredData = {
                class_name: result[0].class_name,
                desc: result[0].desc,
                academic_year: result[0].academic_year,
                subjects : result[0].subjects,
                class_id: result[0].class_id
            }
            setSelectedOptions(result[0].subjects)
            setClassData(filteredData);
        }
        getData();
    }, [])
    const handleChangeSubject = (selectedOptions) =>{
        setSelectedOptions(selectedOptions);
        console.log(selectedOptions)
        setClassData(prev => ({ ...prev, subjects: selectedOptions }));
    }
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/class`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Class</h1>
            </div>
            <form onSubmit={handleUpdate} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="class_name">Class Name</label>
                    <input value={classData?.class_name} onChange={handleChange} type="text" name="class_name" placeholder='Enter class name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="desc">Description</label>
                    <input value={classData?.desc} onChange={handleChange} type="text" name="desc" placeholder='Enter description' />
                </div>
                <div className='input-container'>

                    <label htmlFor="academic_year">Academic Year</label>
                    <input value={classData?.academic_year} onChange={handleChange} type="text" name="academic_year" placeholder='Enter academic year' />
                </div>
                <div className='input-container'>
                    <label htmlFor="subjects">Subjects subjects</label>
                    {/* <Select
                        options={ options}
                        className={'selectBox react-select'}
                        value={selectedOptions }
                        isMulti={true}
                        onChange={handleChangeSubject}
                        styles={{backgroundColor : "black"}}
                    /> */}
                    <MultipleSubject selectedOptions={selectedOptions} handleChangeSubject={handleChangeSubject} />

                    {/* <input onChange={handleChange} type="text" name="academic_year" placeholder='Enter academic year' /> */}
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditClass