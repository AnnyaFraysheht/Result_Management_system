import axios from 'axios'
import React, { useState } from 'react'
import "./result.css"
import Spinner from '../../../components/loader/Spinner';
const ResultPage = () => {
    const [term, setTerm] = useState();
    const [result, setResult] = useState();
    const [student, setStudent] = useState();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0)
    const getResult = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/result/${term}`, {
                withCredentials: true,
            })
            // console.log(response.data.data);
            setResult(response.data.data.markData[0])
            setUser(response.data.data.userData)
            setStudent(response.data.data.studentData)
            // console.log(result)
            calculateTotal(response.data.data.markData[0]);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const calculateTotal = (marks) => {
        console.log(marks)
        const totalMarks = marks?.reduce((total, item) => total + item.marks_obtained, 0);
        setTotal(totalMarks);
        // totalMarks / marks.length
        console.log(total)
    }
    const printResult = () => {
        window.print();
    }
    const gradeToGPA = {
        "A": "4.0",
        "A-": 3.6,
        "B+": 3.2,
        "B": 2.8,
        "B-": 2.6,
        "C": 2.2,
        "F": "*",

    }

    return (
        <div>
            <div className='filterResult'>

                <select onChange={(e) => setTerm(e.target.value)} name="term" id="">
                    <option value="">Select Term</option>
                    <option value="1">First Term</option>
                    <option value="2">Mid Term</option>
                    <option value="3">Final Term</option>
                </select>
                <button onClick={getResult}>Get Result</button>
                <button onClick={printResult}>Print</button>
            </div>

            {result ? loading ? <Spinner /> : <div className="marksheet">
                <span><em>"Education for all"</em></span>
                <h2>College Name</h2>
                <h4>Address of the college or school</h4>
                <div className='term'>

                    <h2>{result[0]?.exam_name}</h2>
                </div>
                <div className='detail'>

                    <span>The marks is secured by: {user?.fname} {user?.mname} {user?.lname}</span>
                    <br />
                    <span>Class : {student?.class_name}</span>
                    &nbsp;
                    <span>Roll No : {student?.roll_no}</span>
                    <br />
                    <span>Date of Birth: {user?.dob}</span>
                </div>
                <table border={2}>
                    <thead>
                        <tr>

                            <th>S.N</th>
                            <th>Subject</th>
                            <th>Mark Obtained</th>
                            <th>Remarks</th>
                            <th>Grade</th>
                            <th>Grade Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result?.map((item, index) => {
                            return <tr key={item.mark_id}>
                                <td>{index + 1}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.marks_obtained}</td>
                                <td>{item.remarks}</td>
                                <td>{item.grade}</td>
                                <td>{gradeToGPA[item.grade]}</td>
                            </tr>
                        })
                        }
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>{total}</td>
                            <td colSpan={2} >Average grade point</td>
                            <td>{"4.0"}</td>
                        </tr>
                        <tr>
                            <td colSpan={3}></td>
                            <td colSpan={2}>Remarks: Good</td>
                        </tr>

                    </tbody>
                </table>
                <span><em><u>* This sheet is for the general idea of grade(s) you secured. This is not for official use. </u></em></span>

            </div> : ""
            }
        </div>
    )
}

export default ResultPage