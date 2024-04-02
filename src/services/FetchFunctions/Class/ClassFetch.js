import axios from "axios";

export const getClassAssignedToTeacher = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/classbyteacher", {
      withCredentials: true,
    });
    console.log(response.data)
    return response.data.data;
  } catch (error) {
    console.log(error)
  }
};
