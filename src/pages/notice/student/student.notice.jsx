import React, { useEffect, useState } from 'react'
import OpenNotice from '../../../components/OpenNotice/OpenNotice'
import { getClassNotice } from '../../../services/fetchFunction';

const StudentNotice = () => {
  const [classNotice, setClassNotice] = useState();
  const getClassNoticeData = async () => {
    const data = await getClassNotice();
    console.log(data)
    setClassNotice(data);
  }
  useEffect(() => {
    getClassNoticeData();
  }, [])
  return (
    <>

      <OpenNotice />
      <div className="notice">

        <h3 className='heading'>Class Notice</h3>
        <div className="notices">

          {
            classNotice?.map((notice) => {
              return <div className='eachNotice' key={notice.notice_id}>
                <div className='date'>{notice.date_posted.slice(0, 10)}</div>
                <div className='details'>{notice.notice_text}</div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default StudentNotice