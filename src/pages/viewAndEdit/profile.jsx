import React, {  useEffect, useState } from 'react'
import oip from "../../assets/OIP.jpeg";
import "./profile.css";
import { FaEdit } from 'react-icons/fa';
import { getMyDetails } from '../../services/fetchFunction';
import axios from 'axios';
import { LuUploadCloud } from "react-icons/lu"
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState();
  const [flag, setFlag] = useState(false);
  const [error,setError] = useState("")
  const [password, setPassword] = useState({
    currentPassword : '',
    newPassword : '',
    confirmPassword: '',
  })
  const handlePassChange = (e) =>{
    setPassword(prev => ({...prev,[e.target.name]: e.target.value}))
    console.log(password)
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(password.newPassword !== password.confirmPassword){
      setError("Passsword Doesnot Match")
      return;
    }
    await axios.post("http://localhost:8080/api/changepassword",password,{
      withCredentials: true,
    }).then((response)=>{
      // console.log(response)
      navigate("/login")
    }).catch((error)=>{
      console.log(error)
      setError(error.response.data.message)
    })
  }
  const [changePasswordFlag, setChangePasswordFlag] = useState(false);
  const [file, setFile] = useState()
  const fetchUserData = async () => {
    const user = await getMyDetails();
    // console.log("user",user);
    localStorage.setItem("image",user.image)
    setUserData(user);
  }
  const handleChange = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0]);

  }
  const handleUpload =  () => {
    if (!file) {
      console.log("Select File");
      return;
    }
    const fd = new FormData();
    fd.append('image', file);
    axios.post("http://localhost:8080/api/changeprofile", fd, {
      withCredentials: true,
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      alert(error.response.data.error)
    }).finally(() => {
      setFlag(false);
      fetchUserData();
    })


  }
  useEffect(() => {
    fetchUserData();
  },[])
  return (
    <div className='profileparent'>
      {
        flag ? <div className={`change_profile ${flag ? "show" : ''}`}>
          <input onChange={handleChange} className='change_pic' type="file" name="image" id="change_picture" />
          <h1>Change Picture</h1>
          <label className='uploadLabel' htmlFor="change_picture">
            <div className='input'>
              <LuUploadCloud size={50} color='green' style={{ margin: 'auto' }} />
              <p>{file?.name}</p>
            </div>
          </label>
          <button className='submit' onClick={handleUpload}>Upload</button>
          <button className='cancel' onClick={() => setFlag(false)}>Cancel</button>
        </div> : ""
      }
      {
        changePasswordFlag ? <form onSubmit={handleSubmit}> <div className={`change_password ${changePasswordFlag ? "show" : ''}`}>
          <h1>Change Password</h1>
          <div className='passFormDiv'>
          <label htmlFor="oldPwd" className='passLabel'>
            Old Password
          </label>
          <input onChange={handlePassChange} type="password" name="currentPassword" id="oldPwd" />

          </div>
          <div className='passFormDiv'>
          <label className='passLabel' htmlFor="newpwd">
            New Password
          </label>
          <input onChange={handlePassChange} type="password" name="newPassword" id="newpwd" />

          </div>
          <div className='passFormDiv'>
          <label className='passLabel' htmlFor="cpwd">
            Confirm Password
          </label>
          <input onChange={handlePassChange} type="password" name="confirmPassword" id="cpwd" />
          <span  style={{color: 'red'}}>{error}</span>
          </div>
          <div className="buttons">

          <input type='submit' className='submit'/>
          <button className='cancel' onClick={() => setChangePasswordFlag(false)}>Cancel</button>
          </div>
        </div> </form>: ""
      }
      <div className="image_section">
        <div onClick={(e) => setFlag(true)} className='image_edit_icon'>
          <FaEdit className='icon' size={50} color='green' />
        </div>
        <img className='profile_picture' src={userData?.image ? `http://localhost:8080/api/images/${userData.image}` : oip} alt="" srcSet="" />

      </div>
      <div className='general_info'>
        <div>
          <h1>Personal Information</h1>

        </div>
        <div className="details-container">
          <div>Name:</div>
          <div>{userData?.fname}  {userData?.name}  {userData?.lname}</div>

        </div>
        <div className="details-container">
          <div>DOB:</div>
          <div>{userData?.dob}</div>

        </div>
        <div className="details-container">
          <div>Gender</div>
          <div>{userData?.gender === 'M' ? "Male" : userData?.gender === 'F' ? "Female" : "Other"}</div>
        </div>
        <div className="details-container">
          <div>Email</div>
          <div>{userData?.email}</div>

        </div>
        <div className="details-container">
          <div>Primary Contact</div>
          <div>{userData?.contacts[0]}</div>
        </div>
        <div className="details-container">
          <div>Secondary Contact</div>
          <div>{userData?.contacts[1]}</div>
        </div>
        <div className="details-container">
          <div>Permanent Address</div>
          <div>{userData?.permanent_address}</div>
        </div>
        <div className="details-container">
          <div>Secondary Address</div>
          <div>{userData?.temp_address}</div>
        </div>

      </div>
      <button  onClick={() => setChangePasswordFlag(true)} className='change-password btn'>Change Password</button>

    </div>
  )
}

export default Profile