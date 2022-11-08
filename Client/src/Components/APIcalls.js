import axios from "axios";

const API_URL = process.env.REACT_APP_LIGHTS_API_URL || "http://localhost:3001";

// API call to get the users lights
export const getLights = async () => {
  const { success, userLights } = await axios.get(API_URL + "/bridge/lights").then((response) => response.data);
  return { success, userLights };
};
