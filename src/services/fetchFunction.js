import axios from "axios";
import { toast } from "react-toastify";

export const getNotices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/notice", {
      withCredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getNoticeById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/notice/${id}`, {
      withCredentials: true,
    });
    console.log("response of getNotice by ID", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getClassNotice = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/classnotice", {
      withCredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
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

export const getClassById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/class/${id}`, {
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
export const getMarksOfClassByExam = async (class_id, exam_id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/studentMark`, {
      params: { class_id: class_id, exam_id: exam_id },
      withCredentials: true,
    });
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getExamForTeacher = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/examforteacher`,
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
export const getExamByClass = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/exambyclass/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getExamById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/exam/${id}`, {
      withCredentials: true,
    });
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjects = async (id) => {
  try {
    if(id){
      const response = await axios.get(`http://localhost:8080/api/subject/?class_id=${id}`, {
        withCredentials: true,
      });
      // console.log(response.data.data)
      return response.data.data;
      
    }else{
      
      const response = await axios.get("http://localhost:8080/api/subject", {
        withCredentials: true,
      });
      // console.log(response.data.data)
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectsByClassId = async (class_id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/subjectbyclass/${class_id}`,
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
export const getSubjectsById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/subject/${id}`,
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
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/students/${id}`,
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
export const getAdminById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/admin/${id}`, {
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
export const getTeacherById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/teachers/${id}`,
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
export const getSectionByClass = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/sectionbyclass/${id}`,
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
export const getSectionByID = async (id) => {
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
    await axios
      .delete(`http://localhost:8080/api/users/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      });
  } catch (error) {
    if (error.response.data.code === "1434") {
      toast.error("You are the last here ! Dont vanish yourself");
    }
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

    toast.warning("Subject Deleted Successfully");
  } catch (error) {
    if (error.response.data.error.sqlState === "23000") {
      toast.error("This subject cannot be deleted");
    }
    return error;
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
