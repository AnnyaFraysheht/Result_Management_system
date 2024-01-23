import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
        const handleLogout = async () => {
            await axios.post("http://localhost:8080/api/logout", null,{
                withCredentials: true,
            })
            navigate("/login");
            // console.log(resp);
        }
    return (
        <div>
            <button onClick={handleLogout}>Log OUt</button>
        </div>
    )
}

export default Dashboard