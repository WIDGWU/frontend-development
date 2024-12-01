import axios from "axios";

export const getReports = async (year) => {
  try {
    const headers = {
      "X-CSRFToken": process.env.NEXT_PUBLIC_X_CSRFToken,
      accept: "application/json",
    };
    console.log(process.env.NEXT_PUBLIC_BASE_URL_LOCAL);
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/annual_report/?year=${year}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
