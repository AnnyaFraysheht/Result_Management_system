import "./student.css"
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
const StudentPage = () => {
  return (
    <>
     <h2>Students</h2>
     <button className="add">Add Student</button>
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
          <tr>
            <td>Rohan</td>
            <td></td>
            <td>Thapa</td>
            <td>4th Sem</td>
            <td>A</td>
            <td><button><FaEdit size={20} color="green"/></button></td>
            <td><button><MdDelete size={20} color="red"/></button></td>
          </tr>
        </tbody>
      </table> 
    </>
  )
}

export default StudentPage