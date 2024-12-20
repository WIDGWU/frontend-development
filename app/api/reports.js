import axios from "axios";

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
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/get_all_GA/`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
