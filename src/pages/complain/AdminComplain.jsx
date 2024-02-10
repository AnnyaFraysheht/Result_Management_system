import React, { useEffect, useState } from 'react'
import { getComplains, solveComplain } from '../../services/fetchFunction';
import "./complain.css"
const AdminComplain = () => {
  const [complains, setComplains] = useState()
  const getComplainData = async () => {
    const data = await getComplains();
    setComplains(data)
  }
  useEffect(() => {
    getComplainData();
  }, [])
  const handleResolve = async (id) =>{
    if(window.confirm("Are you sure you solved the problem?")){
      //update the database status for that complain 
      console.log(id)
      await solveComplain(id);
      getComplainData();
    }
  }
  return (
    <>
    <h1>Complains</h1>
      <table>
        <thead>
          <tr>

            <th>Date Added</th>
            <th>Added By</th>
            <th>Complain</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            complains?.map((complain , index) => {
              return <tr key={complain.complain_id} className={complain.status ? index % 2 == 0 ? "even" : "odd" : 'red'}>

                <td>{complain.created_at}</td>
                <td>{complain.fname} {complain.lname}</td>
                <td>{complain.message}</td>
                <th>{complain.status ? <span className='solved'>Solved</span> : <span className='pending'>Pending</span> }</th>
                <th>{complain.status ? <button className='solvedBtn' disabled>Solved</button > : <button onClick={() => handleResolve(complain.complain_id)} className='pendingBtn' >Resolve</button>}</th>
              </tr>

            })
          }

        </tbody>
      </table>

    </>
  )
}

export default AdminComplain