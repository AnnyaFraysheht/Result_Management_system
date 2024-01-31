import React from 'react'
import oip from "../../assets/OIP.jpeg";
import "./profile.css";
import { FaEdit } from 'react-icons/fa';
const Profile = () => {
  return (
    <>
      <div className="image_section">
        <img className='profile_picture' src={oip} alt="" srcSet="" />
        <label htmlFor="change_picture" className='image_edit_icon'>

          <FaEdit className='icon' size={50} color='green' />
        </label>
        <input className='change_pic' type="file" name="image" id="change_picture" />

      </div>
      <div className='General Info'>
        <h1>Personal Information</h1>
        <h3>Name:Rohan Thapa</h3>
        <h3>DOB:2059-05-12</h3>
        <h3>Gender:Male</h3>
        <h3>Email:thaparohan2019@gmail.com</h3>
        <h3>Primary Contact:9744375757</h3>
        <h3>Secondary Contact:9808305101</h3>
        <h3>Permanent Address:Koteshwor-32,Kathmandu</h3>
        <h3>Temporary Address:Sanepa-02,Lalitpur</h3>

      </div>

    </>
  )
}

export default Profile