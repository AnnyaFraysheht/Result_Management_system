import React, { useEffect, useState } from 'react'
import { getSubjects } from '../services/fetchFunction';
import Select from 'react-select';

const MultipleSubject = ({ selectedOptions , handleChangeSubject}) => {

    const [options  , setOptions] = useState()

    const getData = async () => {
        // console.log(_class_id)

        const data = await getSubjects(null, 100, 0);
        // setSubjects(data)
        // setSubjects(data.result)
        console.log(data);
        const filterData = data.result.map((item) => {
            return {
                value: item.subject_id,
                label: item.subject_name
            }
        })
        setOptions(filterData)

    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <Select
                options={options}
                className={'selectBox react-select'}
                value={selectedOptions}
                isMulti={true}
                onChange={handleChangeSubject}
                styles={{ backgroundColor: "black" }}
            />
        </>
    )
}

export default MultipleSubject