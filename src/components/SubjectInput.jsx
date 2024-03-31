import React, { useEffect, useState } from 'react'
import {  getSubjects } from '../services/fetchFunction';

const SubjectInput = ({ value, class_id,   handleChange }) => {
    const [subjects, setSubjects] = useState();
    // const [_class_id , setClassId] = useState(value)
    const getData = async () => {
        // console.log(_class_id)
        if(class_id){

            const data = await getSubjects(class_id);
            setSubjects(data)
        }else{
            const data = await getSubjects();
            setSubjects(data)

        }
    }
    useEffect(() => {
        getData();
    }, [class_id])
    return (
        <select value={value} className='selectBox' name="subject_id" id="class" onChange={handleChange}>

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