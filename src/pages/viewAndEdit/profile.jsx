import React from 'react'
import oip from "../../assets/OIP.jpeg";
import "./profile.css";
import { FaEdit } from 'react-icons/fa';
const Profile = () => {
  return (
    <>
      <div className="image_section">
        <label htmlFor="change_picture" className='image_edit_icon'>

          <FaEdit className='icon' size={50} color='green' />
        </label>
        <input className='change_pic' type="file" name="image" id="change_picture" />
        <img className='profile_picture' src={oip} alt="" srcSet="" />

      </div>
      <div className='general_info'>
        <div>
          <h1>Personal Information</h1>

        </div>
        <div className="details-container">
          <div>Name:</div>
          <div>Rohan Thapa</div>

        </div>
        <div className="details-container">
          <div>DOB:</div>
          <div>2059-05-12</div>

        </div>
        <div className="details-container">
          <div>Gender</div>
          <div>Male</div>
        </div>
        <div className="details-container">
          <div>Email</div>
          <div>thaparohan2019@gmail.com</div>

        </div>
        <div className="details-container">
          <div>Primary Contact</div>
          <div>9744375757</div>
        </div>
        <div className="details-container">
          <div>Secondary Contact</div>
          <div>9808305101</div>
        </div>
        <div className="details-container">
          <div>Permanent Address</div>
          <div>Koeshwor-32,Kathmandu</div>
        </div>
        <div className="details-container">
          <div>Secondary Address</div>
          <div>Sanepa-02,Lalitpur</div>
        </div>

      </div>

    </>
  )
}

export default Profile