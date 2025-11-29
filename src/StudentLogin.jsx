import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function StudentLogin({ students, setCurrentStudentId }) {
  const navigate = useNavigate();

  // simple numeric captcha state
  const [captchaValue, setCaptchaValue] = useState(
    Math.floor(10000 + Math.random() * 90000).toString()
  );
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const refreshCaptcha = () => {
    setCaptchaValue(Math.floor(10000 + Math.random() * 90000).toString());
    setCaptchaInput("");
    setCaptchaError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const enteredId = formData.get("studentId").trim();
    const password = formData.get("password");

    if (!enteredId) return;

    // Captcha validation
    if (captchaInput !== captchaValue) {
      setCaptchaError("Captcha does not match. Please try again.");
      refreshCaptcha();
      return;
    }

    // Find student created/updated via Manage Marks
    const found = students.find((s) => s.id === enteredId);

    if (!found) {
      alert("Invalid Student ID. Please contact your teacher/admin.");
      return;
    }

    // TODO: add real password check if you store passwords
    console.log("Student login:", enteredId, "password:", password);

    setCurrentStudentId(found.id);
    navigate("/dashboard");
  };

  return (
    <div className="page-container">
      <div className="login-box">
        <div className="h2">
          <h2 className="login-header">Student Login</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="inner-box">
            <h3 className="input-label">
              Student ID:{" "}
              <input
                type="text"
                name="studentId"
                placeholder="Use ID given by teacher"
                required
                className="input-field"
              />
            </h3>
          </div>

          <div className="inner-box">
            <h3 className="input-label">
              Password:{" "}
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="input-field"
              />
            </h3>
          </div>

          {/* Captcha section */}
          <div className="inner-box">
            <h3 className="input-label">
              Captcha:
              <div className="captcha-row">
                <span className="captcha-box">{captchaValue}</span>
                <button
                  type="button"
                  className="captcha-refresh"
                  onClick={refreshCaptcha}
                >
                  ↻
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter the code shown above"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className="input-field"
              />
              {captchaError && (
                <span className="error-text">{captchaError}</span>
              )}
            </h3>
          </div>

          <div className="submit">
            <input type="submit" value="Login" className="submit-button" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
