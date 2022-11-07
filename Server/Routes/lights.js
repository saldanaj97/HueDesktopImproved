const express = require("express");
const Lights = require("../Controllers/lights");

const LightsRouter = express.Router();

LightsRouter.get("/mylights", Lights.getLights); //.get("/userlights", Lights.getLights);

module.exports = LightsRouter;
