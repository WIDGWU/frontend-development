import axios from "axios";

// Calls /annural_report/ endpoint to get all reports for that specific year
export const getReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": secrets.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    console.log("Showing env variables", secrets.NEXT_PUBLIC_BASE_URL_PROD);
    console.log("Showing env variables", process.env.NEXT_PUBLIC_BASE_URL_PROD);

    const response = await axios.get(
      `${secrets.NEXT_PUBLIC_BASE_URL_PROD}/annual_report/?year=${year}`,
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
      "X-CSRFToken": secrets.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${secrets.NEXT_PUBLIC_BASE_URL_PROD}/get_all_GA/`,
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
      "X-CSRFToken": secrets.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${secrets.NEXT_PUBLIC_BASE_URL_PROD}/get_GA_category/`,
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
      "X-CSRFToken": secrets.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };

    const response = await axios.get(
      `${secrets.NEXT_PUBLIC_BASE_URL_PROD}/wid_5y_report/?year=${year}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
