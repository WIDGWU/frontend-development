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

    const response = await axios.get(`${baseURL}annual_report/?year=${year}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getCourseReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}annual_course_report/?year=${year}`,
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

export const deleteRecordsByTermCode = async (termCode) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.delete(
      `${baseURL}delete_term/?term_code=${termCode}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting term records:", error);
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

    const response = await axios.get(`${baseURL}report_by_term/?term=${term}`, {
      headers,
    });

    console.log("Term Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /get_all_GA/ endpoint to get all GA details (paginated + searchable + filterable)
export const getGADetails = async (
  page = 1,
  pageSize = 50,
  search = "",
  filters = {}
) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const params = {
      page,
      page_size: pageSize,
      ...(search ? { search } : {}),
      ...(filters.ga_type ? { ga_type: filters.ga_type } : {}),
      ...(filters.home_school ? { home_school: filters.home_school } : {}),
      ...(filters.home_dept ? { home_dept: filters.home_dept } : {}),
      ...(filters.course_term_code
        ? { course_term_code: filters.course_term_code }
        : {}),
      ...(filters.course_prefix
        ? { course_prefix: filters.course_prefix }
        : {}),
    };

    const response = await axios.get(`${baseURL}get_all_GA/`, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export const getGACount = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_annual_ga_count/?year=${year}`,
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

export const getGAReport = async (year, type) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}annual_ga_report/?year=${year}&type=${type}`,
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

export const getGAStudentsServed = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}get_annual_students_served/?year=${year}`,
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

// Calls /get_collective_GA for collective GA details (paginated + searchable + filterable)
export const getCollectiveGADetails = async (
  page = 1,
  pageSize = 50,
  search = "",
  filters = {}
) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const params = {
      page,
      page_size: pageSize,
      ...(search ? { search } : {}),
      ...(filters.ga_type ? { ga_type: filters.ga_type } : {}),
      ...(filters.course_term_code
        ? { course_term_code: filters.course_term_code }
        : {}),
    };

    const response = await axios.get(`${baseURL}get_collective_GA/`, {
      headers,
      params,
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

    const response = await axios.get(`${baseURL}wid_5y_report/?year=${year}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// get_all_courses (paginated + searchable + filterable)
export const getAllCourses = async (
  page = 1,
  pageSize = 50,
  search = "",
  filters = {}
) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const params = {
      page,
      page_size: pageSize,
      ...(search ? { search } : {}),
      ...(filters.course_term_code
        ? { course_term_code: filters.course_term_code }
        : {}),
      ...(filters.course_college_desc
        ? { course_college_desc: filters.course_college_desc }
        : {}),
      ...(filters.course_prefix
        ? { course_prefix: filters.course_prefix }
        : {}),
      ...(filters.instructor_full_name
        ? { instructor_full_name: filters.instructor_full_name }
        : {}),
    };

    const response = await axios.get(`${baseURL}get_all_courses/`, {
      headers,
      params,
    });
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

    const response = await axios.get(`${baseURL}get_course_categories/`, {
      headers,
    });
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

    const response = await axios.get(`${baseURL}get_all_courses_history/`, {
      headers,
    });
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

    console.log("This function is called");
    const response = await axios.get(`${baseURL}get_course_history_by_id/`, {
      headers,
      params: { course_id },
    });
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

    const response = await axios.post(`${baseURL}add_course_approvals/`, data, {
      headers,
    });
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

    const response = await axios.post(`${baseURL}upload_courses/`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading courses:", error);
    throw error;
  }
};
