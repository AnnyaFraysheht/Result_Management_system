import React, { useEffect, useState } from 'react'
import OpenNotice from '../../../components/OpenNotice/OpenNotice'
import { getClassNotice } from '../../../services/fetchFunction';

const StudentNotice = () => {
  const [classNotice,setClassNotice] = useState();
  const getClassNoticeData = async () =>{
    const data = await getClassNotice();
    console.log(data)
    setClassNotice(data);
  }
  useEffect(()=>{
    getClassNoticeData();
  },[])
  return (
    <>
    
    <OpenNotice />
    <h1>Class Notice</h1>
    {
      classNotice?.map((notice)=>{
        return <>
        <h1>{notice.date_posted}</h1>
          <h1>{notice.notice_text}</h1>
        </>
      })
    }
    </>
  )
}

export default StudentNotice