import React, { useEffect, useState } from 'react'
import {  getMyComplains } from '../../services/fetchFunction';
import "./complain.css"
import axios from 'axios';
import { IoMdSend } from 'react-icons/io';
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
        setComplainData({message : ''})
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
    <h2 className='topic'>Add Complain</h2>
    <form onSubmit={handleSubmit} className='complainform'>
      <textarea onChange={handleChange} value={complainData.message} name="complain" id="complain" cols="20" rows="13"></textarea>
      <button className='btn complainbtn' type="submit"  ><IoMdSend size={35} color='gray' /></button>
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