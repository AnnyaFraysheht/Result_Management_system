import React, {  useEffect, useState } from 'react'
import "../exam.css"
import { getExamForTeacher } from '../../../services/fetchFunction';
const TeacherExamPage = () => {
    const [exams, setExams] = useState([]);


    

    const getExamData = async () => {
        const data = await getExamForTeacher();
        // console.log(data)
        setExams(data)
    }
    useEffect(() => {
        getExamData();
    }, [])
    return (
        <>
            <h2>Exams</h2>

            <table>
                <thead>
                    <tr>
                        <th>Exam Name</th>
                        <th>Class </th>
                        <th>Subject</th>
                        <th>Date</th>
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
                                </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TeacherExamPage