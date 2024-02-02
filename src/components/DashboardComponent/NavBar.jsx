import React from 'react'
import oip from "../../assets/OIP.jpeg"
import { Link } from 'react-router-dom'

const NavBar = ({userData}) => {
    return (
        <nav>
            <ul>
                <li><h3>{`Hello ${userData?.fname}`}</h3></li>
                <li><Link to={`profile`} > <img className='profile' src={userData?.image ? `http://localhost:8080/api/images/${userData.image}` : oip} alt="Your image here" /></Link></li>
            </ul>
        </nav>
    )
}

export default NavBar