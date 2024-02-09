import { useEffect } from "react"
import  "./dashboard.css"
import { useState } from "react"
import axios from "axios";
const Dashboard = () => {
    const [roleCount, setRoleCount] = useState();
    useEffect(()=>{
        const fetchRoleCount = async () =>{
            await axios.get("http://localhost:8080/api/users/count",{
                withCredentials: true,
            }).then((response)=>{
                // console.log
                setRoleCount(response.data.data);
            }).catch((error)=>{
                console.log(error)
            })
        }
        fetchRoleCount();
    },[])
    return (
        <>
            <div className="countContainer">
                {
                    roleCount?.map((role)=>{
                        return <div className="count">
                        <h3>No of {role.role}</h3>
                        <h1>{role.no_of_user}</h1>
                    </div>
                    })
                }
                
                
            </div>
            <h1>Graph for student perfomance in exam overall coming soon ...</h1>
        </>
    )
}

export default Dashboard