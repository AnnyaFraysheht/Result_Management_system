import React, { useState } from 'react';
import "./dashboardLayout.css"
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PiExam } from "react-icons/pi"
import { MdAnnouncement, MdDashboard, MdFlightClass, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
import NavBar from '../components/DashboardComponent/NavBar';
import { FaXmarksLines } from 'react-icons/fa6';
const TeacherDashboardLayout = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        await axios.post("http://localhost:8080/api/logout", null, {
            withCredentials: true,
        })
        localStorage.clear();
        navigate("/login");
        // console.log(resp);
    }
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li className='headdd'>Teacher Dashboard</li>
                    <NavLink className='link' to={"/teacher/dashboard"}>

                        <li className='li'><MdDashboard className='icons'/><span className="sidemenu">Dashboard</span> </li>
                    </NavLink>
                    <NavLink className='link' to={"exam"}>
                        <li className='li'><PiExam className='icons'/> <span className="sidemenu">Exam</span></li>

                    </NavLink>
                    <NavLink className='link' to={"class"}>
                        <li className='li'><MdFlightClass className='icons'/> <span className="sidemenu">Class</span></li>

                    </NavLink>
                    <NavLink className='link' to={"mark"}>
                        <li className='li'><FaXmarksLines className='icons'/> <span className="sidemenu">Marks</span></li>

                    </NavLink>
                    <NavLink className='link' to={"notice"}>
                        <li className='li'><MdAnnouncement className='icons'/> <span className="sidemenu">Notice</span></li>

                    </NavLink>
                    <NavLink className='link' to={"complains"}>
                        <li className='li'><MdReportProblem className='icons'/> <span className="sidemenu">Complains</span></li>

                    </NavLink>
                </ul>
                <button className='dashboardButton btn' onClick={handleLogout}><MdLogout className='icons'/> <span className="sidemenu">Logout</span></button>
            </aside>
            <div className='content'>
                <NavBar  />
                <div className='outlet'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboardLayout