import axios from "axios";

export const getnginxReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_NGINX_PROD}/api/annual_report/?year=${year}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Calls /annural_report/ endpoint to get all reports for that specific year
export const getReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/annual_report/?year=${year}`,
      { headers }
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

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/get_all_GA/`,
      { headers }
    );
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

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/get_GA_category/`,
      { headers }
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
      `${process.env.NEXT_PUBLIC_BASE_URL_PROD}/wid_5y_report/?year=${year}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

// Call /get_all_courses/ endpoint to get all courses
export const getAllCourses = async () => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/get_all_courses/`,
      { headers }
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
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/get_course_by_department/`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
