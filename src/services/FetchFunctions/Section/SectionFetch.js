import axios from "axios";

export const getSections = async (id, limit, offset) => {
  try {
    if (id) {
      const response = await axios.get(
        `http://localhost:8080/api/section/?class_id=${id}&limit=${limit}&offset=${offset}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data)
      return response.data.data;
    } else {
      const response = await axios.get(
        `http://localhost:8080/api/section/?limit=${limit}&offset=${offset}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.data)
      return response.data.data;
    }
  } catch (error) {
    console.log("Error fetching sections:", error);
    throw error;
  }
};
