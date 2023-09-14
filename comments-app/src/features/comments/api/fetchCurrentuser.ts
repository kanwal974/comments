import axios from "axios";
import { BASE_URL } from "../../../common";

export const fetchCurrentuser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/currentUser`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};
