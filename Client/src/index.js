import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Theme
export const theme = {
  mainColors: {
    900: "#5e5e5e",
    800: "#787878",
    700: "#8ccab2",
    600: "#80a388",
    500: "#a2e6e6",
  },
};

root.render(<App />);
