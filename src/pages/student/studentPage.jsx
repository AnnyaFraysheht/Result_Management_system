import "./student.css"
import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from "react-router-dom"
import { getStudents } from "../../services/fetchFunction"
import axios from "axios"
const StudentPage = () => {
  const [students, setStudents] = useState();
  const getData = async () => {
    const data = await getStudents();
    setStudents(data)
  }
  useEffect(() => {
    getData();
  }, [])
  const handleDelete = useCallback( async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`,{
        withCredentials: true,
      });
      getData();
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <>
      <h2>Students</h2>
      <button className="add"><Link to={"add"}>Add Student</Link> </button>
      <table border={"2px"}>
        <thead>
          <tr>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Class</th>
            <th>Section</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            students?.map((student) => {
              return <tr key={student.student_id}>
                <td>{student.fname}</td>
                <td>{student.mname}</td>
                <td>{student.lname}</td>
                <td>{student.class_name}</td>
                <td>{student.section_name}</td>
                <td><button><FaEdit size={20} color="green" /></button></td>
                <td><button onClick={(e)=> handleDelete(student.user_id)}><MdDelete  size={20} color="red" /></button></td>
              </tr>
            })
          }

        </tbody>
      </table>
    </>
  )
}

export default StudentPage