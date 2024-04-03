import React, { useCallback, useEffect, useState } from 'react'
import "./teacher.css"
import oip from "../../assets/OIP.jpeg"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteUser, getTeachers } from '../../services/fetchFunction'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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
        await deleteUser(id);
        toast.warning("Teacher deleted successfully")
        getData();
      } catch (error) {
        console.log(error)
      }
    }
  }, []);
  return (
    <>
      <div className='heading_edit'>
        <h2>Teacher</h2>
        <Link className="link" to={"add"}><button className="add">Add Teacher</button></Link>
      </div>
      <table >
        <thead>
          <tr>
            <th></th>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            teachers?.map((teacher, index) => {
              return <tr className={index % 2 == 0 ? "even" : "odd"} key={teacher.teacher_id}>
                <td><img src={teacher.image ? `http://localhost:8080/api/images/${teacher.image}` : oip} height={50} width={50} alt="profile" /></td>
                <td>{teacher.fname}</td>
                <td>{teacher.mname}</td>
                <td>{teacher.lname}</td>
                <td className='action'><Link to={`edit/${teacher.teacher_id}`}><FaEdit size={20} color="green" /></Link></td>
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