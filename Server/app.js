require("dotenv").config();

// Express
const express = require("express");
const app = express();

// Port
const port = process.env.PORT || 3000;

// Files
const lights = require("./Routes/lights");

// Cors
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://huedesktopimproved-production.up.railway.app"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content", "Accept", "Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/bridge", lights);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
