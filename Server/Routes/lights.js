const express = require("express");
const Lights = require("../Controllers/lights");

const LightsRouter = express.Router();

LightsRouter.get("/lights", Lights.getLights).get("/scenes", Lights.getScenes).post("/update", Lights.setScene);

module.exports = LightsRouter;
