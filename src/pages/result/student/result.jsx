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
    const getResult = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/result/${term}`, {
                withCredentials: true,
            })
            console.log(response.data.data);
            setResult(response.data.data.markData[0])
            setUser(response.data.data.userData)
            setStudent(response.data.data.studentData)
            // console.log(result)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const printResult = () => {
        window.print();
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
                                <td>{item.grade}</td>
                                <td>"--"</td>
                            </tr>
                        })
                        }
                        <tr>
                            <td colSpan={2}>Total</td>
                            <td>abc</td>
                            <td  >Average grade point</td>
                            <td>4.0</td>
                        </tr>
                        <tr>
                            <td colSpan={3}>Attendance : ...</td>
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