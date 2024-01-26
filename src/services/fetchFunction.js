import axios from "axios";

export const getNotices = async () => {
    const response = await axios.get("http://localhost:8080/api/notice", {
        withCredentials: true,
    })
    console.log(response.data.data)
    return response.data.data;
}

export const getClass = async () => {

    try {
        const response = await axios.get("http://localhost:8080/api/class", {
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}

export const getStudents = async () =>{
    try {
        const response = await axios.get("http://localhost:8080/api/students",{
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}
export const getSectionByClass = async (id) =>{
    try {
        const response = await axios.get(`http://localhost:8080/api/section/${id}`,{
            withCredentials: true,
        })
        // console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}