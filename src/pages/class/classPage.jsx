import React, { useCallback, useEffect, useState } from 'react'
import "./class.css"
import { deleteClass, getClass } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
const ClassPage = () => {
    const [classes, setClasses] = useState();
    const getData = async () => {
      const data = await getClass();
      setClasses(data)
    }
    useEffect(() => {
      getData();
    }, [])
    const handleDelete = useCallback( async (id) => {
      try {
       await deleteClass(id)
        getData();
      } catch (error) {
        console.log(error)
      }
    }, []);
    return (
      <>
        <h2>Class</h2>
        <button className="add"><Link className="link" to={"add"}>Create Class</Link> </button>
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
              classes?.map((_class) => {
                return <tr key={_class.class_id}>
                  <td>{_class.class_name}</td>
                  <td>{_class.class}</td>
                  <td className='action'><button><FaEdit size={20} color="green" /></button></td>
                  <td className='action'><button onClick={(e)=> handleDelete(_class.class_id)}><MdDelete  size={20} color="red" /></button></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </>
    )
}

export default ClassPage