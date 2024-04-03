import axios from "axios";

export const getAllMarksOfClassByExam = async (class_id, term) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/viewmark/?class_id=${class_id}&term=${term}`,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
