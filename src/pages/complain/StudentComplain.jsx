import React, { useEffect, useState } from 'react'
import {  getMyComplains } from '../../services/fetchFunction';
import "./complain.css"
import axios from 'axios';
const StudentComplain = () => {
  const [complains, setComplains] = useState();
  const [complainData, setComplainData] = useState({
    message: ''
  });
  const getMyComplainData = async () => {
    const data = await getMyComplains();
    setComplains(data)
  }
  useEffect(() => {
    getMyComplainData();
  }, [])
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(window.confirm("Did you mentioned your problem correctly?")){
      //update the database status for that complain 
      axios.post("http://localhost:8080/api/complain",complainData,{
        withCredentials: true,
      }).then((response)=>{
        console.log(response);
        getMyComplainData();
      }).catch((error)=>{
        console.log(error);
      })
    }
  }
  const handleChange = (e) =>{
    setComplainData({message: [e.target.value]})
  }
  return (
    <>
    <h1>Add Complain</h1>
    <form onSubmit={handleSubmit} action="">
      <label htmlFor="complain" ><h1>Message</h1></label>
      <textarea onChange={handleChange} name="complain" id="complain" cols="30" rows="10"></textarea>
      <input className='btn' type="submit" value={"Submit"} />
    </form>
    <h1>My Complains</h1>
      <table>
        <thead>
          <tr>

            <th>Date Added</th>
            <th>Complain</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            complains?.map((complain) => {
              return <tr key={complain.complain_id}>

                <td>{complain.created_at}</td>
                <td>{complain.message}</td>
                <th>{complain.status ? <span className='solved'>Solved</span> : <span className='pending'>Pending</span> }</th>
              </tr>

            })
          }

        </tbody>
      </table>

    </>
  )
}

export default StudentComplain