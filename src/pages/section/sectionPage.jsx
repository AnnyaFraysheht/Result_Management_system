import React, { useCallback, useEffect, useState } from 'react'
import "./section.css"
import {  deleteSection, getClass, getSectionByClass } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
const SectionPage = () => {
  const [sections, setSections] = useState([]);
  const [choosedSection, setChoosedSection] = useState();


  const handleDelete = useCallback(async (id) => {
    try {
      await deleteSection(id)
      getSection();
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
      <h2>Section</h2>
      <button className="add"><Link className="link" to={"add"}>Create Section</Link> </button>
      <br /><label htmlFor="classSelect">Class</label>
      
      <ClassInput handleChange={handleChange} />
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
            sections?.map((section) => {
              return <tr key={section.section_id}>
                <td>{section.section_name}</td>
                <td>{section.section_capacity}</td>
                <td className='action'><button><FaEdit size={20} color="green" /></button></td>
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