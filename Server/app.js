require("dotenv").config();

// Express
const express = require("express");
const app = express();

// Port
const port = process.env.PORT || 3000;

// Files
const lights = require("./Routes/lights");

// Routes
app.use("/bridge", lights);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
