import React, { useEffect, useState } from 'react'
import { getClass, getSubjects } from '../services/fetchFunction';

const SubjectInput = ({ handleChange }) => {
    const [subjects, setSubjects] = useState();
    const getData = async () => {

        const data = await getSubjects();
        setSubjects(data)
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <select className='selectBox' name="subject_id" id="class" onChange={handleChange}>

            <option value={''}>Choose Subject</option>
            {
                subjects?.map((subject) => {
                    return <option key={subject.subject_id} value={subject.subject_id}>{subject.subject_name}</option>
                })
            }

        </select>
    )
}

export default SubjectInput