import axios from "axios";

const BRIDGE_API_URL = process.env.REACT_APP_LIGHTS_API_URL || "http://localhost:3001/bridge";

// API call to get the users lights
export const getLights = async () => {
  const { success, userLights } = await axios.get(BRIDGE_API_URL + "/lights").then((response) => response.data);
  return { success, userLights };
};

// API call to get the users scenes
export const getScenes = async () => {
  const { success, userScenes } = await axios.get(BRIDGE_API_URL + "/scenes").then((response) => response.data);
  return { success, userScenes };
};
