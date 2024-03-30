import React, { useCallback, useEffect, useState } from 'react'
import "./section.css"
import { deleteSection, getClass, getSectionByClass } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
import { toast } from 'react-toastify';
const SectionPage = () => {
  const [sections, setSections] = useState([]);
  const [choosedSection, setChoosedSection] = useState();


  const handleDelete = useCallback(async (id) => {
    try {
      if(window.confirm("Are you sure to delete")){

        await deleteSection(id)
        toast.warn("Section Deleted Successfully")
        getSection();
      }
    } catch (error) {
      console.log(error)
    }
  }, []);

  const getSection = async () => {
    const data = await getSectionByClass(choosedSection);
    // console.log(data)
    setSections(data)
  }
  const handleChange = (e) => {
    setChoosedSection(e.target.value);
    // console.log(e.target.value)
  }
  useEffect(() => {
    if (choosedSection) {
      // console.log("running")
      getSection();
    }
  }, [choosedSection])
  return (
    <>
      <div className='heading_edit'>

        <h2>Section</h2>
        <Link className="link" to={"add"}><button className="add">Create Section</button></Link> 
      </div>
      <div className='heading_edit'>

        <label htmlFor="classSelect" className='classSelect'>Class</label>
        <ClassInput handleChange={handleChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Capacity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            sections?.map((section, index) => {
              return <tr key={section.section_id} className={index % 2 == 0 ? "even" : "odd"}>
                <td>{section.section_name}</td>
                <td>{section.section_capacity}</td>
                <td className='action'><Link to={`edit/${section.section_id}`}><FaEdit size={20} color="green" /></Link></td>
                <td className='action'><button onClick={(e) => handleDelete(section.section_id)}><MdDelete size={20} color="red" /></button></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default SectionPage