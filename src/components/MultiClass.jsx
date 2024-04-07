import React, { useEffect, useState } from 'react'
import { getClass, getSubjects } from '../services/fetchFunction';
import Select from 'react-select';
// import Select from 'react-select';

const MultiClass = ({ selectedOptions, handleChangeClass }) => {

    const [options, setOptions] = useState()

    const getData = async () => {
        // console.log(_class_id)

        const data = await getClass();
        // setSubjects(data)
        // setSubjects(data.result)
        console.log(data);
        const filterData = data.map((item) => {
            return {
                value: item.class_id,
                label: item.class_name
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
                closeMenuOnSelect={false}
                className={'selectBox react-select'}
                value={selectedOptions}
                isMulti={true}
                onChange={handleChangeClass}
                styles={{ backgroundColor: "black" }}
            />
        </>
    )
}

export default MultiClass