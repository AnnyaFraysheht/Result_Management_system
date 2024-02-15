import axios from "axios";

export const getNotices = async () => {
  const response = await axios.get("http://localhost:8080/api/notice", {
    withCredentials: true,
  });
  console.log(response.data.data);
  return response.data.data;
};
export const getClassNotice = async () => {
  const response = await axios.get("http://localhost:8080/api/classnotice", {
    withCredentials: true,
  });
  console.log(response.data.data);
  return response.data.data;
};

export const getClass = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/class", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getExams = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/exam", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getMarksByClass = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/mark/${id}`, {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getExamByClass = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/exam/${id}`, {
      withCredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjects = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/subject", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectsByClassId = async (class_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/subject/${class_id}`,
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

export const getStudents = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/students", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAdmins = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/admins", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getTeachers = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/teachers", {
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSectionByClass = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/section/${id}`,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log("Error fetching sections:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    console.log("deleting user id is" + id);
    await axios.delete(`http://localhost:8080/api/users/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteClass = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/class/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteSection = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/section/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteExams = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/exam/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteSubject = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/subject/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/myprofile`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getComplains = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/complain`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const solveComplain = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/complain/${id}`,
      null,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getMyComplains = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/mycomplain`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getSubjects = async () =>{
//     try {
//         const response = await axios.get('http://localhost:8080/api/subjects')
//     } catch (error) {
//         console.log(error)
//     }
// }
