const express = require("express");
const Lights = require("../Controllers/bridge");

const BridgeRouter = express.Router();

// prettier-ignore
BridgeRouter
  .get('/data', Lights.getBridgeUserData)
  .get("/lights", Lights.getLights)
  .get("/scenes", Lights.getScenes)
  .post("/power_update", Lights.changePowerStatus)
  .post("/scene_change", Lights.changeScene);

module.exports = BridgeRouter;
