const v3 = require("node-hue-api").v3,
  discovery = v3.discovery,
  hueApi = v3.api;
const fs = require("fs");
const { off } = require("process");
const appName = "improved-hue-ui-api";
const deviceName = "dev";

async function discoverBridge() {
  const discoveryResults = await discovery.upnpSearch();
  //console.log(discoveryResults[0].ipaddress);
  if (discoveryResults.length === 0) {
    console.error("Failed to resolve any Hue Bridges");
  }
  // Ignoring that you could have more than one Hue Bridge on a network as this is unlikely in 99.9% of users situations
  return discoveryResults[0].ipaddress;
}

async function discoverAndCreateUser() {
  const ipAddress = await discoverBridge();

  // Create an unauthenticated instance of the Hue API so that we can create a new user
  const unauthenticatedApi = await hueApi.createLocal(ipAddress).connect();

  try {
    // Variables needed
    var userData = { username: "", appkey: "" };
    let path = "./Controllers/bridgelogin.json";

    // If the file containing the user data to login to communicate with their bridge does not exist, make one
    if (!fs.existsSync(path)) {
      fs.writeFile("./Controllers/bridgelogin.json", JSON.stringify(userData), function (error) {
        if (error) {
          console.log("Error creating bridgelogin.json file ", error);
        }
        console.log("Successfully crreated bridgelogin.json file. ");
      });
    } else {
      userData = fs.readFileSync("./Controllers/bridgelogin.json");
    }

    // Get the users bridge login data from the file
    let userBridgeLoginData = JSON.parse(userData);

    // If there is no data in the bridgelogin.js file, create new user bridge data and add it to the file
    if (userBridgeLoginData.username == "" || userBridgeLoginData.clientkey == "") {
      let user = await unauthenticatedApi.users.createUser(appName, deviceName);
      fs.writeFile("./Controllers/bridgelogin.json", JSON.stringify(user), function (error) {
        if (error) {
          return console.log("Error creating user bridge login data: ", error);
        }
        console.log("User bridge login data successfully created. ");
      });
    }
    // Get the username from the users bridge data
    let { username } = userBridgeLoginData;

    // Create a new API instance that is authenticated with the user
    const authenticatedApi = await hueApi.createLocal(ipAddress).connect(username);

    return authenticatedApi;
  } catch (err) {
    console.log(`Error while trying to create and/or read user bridge login info: ${err.message}`);
  }
}
discoverAndCreateUser();
