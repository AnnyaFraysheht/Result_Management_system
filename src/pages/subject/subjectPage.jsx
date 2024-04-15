import React, { useCallback, useEffect, useState } from 'react'
import "./subject.css"
import { deleteSubject, getSubjects } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ClassInput from '../../components/ClassInput';
import Pagination from '../../components/pagination/Pagination';
// import { toast } from 'react-toastify';//ddone when fetching !!!
const SubjectPage = () => {
    const [subjects, setSubjects] = useState();
    const [_class, setClass] = useState();

    const [limit, setLimit] = useState(12);
    const [totalPages, setTotalPage] = useState(2);
    const [offset, setOffset] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);

    const getPrevPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
            const newOffset = (prevPage - 1) * limit;
            setOffset(newOffset);
            setCurrentPage(prevPage);
            getData(_class, limit, newOffset);
        }
    };

    const getNextPage = () => {
        const nextPage = currentPage + 1;
        console.log(totalPages)
        if (nextPage <= totalPages) {

            const newOffset = currentPage * limit;
            setOffset(newOffset);
            setCurrentPage(nextPage);
            getData(_class, limit, newOffset);
        }
    };


    const getData = async (_class, limit, offset) => {
        if (_class) {
            // console.log(_class)
            const data = await getSubjects(_class, limit, offset);
            console.log(data)
            setSubjects(data.result)
            setTotalPage(data.totalPage)

        } else {
            // console.log(_class)
            const data = await getSubjects(null, limit, offset);
            console.log(data)
            setSubjects(data.result)
            setTotalPage(data.totalPage)

        }
    }
    // useEffect(()=>{
    //     getData
    // })
    useEffect(() => {
        getData(_class, limit, offset);
    }, [_class]);
    const handleDelete = useCallback(async (id) => {
        try {
            if (window.confirm("Are you sure to delete Subject?")) {
                await deleteSubject(id);
                await getData(_class, limit, offset);
            }
        } catch (error) {
            console.log(error)
        }
    }, []);
    const handleChange = (e) => {
        console.log(e.target.value)
        setCurrentPage(1);
        setOffset(0);
        setClass(e.target.value)
    }
    return (
        <>

            <div className='heading_edit'>

                <h1>Subjects</h1>
                <ClassInput handleChange={handleChange} small={true} />
                <Link className="link" to={"add"}><button className="add">Add New Subject</button></Link>
            </div>
            <table >
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjects?.map((subject, index) => {
                            return <tr key={subject.subject_id} className={index % 2 == 0 ? "even" : "odd"}>
                                <td>{subject.subject_name}</td>
                                <td>{subject.subject_code}</td>
                                <td>{subject.desc}</td>
                                <td className='action'><Link to={`edit/${subject.subject_id}`}><FaEdit size={20} color="green" /></Link></td>
                                <td className='action'><button onClick={(e) => handleDelete(subject.subject_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className="paginationPart">
                <Pagination getNextPage={getNextPage} getPrevPage={getPrevPage} currentPage={currentPage} totalPage={totalPages} />
            </div>
        </>
    )
}

export default SubjectPage