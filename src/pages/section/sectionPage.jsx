import React, { useCallback, useEffect, useState } from 'react'
import "./section.css"
import { deleteSection, getClass, getSectionByClass } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
import { toast } from 'react-toastify';
import { getSections } from '../../services/FetchFunctions/Section/SectionFetch';
import Pagination from '../../components/pagination/Pagination';
const SectionPage = () => {
  const [sections, setSections] = useState([]);
  const [choosedClass, setChoosedClass] = useState(null);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPage] = useState();
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);

  const getPrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      const newOffset = (prevPage - 1) * limit;
      setOffset(newOffset);
      setCurrentPage(prevPage);
      getSection(choosedClass, limit, newOffset);
    }
  };

  const getNextPage = () => {
    const nextPage = currentPage + 1;
    console.log(totalPages)
    if (nextPage <= totalPages) {

      const newOffset = currentPage * limit;
      setOffset(newOffset);
      setCurrentPage(nextPage);
      getSection(choosedClass, limit, newOffset);
    }
  };

  const handleDelete = useCallback(async (id) => {
    try {
      if (window.confirm("Are you sure to delete")) {

        await deleteSection(id)
        toast.warn("Section Deleted Successfully")
        getSection();
      }
    } catch (error) {
      console.log(error)
    }
  }, []);

  const getSection = async (choosedClass, limit, offset) => {
    console.log(choosedClass, limit, offset)
    if (choosedClass) {
      const data = await getSections(choosedClass, limit, offset);
      setSections(data.result)
      setTotalPage(data.totalPage)
    } else {
      const data = await getSections(null, limit, offset);
      console.log(data)
      setSections(data.result)
      setTotalPage(data.totalPage)

    }
    // console.log(data)
  }
  const handleChange = (e) => {
    setChoosedClass(e.target.value);
    setOffset(0);
    setCurrentPage(1);
    // console.log(e.target.value)
  }
  useEffect(() => {
    // if (choosedSection) {
    // console.log("running")
    getSection(choosedClass, limit, offset);
    // }
  }, [choosedClass])
  return (
    <>
      <div className='heading_edit'>

        <h2>Section</h2>

        <ClassInput small={true} handleChange={handleChange} />
        <Link className="link" to={"add"}><button className="add">Create Section</button></Link>
      </div>
      <br />
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
      <div className="patinationPart">
        <Pagination currentPage={currentPage} getPrevPage={getPrevPage} getNextPage={getNextPage} totalPage={100} />
      </div>
    </>
  )
}

export default SectionPage