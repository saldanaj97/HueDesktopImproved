const express = require("express");
const Lights = require("../Controllers/lights");

const LightsRouter = express.Router();

LightsRouter.get("/lights", Lights.getLights)
  .get("/scenes", Lights.getScenes)
  .post("/power_update", Lights.changePowerStatus)
  .post("/scene_change", Lights.changeScene);

module.exports = LightsRouter;
