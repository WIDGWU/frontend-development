import axios from "axios";
// For production
const baseURL = process.env.NEXT_PUBLIC_BASE_NGINX_PROD;
// For local development
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL_LOCAL;

// Calls /annual_report/ endpoint to get all reports for that specific year
export const getReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}annual_report/?year=${year}`,
      {
        headers,
      }
    );

    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /annual_report/ endpoint to get all reports for that specific year
export const getReportsByTerm = async (term) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}report_by_term/?term=${term}`,
      {
        headers,
      }
    );

    // console.log("Term Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /get_all_GA/ endpoint to get all GA details
export const getGADetails = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}get_all_GA/`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /get_collective_GA for collective GA details
export const getCollectiveGADetails = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}get_collective_GA/`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /get_GA_category/ endpoint to get specific parameter GA details
export const getGACategoryDetails = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}get_GA_category/`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getCollectiveFilteredGA = async (selectedCourseTerm) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_collective_GA/?course_term=${selectedCourseTerm}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /wid_5y_report/ endpoint to get all reports for that specific year
export const getFiveYearReport = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}wid_5y_report/?year=${year}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// get_all_courses
export const getAllCourses = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}get_all_courses/`, {
      headers,
    });
    console.log("All Courses:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Courses category
export const getCourseCategory = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_course_categories/`,
      {
        headers,
      }
    );
    console.log("Course Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Call /get_all_courses/ endpoint to get all courses
export const getAllCoursesHistory = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_all_courses_history/`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Cals get_course_history_by_id endpoint to get course history by id
export const getCourseApprovalById = async (course_id) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    // console.log("This function is called");
    const response = await axios.get(
      `${baseURL}get_course_history_by_id/`,
      {
        headers,
        params: { course_id },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Call update_course_approvals/ endpoint to update course approvals
export const updateCourseApprovals = async (data) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.put(
      `${baseURL}update_course_approvals/`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course approvals:", error);
    throw error;
  }
};

// Call /get_course_by_department/ endpoint to get all courses by department
export const getCourseByDepartment = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_course_number_by_department/`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// call get_course_count_by_department endpoint to get course count by department
export const getDepartmentInfo = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}get_department_info/`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Call /get_each_department_statistics/ endpoint to get each department statistics
export const getEachDepartmentStatistics = async (department) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_each_department_statistics/`,
      {
        headers,
        params: { department },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// post add_graduate_assistant/ endpoint to add graduate assistant
export const addGraduateAssistant = async (data) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.post(
      `${baseURL}add_graduate_assistant/`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding graduate assistant:", error);
    throw error;
  }
};

// post /add_course_approvals/ endpoint to add course approvals
export const addCourseApprovals = async (data) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.post(
      `${baseURL}add_course_approvals/`,
      data,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding course approvals:", error);
    throw error;
  }
};

// delete /delete_graduate_assistant/ endpoint to delete graduate assistant
export const deleteGraduateAssistant = async (data) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.delete(
      `${baseURL}delete_graduate_assistant/`,
      {
        headers,
        data,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting graduate assistant:", error);
    throw error;
  }
};

// Call upload_courses/ to upload excel file
export const uploadCourses = async (formData) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };  

    const response = await axios.post(
      `${baseURL}upload_courses/`,
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading courses:", error);
    throw error;
  }
};
