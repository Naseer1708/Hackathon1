import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { StudentDataProvider } from "./StudentDataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentDataProvider>
      <App />
    </StudentDataProvider>
  </React.StrictMode>
);
