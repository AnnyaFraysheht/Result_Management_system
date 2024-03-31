import React, { useEffect, useState } from 'react'
import { getMyComplains } from '../../services/fetchFunction';
import "./complain.css"
import axios from 'axios';
import { IoMdSend } from 'react-icons/io';
import Spinner from '../../components/loader/Spinner';
const StudentComplain = () => {
  const [complains, setComplains] = useState();
  const [loading, setLoading] = useState(false)
  const [complainData, setComplainData] = useState({
    message: ''
  });
  const getMyComplainData = async () => {
    setLoading(true)
    const data = await getMyComplains();
    setComplains(data)
    setLoading(false)
  }
  useEffect(() => {
    getMyComplainData();
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Did you mentioned your problem correctly?")) {
      //update the database status for that complain 
      axios.post("http://localhost:8080/api/complain", complainData, {
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        setComplainData({ message: '' })
        getMyComplainData();
      }).catch((error) => {
        console.log(error);
      })
    }
  }
  const handleChange = (e) => {
    setComplainData({ message: [e.target.value] })
  }
  return (
    <>
      <h2 className='complainHeading'>Add Complain</h2>
      <form onSubmit={handleSubmit} className='complainform'>
        <textarea onChange={handleChange} value={complainData.message} placeholder='Write complain here...' name="complain" id="complain" cols="20" rows="8"></textarea>
        <button className='btn complainbtn' type="submit"  ><IoMdSend size={35} color='white' /></button>
      </form>
      <h1>My Complains</h1>
      {
        loading ? <Spinner /> : <table>
          <thead>
            <tr>

              <th>Date Added</th>
              <th>Complain</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className='tbody'>
            {
              complains?.map((complain, index) => {
                return <tr key={complain.complain_id} className={complain.status ? index % 2 == 0 ? "even" : "odd" : 'red'}>

                  <td>{complain.created_at}</td>
                  <td>{complain.message}</td>
                  <td>{complain.status ? <span className='solved'>Solved</span> : <span className='pending'>Pending</span>}</td>
                </tr>

              })
            }

          </tbody>
        </table>

      }
    </>
  )
}

export default StudentComplain