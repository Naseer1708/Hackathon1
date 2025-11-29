import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import screenshot from "./assets/screenshot.png";

function HomePage() {
  return (
    <div style={{ backgroundColor: "rgba(196, 224, 237, 1)", minHeight: "100vh", textAlign: "center" }}>
      <div style={{ paddingTop: "30px" }}>
        <img src={logo} alt="Edu Analytics Logo" style={{ width: "200px", height: "auto", borderRadius: "10px" }} />
        <h1 style={{ color: "rgba(2, 52, 75, 1)" }}>Edu Analytics</h1>
        <h2 style={{ color: "rgb(2, 42, 61)" }}>Student Performance Analytics & Reporting System</h2>
      </div>

      <div style={{ maxWidth: "700px", margin: "20px auto" }}>
        <p style={{ color: "rgb(2, 42, 61)", fontSize: "17px" }}>
          Empowering educators and students with comprehensive analytics to track progress,
          improve performance, and achieve academic excellence.
        </p>
        <p style={{ color: "rgb(2, 42, 61)", fontSize: "17px" }}>
          Welcome to Edu Analytics, your go-to platform for analyzing and reporting student performance data.
        </p>
        <img src={screenshot} alt="Edu Analytics Screenshot" style={{ width: "85%", borderRadius: "12px", marginTop: "20px" }} />
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "20px", justifyContent: "center" }}>
  <div className="button">
    <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>👤 Login As Admin</Link>
  </div>
  <div className="button" style={{ backgroundColor: "#1c7ed6" }}>
    <Link to="/student" style={{ textDecoration: "none", color: "inherit" }}>👤 Login As Student</Link>
  </div>
</div>

    </div>
  );
}

const buttonStyle = {
  display: "inline-block",
  padding: "12px 24px",
  margin: "10px",
  color: "white",
  backgroundColor: "rgb(2, 42, 61)",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
}; 

export default HomePage;
