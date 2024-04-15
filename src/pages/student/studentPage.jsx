import "./student.css"
import oiep from "../../assets/OIP.jpeg"
import React, { useCallback, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { Link } from "react-router-dom"
import { deleteUser, getStudents } from "../../services/fetchFunction"
import ClassInput from "../../components/ClassInput"
import Search from "../../components/Search/Search"
const StudentPage = () => {
  const [students, setStudents] = useState();
  const [_class, setClass] = useState();
  const getData = async (id) => {
    if (id) {
      const data = await getStudents(id);
      setStudents(data)
    } else {

      const data = await getStudents();
      setStudents(data)
    }
  }
  useEffect(() => {
    getData(_class);
  }, [_class])
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
  const handleChange = (e) => {
    setClass(e.target.value)
  }
  return (
    <>
      <div className='heading_edit'>
        <h2>Students</h2>
        <ClassInput small={true} handleChange={handleChange} />

        <Search />
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