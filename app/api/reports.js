import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_NGINX_PROD;
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL_PROD;
// const baseURL = process.env.NEXT_PUBLIC_BASE_URL_LOCAL;

// Calls /annural_report/ endpoint to get all reports for that specific year
export const getReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}/api/annual_report/?year=${year}`,
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

// Calls /get_all_GA/ endpoint to get all GA details
export const getGADetails = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(`${baseURL}/api/get_all_GA/`, { headers });
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

    const response = await axios.get(`${baseURL}/api/get_GA_category/`, {
      headers,
    });
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
      `${baseURL}/api/wid_5y_report/?year=${year}`,
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

    const response = await axios.get(`${baseURL}/api/get_all_courses/`, {
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

    const response = await axios.get(
      `${baseURL}/api/get_all_courses_history/`,
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

// Call /get_course_by_department/ endpoint to get all courses by department
export const getCourseByDepartment = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${baseURL}/api/get_course_by_department/`,
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
