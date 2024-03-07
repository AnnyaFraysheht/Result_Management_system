import axios from 'axios'
import React, { useState } from 'react'
import  "./result.css"
const ResultPage = () => {
    const [term , setTerm] = useState();
    const [result, setResult] = useState();
    const getResult = async () =>{
        const response = await axios.get(`http://localhost:8080/api/result/${term}`,{
            withCredentials: true,
        })
        console.log(response);
        setResult(response.data.data)
    }
  return (
    <div>
        <select onChange={(e) => setTerm(e.target.value)} name="term" id="">
            <option value="">Select Term</option>
            <option value="1">First Term</option>
            <option value="2">Mid Term</option>
            <option value="3">Final Term</option>
        </select>
        <button onClick={getResult}>Get Result</button>
        { result && 

            <div className="marksheet">
            <h2>College Name</h2>
            <h4>Address of the college or school</h4>
            <table>
                <thead>
                    <th>Subject</th>
                    <th>Mark Obtained</th>
                    <th>Grade</th>
                    <th></th>
                </thead>
                <tbody>
                {result?.map((item)=>{
                    return <tr>      
                    <td>{item.subject_name}</td>
                    <td>{item.marks_obtained}</td>
                    <td>{item.grade}</td>
                    <td></td>
                    </tr>
                })
            }
                </tbody>
            </table>
            gradesheet
            
        </div>
        }
    </div>
  )
}

export default ResultPage