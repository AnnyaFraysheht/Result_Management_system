import React, { useState } from 'react';
import "./dashboardLayout.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {  PiStudent } from "react-icons/pi"
import { MdAnnouncement, MdDashboard, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
import NavBar from '../components/DashboardComponent/NavBar';
const StudentDashboardLayout = (user) => {
    const [userData, setUserData] = useState(user.user);

    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.post("http://localhost:8080/api/logout", null, {
            withCredentials: true,
        })
        navigate("/login");
        // console.log(resp);
    }
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li><h1 className='headdd'>Student Dashboard</h1></li>
                    <Link className='link' to={"/student"}>

                        <li className='li'><MdDashboard />Dashboard </li>
                    </Link>
                    <Link className='link' to={"result"}>

                        <li className='li'><PiStudent /> Result</li>
                    </Link>
                    <Link className='link' to={"notice"}>
                        <li className='li'><MdAnnouncement /> Notice</li>

                    </Link>
                    <Link className='link' to={"complains"}>
                        <li className='li'><MdReportProblem /> Complains</li>

                    </Link>
                </ul>
                <button className='dashboardButton' onClick={handleLogout}><MdLogout /> Logout</button>
            </aside>
            <div className='content'>
            <NavBar userData={userData} />
                <div className='outlet'>

                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default StudentDashboardLayout