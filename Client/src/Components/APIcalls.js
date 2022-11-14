import axios from "axios";

const BRIDGE_API_URL = process.env.REACT_APP_BRIDGE_URL || "http://localhost:3001/bridge";

/************************************/
/************* GETTERS *************/
/************************************/

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
