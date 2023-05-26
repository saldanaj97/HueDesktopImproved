const express = require("express");
const Bridge = require("../Controllers/bridge");

const BridgeRouter = express.Router();

BridgeRouter.get("/data", Bridge.discoverBridge)
  .get("/lights", Bridge.getLights)
  .get("/scenes", Bridge.getScenes)
  .post("/power_update", Bridge.changePowerStatus)
  .post("/scene_change", Bridge.changeScene);

module.exports = BridgeRouter;
