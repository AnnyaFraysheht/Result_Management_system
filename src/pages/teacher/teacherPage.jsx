import React, { useCallback, useEffect, useState } from 'react'
import "./teacher.css"
import oip from "../../assets/OIP.jpeg"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteUser, getTeachers } from '../../services/fetchFunction'
import { Link } from 'react-router-dom'
const TeacherPage = () => {
  const [teachers, setTeacher] = useState();
  const getData = async () => {
    const data = await getTeachers();
    setTeacher(data)
  }
  useEffect(() => {
    getData();
    // console.log(teachers)
  }, [])
  const handleDelete = useCallback(async (id) => {
    if (window.confirm("Are you sure to Delete?")) {
      try {
        await deleteUser(id)
        getData();
      } catch (error) {
        console.log(error)
      }
    }
  }, []);
  return (
    <>
      <h2>Teacher</h2>
      <button className="add"><Link className="link" to={"add"}>Add Teacher</Link> </button>
      <table border={"2px"}>
        <thead>
          <tr>
            <th></th>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Subject</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers?.map((teacher) => {
              return <tr key={teacher.teacher_id}>
                <td><img src={teacher.image ? `http://localhost:8080/api/images/${teacher.image}` : oip} height={30} width={30} alt="profile" /></td>
                <td>{teacher.fname}</td>
                <td>{teacher.mname}</td>
                <td>{teacher.lname}</td>
                <td>{teacher.subject}</td>
                <td className='action'><button><FaEdit size={20} color="green" /></button></td>
                <td className='action'><button onClick={(e) => handleDelete(teacher.user_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default TeacherPage