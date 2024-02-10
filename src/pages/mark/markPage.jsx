import React, { useEffect, useState } from 'react'
import { getClass, getSectionByClass } from '../../services/fetchFunction';

const MarkPage = () => {
  const [classes, setClasses] = useState();
  const [sections, setSections] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const getClassData = async () => {
    const classData = await getClass();
    setClasses(classData);
  }
  const getSectionData = async () => {
    const sectionData = await getSectionByClass(selectedClass);
    console.log(sectionData)
    setSections(sectionData);
  }
  useEffect(() => {
    getClassData();
  }, [])
  useEffect(() => {
    getSectionData();
  }, [selectedClass])
  return (
    <div>
      <div>

        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
          <option value="">select class</option>
          {
            classes?.map((_class) => {
              return <option value={_class.class_id}>{_class.class_name}</option>
            })
          }
        </select>
        <select name="section" id="">
          <option value="">select section</option>
          {
            sections?.map((section) => {
              return <option value={section.section_id}>{section.section_name}</option>
            })
          }
        </select>
      </div>
      <div>
        <select name="student" id="">
          <option value="">select student</option>
          <option value="">abc</option>
          <option value="">abc</option>
          <option value="">abc</option>
        </select>
        <select name="exam" id="">
          <option value="">select exam</option>
          <option value="">abc</option>
          <option value="">abc</option>
          <option value="">abc</option>
        </select>
      </div>





    </div>
  )
}

export default MarkPage