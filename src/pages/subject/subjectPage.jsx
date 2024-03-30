import React, { useCallback, useEffect, useState } from 'react'
import "./subject.css"
import { deleteSubject, getSubjects } from '../../services/fetchFunction';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify';
const SubjectPage = () => {
    const [subjects, setSubjects] = useState();
    const getData = async () => {
        const data = await getSubjects();
        console.log(data)
        setSubjects(data)
    }
    useEffect(() => {
        getData();
    }, []);
    const handleDelete = useCallback(async (id) => {
        try {
            if (window.confirm("Are you sure to delete Subject?")) {
                await deleteSubject(id);
                getData();
            }
        } catch (error) {
            console.log(error)
        }
    }, []);
    return (
        <>
            
            <div className='heading_edit'>

            <h1>Subjects</h1>
            <Link className="link" to={"add"}><button className="add">Add New Subject</button></Link> 
            </div>
            <table >
                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Subject Code</th>
                        <th>Class Name</th>
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
                                <td>{subject.class_name}</td>
                                <td className='action'><Link to={`edit/${subject.subject_id}`}><FaEdit size={20} color="green" /></Link></td>
                                <td className='action'><button onClick={(e) => handleDelete(subject.subject_id)}><MdDelete size={20} color="red" /></button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default SubjectPage