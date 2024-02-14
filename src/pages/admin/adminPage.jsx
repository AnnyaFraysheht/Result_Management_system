import React, { useCallback, useEffect, useState } from 'react'
import "./admin.css"
import oip from "../../assets/OIP.jpeg"
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { deleteUser, getAdmins, getTeachers } from '../../services/fetchFunction'
import { Link } from 'react-router-dom'
const AdminPage
 = () => {
  const [admins, setAdmins] = useState();
  const getData = async () => {
    const data = await getAdmins();
    setAdmins(data)
  }
  useEffect(() => {
    getData();
    // console.log(admins)
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
      <h2>Admin</h2>
      <p><i>(NOTE: Admins are like god so add them carefully)</i></p>
      <button className="add"><Link className="link" to={"add"}>Add New Admin</Link> </button>
      <table >
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
            admins?.map((admin, index) => {
              return <tr className={index % 2 == 0 ? "even" : "odd"}  key={admin.admin_id}>
                <td><img src={admin.image ? `http://localhost:8080/api/images/${admin.image}` : oip} height={50} width={50} alt="profile" /></td>
                <td>{admin.fname}</td>
                <td>{admin.mname}</td>
                <td>{admin.lname}</td>
                <td>{admin.subject_name}</td>
                <td className='action'><button><FaEdit size={20} color="green" /></button></td>
                <td className='action'><button onClick={(e) => handleDelete(admin.user_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default AdminPage
