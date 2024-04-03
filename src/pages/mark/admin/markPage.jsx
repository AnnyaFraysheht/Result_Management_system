// import React, { useEffect, useState } from 'react'
// import { getClass, getExamByClass, getMarksOfClassByExam, getSectionByClass } from '../../../services/fetchFunction';
// import axios from 'axios';
// import "../markpage.css"
// import { toast } from 'react-toastify';
// import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';
// const MarkPage = () => {
//   const [classes, setClasses] = useState();
//   const [term, setTerm] = useState();
//   const [studentMarks, setStudentMarks] = useState([])
//   const [selectedClass, setSelectedClass] = useState();
//   // const [selectedExam, setSelectedExam] = useState();
//   const [result, setResult] = useState();

//   const getClassData = async () => {
//     const classData = await getClass();
//     setClasses(classData);
//   }
//   // const getExamData = async () => {
//   //   console.log(selectedClass)
//   //   const examData = await getExamByClass(selectedClass);
//   //   setExams(examData);
//   // }

//   // const handleResultChange = (event, student_id) => {
//   //   const { name, value } = event.target;
//   //   if (name === 'marks_obtained') {
//   //     Number(value);
//   //     let grade, remarks;
//   //     console.log(value)
//   //     if (value > 90){
//   //       remarks = "Distinction"
//   //       grade  = "A"
//   //     } else if( value > 80){
//   //       remarks = "Very Good"
//   //       grade  = "A-"
//   //     } else if( value > 70){
//   //       remarks = "First Division"
//   //       grade  = "B+"
//   //     } else if( value > 60){
//   //       remarks = "Second Division"
//   //       grade  = "B"
//   //     } else if( value >= 50){
//   //       remarks = "Pass"
//   //       grade  = "B-"
//   //     } else if( value < 50){
//   //       remarks = "Fail"
//   //       grade  = "F"
//   //     }
//   //     setResult(prev => prev.map((student) => {
//   //       return student.student_id == student_id ? { ...student, [name]: value, grade: grade, remarks: remarks } : student;
//   //     }))
//   //   }

//   // setResult(prev => prev.map((student) => {
//   //   return student.student_id == student_id ? { ...student, [name]: value} : student;
//   // }))
//   // console.log(result)
//   // }

//   const getAllMarksOfClass = async () => {
//     if (selectedClass && term) {
//       // setStudentMarks([]);

//       const studentMarksData = await getAllMarksOfClassByExam(selectedClass, term);
//       console.log(studentMarksData);
//       setStudentMarks(studentMarksData);
//       const subjectNames = studentMarksData.length > 0 ? studentMarksData[0].subjects_marks.map(subject => subject.subject_name) : [];

//       // const filtered = studentMarksData.map((student) => {
//       //   return { name: student.fname + " " + student.mname + " " + student.lname, student_id: student_id, subject_id: student.subject_id, exam_id: student.exam_id, marks_obtained: student.marks_obtained, remarks: student.remarks, grade: student.grade }
//       // })
//       // setResult(filtered);
//       // console.log("result", result)
//     }

//   }
//   // const insertMark = async () => {
//   //   try {
//   //     if(window.confirm("Confirm your marks")){

//   //       const response = await axios.post(`http://localhost:8080/api/insertMarks`, result, {
//   //         withCredentials: true,
//   //       });
//   //       if(response.status == 200){
//   //         // window.alert("Successfully inserted marks");
//   //         toast.success("Marks inserted successfully");
//   //       }
//   //       // console.log(response.status)
//   //       return response.data.data;
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   useEffect(() => {
//     getClassData();
//   }, [])
//   useEffect(() => {
//     // getExamData();
//     getAllMarksOfClass();
//   }, [selectedClass, term])
//   return (
//     <div>
//       {/* <input type="search" name="searchmark" id="" placeholder='Search Student Name' /> */}
//       <div>
//         <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
//           <option value="">select class</option>
//           {
//             classes?.map((_class) => {
//               return <option key={_class.class_id} value={_class.class_id}>{_class.class_name}</option>
//             })
//           }
//         </select>

//         <select onChange={(e) => { setTerm(e.target.value) }} name="exam" id="">
//           <option value="">select term</option>
//           {/* {
//             exams?.map((exam) => {
//               return <option key={exam.exam_id} value={exam.exam_id}>{exam.exam_name} {exam.subject_name}</option>
//             })
//           } */}
//           <option value="1">1st term</option>
//           <option value="2">2nd term</option>
//           <option value="3">3rd term</option>
//         </select>
//       </div>
//       <br />
//       <hr />

//       {/* <table> */}
//       {/* <thead>
//           <tr>
//             <th>Name</th>
//             {
//               studentMarks[0] ? <th>{studentMarks[0].subject_name}</th> : <th>subject</th>
//             }
//             <th>remarks</th>
//             <th>gpa</th>
//           </tr>
//         </thead> */}
//       {/* <tbody>
//           {
//             result?.map((studentMark) => {
//               return <tr>
//                 <td>{studentMark.name} </td>
//                 <td>
//                   <input type="number" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="marks_obtained" value={studentMark.marks_obtained || ""} id="" />

//                 </td>
//                 <td>
//                   <input type="text" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="remarks" value={studentMark.remarks || ""} id="" />

//                 </td>
//                 <td>

//                   <input type="text" onChange={(e) => { handleResultChange(e, studentMark.student_id) }} name="grade" value={studentMark.grade || ""} id="" />
//                 </td>


//               </tr>
//             })
//           }

//         </tbody>
//       </table> */}
//       {/* {
//         result ? <button className='submitmarks' onClick={insertMark}>Insert Marks</button> : "" 
//       } */}



//     </div>
//   )
// }

// export default MarkPage


import React, { useEffect, useState } from 'react';
import { getClass } from '../../../services/fetchFunction';
import "../markpage.css";
import { getAllMarksOfClassByExam } from '../../../services/FetchFunctions/MarkFetch/markfetch';

const MarkPage = () => {
  const [classes, setClasses] = useState([]);
  const [term, setTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    const getClassData = async () => {
      const classData = await getClass();
      setClasses(classData);
    };
    getClassData();
  }, []);

  useEffect(() => {
    const getAllMarks = async () => {
      if (selectedClass && term) {
        const marksData = await getAllMarksOfClassByExam(selectedClass, term);
        // setStudentMarks(marksData);
        setStudentMarks(marksData.map(student => ({
          ...student,
          subjects_marks: student.subjects_marks.sort((a, b) => a.subject_id - b.subject_id)
        })));
      }
    };
    getAllMarks();
  }, [selectedClass, term]);

  return (
    <div>
      <div>
        <select onChange={(e) => setSelectedClass(e.target.value)} name="class" id="">
          <option value="">Select Class</option>
          {classes.map((_class) => (
            <option key={_class.class_id} value={_class.class_id}>
              {_class.class_name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTerm(e.target.value)} name="exam" id="">
          <option value="">Select Term</option>
          <option value="1">1st term</option>
          <option value="2">2nd term</option>
          <option value="3">3rd term</option>
        </select>
      </div>
      <br />
      <hr />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            {/* <th>User ID</th> */}
            {/* <th>Student ID</th> */}
            {studentMarks.length > 0 && studentMarks[0].subjects_marks.map((subject) => (
              <th key={subject.subject_id}>{subject.subject_name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentMarks.map((student) => (
            <tr key={student.student_id}>
              <td>{student.fname}</td>
              <td>{student.mname}</td>
              <td>{student.lname}</td>
              {/* <td>{student.user_id}</td> */}
              {/* <td>{student.student_id}</td> */}
              {student.subjects_marks.map((subject) => (
                <td key={subject.subject_id}>{/*subject.subject_name*/}{subject.marks_obtained || "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkPage;
