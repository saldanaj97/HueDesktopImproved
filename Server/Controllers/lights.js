const v3 = require("node-hue-api").v3,
  discovery = v3.discovery,
  hueApi = v3.api;
const axios = require("axios");
const fs = require("fs");
const appName = "improved-hue-ui-api";
const deviceName = "dev";

async function discoverBridge() {
  const discoveryResults = await discovery.upnpSearch();
  if (discoveryResults.length === 0) {
    console.error("Failed to resolve any Hue Bridges");
  }
  // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
  return discoveryResults[0].ipaddress;
}

async function discoverAndCreateUser() {
  // Get the IP address of the users bridge
  const ipAddress = await discoverBridge();

  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const unauthenticatedApi = await hueApi.createLocal(ipAddress).connect();

  try {
    // Variables needed
    var userDataFile = { username: "", appkey: "" };
    let path = "./Controllers/bridgelogin.json";

    // If the file containing the user data to login to communicate with their bridge does not exist, make it
    if (!fs.existsSync(path)) {
      fs.writeFile("./Controllers/bridgelogin.json", JSON.stringify(userDataFile));
    }

    // Get the users login data from the bridge login file
    userDataFile = fs.readFileSync("./Controllers/bridgelogin.json");
    let bridgeLoginData = JSON.parse(userDataFile);

    // If there is no data in the bridgelogin.js file, create new user bridge login data and add it to the file
    if (bridgeLoginData.username == "" || bridgeLoginData.clientkey == "") {
      let user = await unauthenticatedApi.users.createUser(appName, deviceName);
      fs.writeFile("./Controllers/bridgelogin.json", JSON.stringify(user));
    }
    // Get the username from the users bridge data
    let { username } = bridgeLoginData;

    // Create a new API instance that is authenticated with the user
    const authenticatedApi = await hueApi.createLocal(ipAddress).connect(username);

    // Return the authd API instance
    return authenticatedApi;
  } catch (err) {
    console.error(`Error while trying to create and/or read user bridge login info: ${err.message}`);
  }
}

const getLights = async (req, res) => {
  try {
    // Create a new API instance that is authenticated with the new user we created
    const authenticatedApi = await discoverAndCreateUser();

    // Get all of the lights connected to the hue bridge
    const lights = await authenticatedApi.lights.getAll();

    // Handle no lights being found
    if (lights.length == 0) {
      res.send({ response: "There were no lights found for the connected Hue bridge" });
      return;
    }

    // Handle finding each light and gathering the required data
    let userLights = [];
    lights.forEach((light) => {
      let lightInfo = new Object();
      (lightInfo.id = light["data"]["id"]),
        (lightInfo.name = light["data"]["name"]),
        (lightInfo.productname = light["data"]["productname"]),
        (lightInfo.lightState = light["data"]["state"]);
      userLights.push(lightInfo);
    });

    // Return the user light data
    res.send({ success: true, userLights });
  } catch (error) {
    console.error(error.message);
    res.send({ success: false, error: `Error while gathering light info: '${error.message}'` });
  }
};

const getScenes = async (req, res) => {
  try {
    // See 'authenticatedApi' from getLights function)
    const authenticatedApi = await discoverAndCreateUser();

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
    const authenticatedApi = await discoverAndCreateUser();

    // Send req to change the current scene
    const sceneUpdated = authenticatedApi.scenes.activateScene(req.body.id);

    // Send a response with the data
    res.send({ success: true, sceneUpdated });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = { getLights, getScenes, changePowerStatus, changeScene };
