import "./student.css"
import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from "react-router-dom"
import { deleteUser, getStudents } from "../../services/fetchFunction"
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
      deleteUser(id);
      getData();
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <>
      <h2>Students</h2>
      <button className="add"><Link className="link" to={"add"}>Add Student</Link> </button>
      <table border={"2px"}>
        <thead>
          <tr>
            <td>Image</td>
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
                <td><img src={""} alt="profile" /></td>
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