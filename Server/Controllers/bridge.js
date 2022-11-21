const v3 = require("node-hue-api").v3,
  discovery = v3.discovery,
  hueApi = v3.api;
const axios = require("axios");
const fs = require("fs");
const appName = "improved-hue-ui-api";
const deviceName = "dev";

async function discoverBridge() {
  // We use upnp search but in the code, upnp is defined to use mdns since upnp is deprecated
  const discoveryResults = await discovery.upnpSearch(1000);
  if (discoveryResults.length === 0) {
    console.error("Failed to resolve any Hue Bridges");
  }
  // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
  return discoveryResults[0].ipaddress;
}

// Function that will be used to generate bridge login data for a user with no credentials
async function getBridgeUserData() {
  // Get and set the IP address of the users bridge
  const ipAddress = await discoverBridge();

  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const unauthenticatedApi = await hueApi.createLocal(ipAddress).connect();

  try {
    // Create new user data
    let user = await unauthenticatedApi.users.createUser(appName, deviceName);
    console.log(user);

    // Return the user obj containing the data to communicate with bridge successfully
    return { success: true, user, ipAddress };
  } catch (err) {
    console.error(`Error while trying to create and/or read user bridge login info: ${err.message}`);
  }
}

const getLights = async (req, res) => {
  console.log(req.body);
  try {
    /*     // Create a new API instance that is authenticated with the new user we created
    const authenticatedApi = await getBridgeUserData();

    // Get all of the lights connected to the hue bridge
    const lights = await authenticatedApi.lights.getAll(); */

    const { success, userLights } = await axios
      .get(`http://${req.body["bridge-ip"]}/clip/v2/resource/device`, {
        headers: { "hue-application-key": localStorage.getItem("username"), "Access-Control-Allow-Origin": "*" },
      })
      .then((response) => response.data);

    console.log(userLights);

    // Handle finding each light and gathering the required data
    let retrievedLights = [];
    userLights.forEach((light) => {
      let lightInfo = new Object();
      (lightInfo.id = light["data"]["id"]),
        (lightInfo.name = light["data"]["name"]),
        (lightInfo.productname = light["data"]["productname"]),
        (lightInfo.lightState = light["data"]["state"]);
      retrievedLights.push(lightInfo);
    });

    // Return the user light data
    res.send({ success: true, retrievedLights });
  } catch (error) {
    console.error(error.message);
    res.send({ success: false, error: `Error while gathering light info: '${error.message}'` });
  }
};

const getScenes = async (req, res) => {
  try {
    // See 'authenticatedApi' from getLights function)
    const authenticatedApi = await getBridgeUserData();

    // Get all of the scenes on the users bridge
    const scenes = await authenticatedApi.scenes.getAll();

    // Save all the important data we need
    const userScenes = [];
    scenes.forEach((scene) => {
      sceneInfo = new Object();
      sceneInfo.id = scene["data"]["id"];
      sceneInfo.type = scene["data"]["type"];
      sceneInfo.name = scene["data"]["name"];
      sceneInfo.group = scene["data"]["group"];
      sceneInfo.lights = scene["data"]["lights"];
      userScenes.push(sceneInfo);
    });

    // Send a response with the data
    res.send({ success: true, userScenes });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const changePowerStatus = async (req, res) => {
  try {
    let powerStatusUpdated = await axios.put(`http://192.168.1.150/api/E25AJHybDN2zoMvSjdzMDs6lun6uxIgybgT9TwiF/lights/${req.body.id}/state`, {
      on: !req.body.lightState.on,
    });

    // Send a response with the data
    res.send({ success: true, message: powerStatusUpdated.data });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

const changeScene = async (req, res) => {
  try {
    // See 'authenticatedApi' from getLights function)
    const authenticatedApi = await getBridgeUserData();

    // Send req to change the current scene
    const sceneUpdated = authenticatedApi.scenes.activateScene(req.body.id);

    // Send a response with the data
    res.send({ success: true, sceneUpdated });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = { getBridgeUserData, getLights, getScenes, changePowerStatus, changeScene };
