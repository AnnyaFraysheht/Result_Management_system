import React, { useEffect, useState } from 'react';
import "./dashboardLayout.css"
import { NavLink, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { PiExam, PiStudent } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import {FaXmarksLines} from "react-icons/fa6"
import { MdAnnouncement,MdAdminPanelSettings, Md6FtApart, MdDashboard, MdFlightClass, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
import NavBar from '../components/DashboardComponent/NavBar';
const DashboardLayout = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const handleLogout = async () => {
        await axios.post("http://localhost:8080/api/logout", null, {
            withCredentials: true,
        })
        localStorage.clear();
        navigate("/login");
        // console.log(resp);
    }
    useEffect(() => {
        console.log(params)
    })
    return (
        <div className='parent'>
            <aside>
                <ul>
                    <li className='headdd'>RMS</li>
                    <NavLink className={`link`} to={"dashboard"}>

                        <li className='li '><MdDashboard className='icons' /><span className="sidemenu">Dashboard</span> </li>
                    </NavLink>
                    <NavLink className={`link `} to={"admins"}>

                        <li className='li'><MdAdminPanelSettings className='icons' /> <span className="sidemenu">Admin</span></li>
                    </NavLink>
                    <NavLink className={`link `} to={"students"}>

                        <li className='li'><PiStudent className='icons' /> <span className="sidemenu">Student</span></li>
                    </NavLink>
                    <NavLink className={`link`} to={"teachers"}>
                        <li className='li'><GiTeacher className='icons' /> <span className="sidemenu">Teacher</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"exam"}>
                        <li className='li'><PiExam className='icons' /> <span className="sidemenu">Exam</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"class"}>
                        <li className='li'><MdFlightClass className='icons' /> <span className="sidemenu">Class</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"section"}>
                        <li className='li'><Md6FtApart className='icons' /> <span className="sidemenu">Section</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"subject"}>
                        <li className='li'><SiBookstack className='icons' /> <span className="sidemenu">Subject</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"mark"}>
                        <li className='li'><FaXmarksLines className='icons' /> <span className="sidemenu">Marks</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"notice"}>
                        <li className='li'><MdAnnouncement className='icons' /> <span className="sidemenu">Notice</span></li>

                    </NavLink>
                    <NavLink className={`link`} to={"complains"}>
                        <li className='li'><MdReportProblem className='icons' /> <span className="sidemenu">Complains</span></li>

                    </NavLink>
                </ul>
                <button className='btn dashboardButton' onClick={handleLogout}><MdLogout className='icons' /> <span className="sidemenu">Logout</span></button>
            </aside>
            <div className='content'>
                <NavBar />
                <div className='outlet'>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout