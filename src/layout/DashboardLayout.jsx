import React from 'react';
import oip from "../assets/OIP.jpeg"
import "./dashboardLayout.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PiExam, PiStudent } from "react-icons/pi"
import { GiTeacher } from "react-icons/gi";
import { SiBookstack } from "react-icons/si";
import { FaSearch } from "react-icons/fa";
import { MdAnnouncement, MdDashboard, MdFlightClass, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
const DashboardLayout = () => {
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
                    <li><h1>Admin Dashboard</h1></li>
                    <Link className='link' to={"/admin"}>

                        <li><MdDashboard />Dashboard </li>
                    </Link>
                    <Link className='link' to={"students"}>

                        <li><PiStudent /> Student</li>
                    </Link>
                    <Link className='link' to={"teacher"}>
                        <li><GiTeacher /> Teacher</li>

                    </Link>
                    <Link className='link' to={"exam"}>
                        <li><PiExam /> Exam</li>

                    </Link>
                    <Link className='link' to={"class"}>
                        <li><MdFlightClass /> Class</li>

                    </Link>
                    <Link className='link' to={"subject"}>
                        <li><SiBookstack /> Subject</li>

                    </Link>
                    <Link className='link' to={"notice"}>
                        <li><MdAnnouncement /> Notice</li>

                    </Link>
                    <Link className='link' to={"complains"}>
                        <li><MdReportProblem /> Complains</li>

                    </Link>
                </ul>
                <button className='dashboardButton' onClick={handleLogout}><MdLogout /> Logout</button>
            </aside>
            <div className='content'>
                <nav>
                    <ul>
                        <li><h3>Dashboard</h3></li>
                        <li style={{display:'flex', alignItems:'center'}}><input type="text" /><FaSearch /></li>
                        <li><img className='profile' src={oip} alt="" srcset="" /></li>
                    </ul>
                </nav>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout