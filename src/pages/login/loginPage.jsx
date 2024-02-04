import "./loginPage.css"

import image from "../../assets/sms image.png"
import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OpenNotice from "../../components/OpenNotice/OpenNotice";
const LoginPage = () => {
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [loggedIn,setLoggedIn] = useState(false)
    const navigate = useNavigate();
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
        // console.log(values)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const response = await axios.post("http://localhost:8080/api/login", values, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })
            if (response.status === 200) {
                const data = response.data;
                setLoggedIn(true);
                // console.log(data.data[0].role);
                const userRole = data.data[0].role;
                // setIsAuthenticated(true);
                // setRole(userRole)
                localStorage.setItem("name",data.data[0].fname);
                localStorage.setItem("image",data.data[0].image)

                navigate(`/${userRole}`)
                // window.location.href = `/${data.data[0].role}`;
            } else {
                console.log("Login Failed");
            }
        } catch (error) {
            setEmailError("");
            setPasswordError("")
            if (error.response.data.message) {
                if (error.response.data.message === 'Wrong Credentials') {
                    setEmailError(error.response.data.message)
                } else {
                    setPasswordError(error.response.data.message)
                }
            }
            console.log(error);
        }
    }
    // const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/check-auth", { withCredentials: true });

                if (response.data.authenticated) {
                    navigate(`/${response.data.role}`);
                }
            } catch (error) {

                console.error("Error checking authentication status", error);
            }
        };
        checkAuthStatus();
        
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className={`container ${loggedIn ? 'slide-up' : ''}`}>
                <div className="logo">
                    <h1>Result Management System</h1>
                    <img src={image} alt="someimage" />
                </div>
                <div className="form">
                    <h3>LOGIN</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="input-container">

                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleInput} placeholder="Enter your email" />
                            <section>{emailError}</section>
                        </div>
                        <div className="input-container">

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleInput} placeholder="Enter your password" />
                            <section>{passwordError}</section>
                        </div>
                        <button className="loginBtn">Submit</button>
                    </form>
                    <p className="reset"><i>Contact College Admin to reset password</i> </p>
                </div>
            </div>
            <OpenNotice />
        </>
    )
}

export default LoginPage