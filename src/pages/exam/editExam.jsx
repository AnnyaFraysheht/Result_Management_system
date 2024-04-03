import React, { useEffect, useState } from 'react'
import "./exam.css"
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io'
import ClassInput from '../../components/ClassInput';
import SubjectInput from '../../components/SubjectInput';
import { getExamById } from '../../services/fetchFunction';
import { toast } from 'react-toastify';
const EditExam = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [examData, setExamData] = useState({
        exam_name: '',
        class_id: '',
        subject_id: '',
        exam_date: '',
        term: '',
        exam_id : id,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExamData(prev => ({ ...prev, [name]: value }));
        // console.log(studentData)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(examData)
        axios.patch("http://localhost:8080/api/exam/edit", examData, {
            withCredentials: true,
        }).then(response => {
            console.log(response.data)
            toast.success("Exam successfully Updated");
            navigate("/admin/exam");
        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                alert(error.response.data.error)
            }
        })

    }
    useEffect(() => {
        const getData = async () => {
            const result = await getExamById(id);
            console.log("result", result)
            const filteredData = {
                exam_name: result[0].exam_name,
                class_id: result[0].class_id,
                subject_id: result[0].subject_id,
                exam_date: result[0].exam_date,
                term: result[0].term,
                exam_id : id,
            }
            setExamData(filteredData)
        };
        getData();
    }, [])
    return (
        <div>
            <div className='backmenu'>
                <h1 className='back'>

                    <Link className='link' to={`/admin/exam`}> <IoMdArrowRoundBack /></Link>
                </h1>

                <h1 style={{ textAlign: 'center' }}>Edit Subject</h1>
            </div>
            <form onSubmit={handleSubmit} className='student_form' action="">
                <div className='input-container'>

                    <label htmlFor="exam_nm">Exam Name</label>
                    <input value={examData.exam_name} id='exam_nm' onChange={handleChange} type="text" name="exam_name" placeholder='Enter exam name' required />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Class</label>
                    <ClassInput value={examData.class_id} handleChange={handleChange} />
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Term</label>
                    <select value={examData.term} onChange={handleChange} name="term" id="">
                        <option value="">Select Term</option>
                        <option value="1">1st Term</option>
                        <option value="2">Mid Term</option>
                        <option value="3">Final Term</option>
                    </select>
                </div>
                <div className='input-container'>

                    <label htmlFor="_class">Exam Subject </label>
                    <SubjectInput class_id={examData?.class_id} value={examData.subject_id} handleChange={handleChange} />
                </div>
                <div className='input-container'>

                    <label htmlFor="sch">Exam Date</label>
                    <input value={examData.exam_date} onChange={handleChange} type="date" name='exam_date' id="sch" placeholder='Enter Exam Date' />
                </div>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}

export default EditExam