import React from 'react'
import "./teacher.css"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
const TeacherPage = () => {
  return (
    <>
      <h2>Teacher</h2>
      <button className="add">Add Teacher</button>
      <table border={"2px"}>
        <thead>
          <tr>
            <th>Fname</th>
            <th>Mname</th>
            <th>Lname</th>
            <th>Subject</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Roshan</td>
            <td></td>
            <td>Tandukar</td>
            <td>OS</td>
            <td><button><FaEdit size={20} color="green" /></button></td>
            <td><button><MdDelete size={20} color="red" /></button></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TeacherPage