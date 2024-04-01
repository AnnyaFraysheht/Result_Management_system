import React, { useEffect, useState } from 'react'
import "./subject.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import ClassInput from '../../components/ClassInput';
import { toast } from 'react-toastify';
import { getSubjectsById } from '../../services/fetchFunction';
const EditSubject = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [subjectData, setSubjectData] = useState({
        subject_name: '',
        subject_code: '',
        desc: '',
        subject_id: id,

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData(prev => ({ ...prev, [name]: value }));
        console.log(subjectData)
    }
    const handleEdit = (e) => {
        e.preventDefault();
        console.log(subjectData)
        const isEmptyField = Object.values(subjectData).some(value => typeof(value) === String && value.trim() === '');

        if (isEmptyField) {
            toast.warning('Please fill in all fields');
            return;
        }
        // alert("Form can be submitted")

        axios.patch("http://localhost:8080/api/subject/edit", subjectData, {
            withCredentials: true,
        }).then(response => {
            // console.log(response.data)
            if (response.status === 200) {
                toast.success("Subject Edited Successfully");
                navigate("/admin/subject");
            }
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    useEffect(() => {
        const getData = async () => {
            const result = await getSubjectsById(id);
            console.log("result", result[0])
            const filterData = {
                subject_name: result[0].subject_name,
                subject_code: result[0].subject_code,
                class_id: result[0].class_id,
                subject_id: result[0].subject_id,
            }
            setSubjectData(filterData)


        }
        getData();
    }, [])
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/subject`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Subject</h1>
            </div>
            <form onSubmit={handleEdit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="sub_name">Subject Name</label>
                    <input value={subjectData.subject_name} onChange={handleChange} type="text" id='sub_name' name="subject_name" placeholder='Enter subclassject name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="sCode">Subject Code</label>
                    <input value={subjectData.subject_code} onChange={handleChange} id='sCode' type="text" name="subject_code" placeholder='Enter subject code' />
                </div>
                <div className='input-container'>

                    <label htmlFor="cid">Class</label>
                    <input value={subjectData.desc} onChange={handleChange} id='desc' type="text" name="desc" placeholder='Enter description' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditSubject