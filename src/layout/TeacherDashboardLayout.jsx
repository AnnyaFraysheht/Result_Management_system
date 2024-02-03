import React, { useState } from 'react';
import "./dashboardLayout.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { PiExam } from "react-icons/pi"
import { MdAnnouncement, MdDashboard, MdFlightClass, MdLogout, MdReportProblem } from "react-icons/md";
import axios from 'axios';
import NavBar from '../components/DashboardComponent/NavBar';
const TeacherDashboardLayout = (user) => {
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
                    <li><h1 className='headdd'>Teacher Dashboard</h1></li>
                    <Link className='link' to={"/teacher"}>

                        <li className='li'><MdDashboard />Dashboard </li>
                    </Link>
                    <Link className='link' to={"exam"}>
                        <li className='li'><PiExam /> Exam</li>

                    </Link>
                    <Link className='link' to={"class"}>
                        <li className='li'><MdFlightClass /> Class</li>

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

export default TeacherDashboardLayout