import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { downloadDashboardPDF } from "./utils/downloadPDF";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function StudentDashboard({ student, courses }) {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("overview");

  const handleLogout = () => {
    navigate("/");
  };

  const handleDownloadPDF = () => {
    downloadDashboardPDF(student.name);
  };

  if (!student) {
    return (
      <div className="dashboard-root">
        <div className="dashboard-main">
          <p>No student selected. Please log in first.</p>
          <button
            className="action-button"
            onClick={() => navigate("/student")}
          >
            Go to Student Login
          </button>
        </div>
      </div>
    );
  }

  const totalCourses = student.courses.length;
  const avgGrade =
    totalCourses > 0
      ? (
          student.courses.reduce((sum, c) => sum + (c.grade || 0), 0) /
          totalCourses
        ).toFixed(1)
      : 0;

  const bestCourse =
    totalCourses > 0
      ? student.courses.reduce((best, c) =>
          c.grade > best.grade ? c : best
        )
      : null;

  const passCount = student.courses.filter((c) => (c.grade || 0) >= 40).length;
  const failCount = totalCourses - passCount;
  const passRate =
    totalCourses > 0 ? ((passCount / totalCourses) * 100).toFixed(0) : 0;

  // Bar chart
  const barData = {
    labels: student.courses.map((c) => c.name || c.id),
    datasets: [
      {
        label: "Marks (%)",
        data: student.courses.map((c) => c.grade || 0),
        backgroundColor: student.courses.map((c) => {
          const g = c.grade || 0;
          if (g >= 80) return "rgba(76, 175, 80, 0.8)";
          if (g >= 60) return "rgba(255, 152, 0, 0.8)";
          return "rgba(244, 67, 54, 0.8)";
        }),
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280" },
        grid: { display: false },
      },
      y: {
        max: 100,
        ticks: { color: "#6b7280" },
        grid: { color: "#e5e7eb" },
      },
    },
  };

  // Pie chart
  const pieData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        data: [passCount, failCount],
        backgroundColor: ["#22c55e", "#ef4444"],
        hoverBackgroundColor: ["#16a34a", "#dc2626"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#374151",
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#f9fafb",
        bodyColor: "#e5e7eb",
      },
    },
  };

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo-section">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">Student Portal</h2>
          <span className="sidebar-welcome">
            Welcome back, {student.name}
          </span>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li
              className={activeView === "overview" ? "active" : ""}
              onClick={() => setActiveView("overview")}
            >
              <span>Student Overview</span>
            </li>
            <li
              className={activeView === "analytics" ? "active" : ""}
              onClick={() => setActiveView("analytics")}
            >
              <span>Performance Analytics</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div style={{ display: "flex", gap: "10px" }}>
            {activeView === "analytics" && (
              <button
                className="action-button green"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            )}
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-content">
          {activeView === "overview" && (
            <>
              <h2 className="dashboard-welcome">Student Overview</h2>
              <p className="dashboard-description">
                Summary of your details and marks entered by Admin/Teachers.
              </p>

              <div className="student-overview-box">
                <h3>Student Overview</h3>
                <div className="student-overview-grid">
                  <div className="overview-item">
                    <span className="overview-label">Name</span>
                    <span className="overview-value">{student.name}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Current GPA</span>
                    <span className="overview-value">{student.gpa}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Overall Attendance</span>
                    <span className="overview-value">
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Enrolled Courses</span>
                    <span className="overview-value">{totalCourses}</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-panels">
                <div className="recent-grades-panel">
                  <h3>Your Marks</h3>
                  <span className="panel-description">
                    Marks entered by Admin/Teachers.
                  </span>
                  <div className="grade-list">
                    {student.courses.map((course) => (
                      <div className="grade-item" key={course.id}>
                        <div>
                          <strong>{course.name}</strong>
                          <div className="course-id">{course.id}</div>
                        </div>
                        <div>
                          <span
                            className={`grade-value ${
                              course.grade >= 80
                                ? "excellent"
                                : course.grade >= 60
                                ? "good"
                                : "needs-work"
                            }`}
                          >
                            {course.grade}%
                          </span>
                          {course.comment && (
                            <span className="grade-comment">
                              {course.comment}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {student.courses.length === 0 && (
                      <p>No marks added yet. Please check again later.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeView === "analytics" && (
            <div id="dashboard-content-pdf">
              <h2 className="dashboard-welcome">Performance Analytics</h2>
              <p className="dashboard-description">
                Visual overview of your performance across courses.
              </p>

              <div className="student-overview-box analytics-box">
                <h3>Summary</h3>
                <div className="student-overview-grid">
                  <div className="overview-item">
                    <span className="overview-label">Average Grade</span>
                    <span className="overview-value">{avgGrade}%</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Pass Rate</span>
                    <span className="overview-value">{passRate}%</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Total Courses</span>
                    <span className="overview-value">{totalCourses}</span>
                  </div>
                  {bestCourse && (
                    <div className="overview-item wide">
                      <span className="overview-label">
                        Best Performing Course
                      </span>
                      <span className="overview-value">
                        {bestCourse.name} ({bestCourse.id}) -{" "}
                        {bestCourse.grade}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="dashboard-panels analytics-panels">
                <div className="chart-panel">
                  <h3>Marks by Course</h3>
                  <span className="panel-description">
                    Colored bars based on performance.
                  </span>
                  {student.courses.length > 0 ? (
                    <Bar data={barData} options={barOptions} />
                  ) : (
                    <p>No course data yet.</p>
                  )}
                </div>

                <div className="chart-panel">
                  <h3>Pass vs Fail</h3>
                  <span className="panel-description">
                    Distribution of passed and failed courses.
                  </span>
                  {totalCourses > 0 ? (
                    <Pie data={pieData} options={pieOptions} />
                  ) : (
                    <p>No course data yet.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
