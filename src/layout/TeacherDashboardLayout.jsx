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
import NavBar from '../components/DashboardComponent/NavBar';
const TeacherDashboardLayout = ({userData}) => {
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
                    <li><h1>
                        Teacher Dashboard</h1></li>
                    <Link className='link' to={"/admin"}>

                        <li><MdDashboard />Dashboard </li>
                    </Link>
                    <Link className='link' to={"exam"}>
                        <li><PiExam /> Exam</li>

                    </Link>
                    <Link className='link' to={"class"}>
                        <li><MdFlightClass /> Class</li>

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
            <NavBar userData={userData} />
                <div className='outlet'>

                <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TeacherDashboardLayout