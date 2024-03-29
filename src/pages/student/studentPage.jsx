import "./student.css"
import oiep from "../../assets/OIP.jpeg"
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
  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id);
        getData();
      } catch (error) {
        console.log(error)
      }
    }
  }, []);
  return (
    <>
      <div className='heading_edit'>
        <h2>Students</h2>
        <Link className="link" to={"add"}><button className="add">Add Student</button></Link>
      </div>
      
      <table>
        <thead>
          <tr>
            <th></th>
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
            students?.map((student, index) => {
              return <tr className={index % 2 == 0 ? "even" : "odd"} key={student.student_id}>
                <td><img src={student.image ? `http://localhost:8080/api/images/${student.image}` : oiep} height={50} width={50} alt="profile" /></td>
                <td>{student.fname}</td>
                <td>{student.mname}</td>
                <td>{student.lname}</td>
                <td>{student.class_name}</td>
                <td>{student.section_name}</td>
                <td className="action"><Link to={`edit/${student.student_id}`}><FaEdit size={20} color="green" /></Link></td>
                <td className="action"><button onClick={(e) => handleDelete(student.user_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }

        </tbody>
      </table>
    </>
  )
}

export default StudentPage