import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./css/root.css";
import "./css/container1.css";
import "./css/container2.css";
import "./css/container3.css";
import "./css/container4.css";
createRoot(document.getElementById("root")).render(<App />);
