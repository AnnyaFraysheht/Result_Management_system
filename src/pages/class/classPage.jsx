import React, { useCallback, useEffect, useState } from 'react'
import "./class.css"
import { deleteClass, getClass } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify';
const ClassPage = () => {
  const [classes, setClasses] = useState();
  const getData = async () => {
    const data = await getClass();
    setClasses(data)
  }
  useEffect(() => {
    getData();
  }, [])
  const handleDelete = useCallback(async (id) => {
    try {
      if (window.confirm("Are you sure to delete")) {
        await deleteClass(id);

        toast.warning("Class Deleted");
        getData();
      }
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <>
      <div className='heading_edit'>

        <h2>Class</h2>
        <Link className="link" to={"add"}><button className="add">Create Class </button></Link>
      </div>
      <table >
        <thead>
          <tr>
            <th>Class Name</th>
            <th>class</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            classes?.map((_class, index) => {
              return <tr key={_class.class_id} className={index % 2 == 0 ? "even" : "odd"}>
                <td>{_class.class_name}</td>
                <td>{_class.class}</td>
                <td className='action'><Link to={`edit/${_class.class_id}`}><FaEdit size={20} color="green" /></Link></td>
                <td className='action'><button onClick={(e) => handleDelete(_class.class_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default ClassPage