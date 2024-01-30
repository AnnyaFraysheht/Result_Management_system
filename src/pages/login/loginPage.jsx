import "./loginPage.css"

import image from "../../assets/sms image.png"
import {  useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LoginPage = ({onLogin}) => {
    const [notices, setNotices] = useState();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
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
                // console.log(data.data[0].role);
                const userRole = data.data[0].role;
                // setIsAuthenticated(true);
                // setRole(userRole)
                onLogin(data.data[0])
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
        const fetchOpenNotice = async () => {
            const response = await fetch("http://localhost:8080/api/opennotice")
            const data = await response.json();
            setNotices(data.data);
        }
        fetchOpenNotice();
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className="container">
                <div className="logo">
                    <h1>Result Management System</h1>
                    <img src={image} alt="someimage" />
                </div>
                <div className="form">
                    <h3>LOGIN</h3>
                    <form onSubmit={handleSubmit}>
                        <div>

                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleInput} placeholder="Enter your email" />
                            <section>{emailError}</section>
                        </div>
                        <div>

                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleInput} placeholder="Enter your password" />
                            <section>{passwordError}</section>
                        </div>
                        <button>Submit</button>
                    </form>
                    <p className="reset"><i>Contact College Admin to reset password</i> </p>
                </div>
            </div>
            <div className="notice">
                <div className="heading"><h1>Notice</h1></div>
                <div className="notices">
                    {
                        notices?.map((notice) => {
                            return <div key={notice.notice_id} className="eachNotice">
                                <div className="date"><h2>{notice.date_posted.slice(0, 10)}</h2></div>
                                <div className="details"><h2>{notice.notice_text}</h2></div>
                            </div>
                        })
                    }

                </div>
            </div>
        </>
    )
}

export default LoginPage