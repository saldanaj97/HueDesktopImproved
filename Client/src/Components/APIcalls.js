import axios from "axios";

const BRIDGE_API_URL = process.env.REACT_APP_BRIDGE_URL || "http://localhost:3001/bridge";

/************************************/
/************* GETTERS *************/
/************************************/

// API call to get user authorization to access their bridge and lights
export const getAccessToHueRemoteAPI = async () => {
  try {
    const { data } = await axios.get(BRIDGE_API_URL + "/data").then((response) => response);
    return { success: true, redirectUrl: data };
  } catch (error) {
    return { success: false, message: "Failed to get new login data.", error };
  }
};

// API call to get the users lights
export const getLights = async () => {
  const { success, userLights } = await axios
    .get(BRIDGE_API_URL + "/lights", { "hue-application-key": localStorage.getItem("username"), "bridge-ip": localStorage.getItem("ipaddress") })
    .then((response) => response.data);
  return { success, userLights };
};

// API call to get the users scenes
export const getScenes = async () => {
  const { success, userScenes } = await axios.get(BRIDGE_API_URL + "/scenes").then((response) => response.data);
  return { success, userScenes };
};

// API call to assign bridge login data to a new user
export const getNewLoginData = async () => {
  try {
    const { data } = await axios.get(BRIDGE_API_URL + "/data").then((response) => response);
    return { success: true, redirectUrl: data };
  } catch (error) {
    return { success: false, message: "Failed to get new login data.", error };
  }
};

/************************************/
/************* SETTERS *************/
/************************************/

// Function to change the state of a light
export const setNewLight = async (id, lightState) => {
  const response = await axios.post(BRIDGE_API_URL + "/power_update", { id: id, lightState: lightState });
  return response;
};

// Function to carry out the changing of a scene
export const setNewScene = async (id) => {
  const { success } = await axios.post(BRIDGE_API_URL + "/scene_change", { id: id }).then((response) => response.data);
  return success;
};
