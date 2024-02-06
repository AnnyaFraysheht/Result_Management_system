import React, { useCallback, useEffect, useState } from 'react'
import "./exam.css"
import { deleteExams, deleteSection, getExams } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
const ExamPage = () => {
    const [exams, setExams] = useState([]);


    const handleDelete = useCallback(async (id) => {
        try {
            await deleteExams(id)
            getExamData();
        } catch (error) {
            console.log(error)
        }
    }, []);

    const getExamData = async () => {
        const data = await getExams();
        // console.log(data)
        setExams(data)
    }
    useEffect(() => {
        getExamData();
    }, [])
    return (
        <>
            <h2>Exams</h2>
            <button className="add"><Link className="link" to={"add"}>Create Exam</Link> </button>

            <table>
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Class </th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exams?.map((exam, index) => {
                            return <tr key={exam.exam_id} className={index % 2 == 0 ? "even" : "odd"}>
                                <td>{exam.exam_name}</td>
                                <td>{exam.class_name}</td>
                                <td>{exam.subject_name}</td>
                                <td>{exam.exam_date}</td>
                                <td className='action'><button><FaEdit size={20} color="green" /></button></td>
                                <td className='action'><button onClick={(e) => handleDelete(exam.exam_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExamPage