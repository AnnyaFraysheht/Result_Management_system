import React, { useEffect, useState } from 'react'
import { getClass, getExamByClass, getMarksByClass, getSectionByClass } from '../../services/fetchFunction';

const MarkPage = () => {
  const [classes, setClasses] = useState();
  const [exams, setExams] = useState();
  const [studentMarks, setStudentMarks] = useState([])
  const [sections, setSections] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const getClassData = async () => {
    const classData = await getClass();
    setClasses(classData);
  }
  const getExamData = async () => {
    console.log(selectedClass)
    const examData = await getExamByClass(selectedClass);
    setExams(examData);
  }
  const getSectionData = async () => {
    const sectionData = await getSectionByClass(selectedClass);
    // console.log(sectionData)
    setSections(sectionData);
  }

  const getMarksOfClass = async () => {
    const studentMarksData = await getMarksByClass(selectedClass);
    console.log(studentMarksData)
    setStudentMarks(studentMarksData);
    // console.log(studentMarks)

  }

  useEffect(() => {
    getClassData();
  }, [])
  useEffect(() => {
    getSectionData();
    getExamData();
    getMarksOfClass();
  }, [selectedClass])
  return (
    <div>
      <input type="search" name="searchmark" id="" placeholder='Search Student Name' />
      <div>
        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
          <option value="">select class</option>
          {
            classes?.map((_class) => {
              return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
            })
          }
        </select>
        <select name="section" id="">
          <option value="">select section</option>
          {
            sections?.map((section) => {
              return <option key={section.section_id} value={section.section_id}>{section.section_name}</option>
            })
          }
        </select>
        <select name="exam" id="">
          <option value="">select exam</option>
          {
            exams?.map((exam) => {
              return <option key={exam.exam_id} value={exam.exam_id}>{exam.exam_name}</option>
            })
          }
        </select>
      </div>
      <br />
      <hr />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            {
              studentMarks[0] ? studentMarks[0].subjects?.map((subject, index) => {
                return <th key={index}>{subject}</th>
              }) : <><th>subject1</th><th>subject 2</th><th>subject 3</th></>
            }
            <th>class</th>
            <th>section</th>
            <th>exam</th>
            <th>total</th>
            <th>gpa</th>
          </tr>
        </thead>
        <tbody>
          {
            studentMarks?.map((studentMark) => {
              return <tr>
                <td>{studentMark.fname} {studentMark.mname} {studentMark.lname}</td>
                {
                  studentMark?.marks_obtained?.map((mark) => {
                    return <td>{mark}</td>
                  })
                }
                <td>{studentMark.class_name}</td>
                <td>{studentMark.section_name}</td>
                <td>{studentMark.exam_name}</td>
                <td>{
                  studentMark?.marks_obtained?.reduce((mark, q) => {
                    return mark + q
                  })
                }</td>
              </tr>
            })
          }

        </tbody>
      </table>




    </div>
  )
}

export default MarkPage