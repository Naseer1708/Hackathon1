import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

function AdminDashboard({ courses, students }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // redirect to Home page
    navigate("/");
  };

  const totalCourses = courses.length;
  const totalStudents = students.length;

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo-section">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">Admin Portal</h2>
          <span className="sidebar-welcome">Welcome back, Admin</span>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className="active">
              <span>Dashboard</span>
            </li>
            <li onClick={() => navigate("/admin-manage-courses")}>
              <span>Manage Courses</span>
            </li>
            <li onClick={() => navigate("/admin-manage-marks")}>
              <span>Manage Marks</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div></div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-content">
          <h2 className="dashboard-welcome">Welcome Back!</h2>
          <p className="dashboard-description">
            Manage courses and student marks across the institute.
          </p>

          <div className="dashboard-summary">
            <div className="dashboard-card attendance-card">
              <div>Total Courses</div>
              <div className="dashboard-card-value">{totalCourses}</div>
              <div className="dashboard-card-subtext">
                Currently configured
              </div>
            </div>
            <div className="dashboard-card courses-card">
              <div>Total Students</div>
              <div className="dashboard-card-value">{totalStudents}</div>
              <div className="dashboard-card-subtext">
                Active in system
              </div>
            </div>
          </div>

          <div className="dashboard-panels">
            <div className="recent-grades-panel">
              <h3>Courses</h3>
              <span className="panel-description">
                Courses visible in student dashboards.
              </span>
              <div className="grade-list">
                {courses.map((c) => (
                  <div className="grade-item" key={c.id}>
                    <div>
                      <strong>{c.name}</strong>
                      <div className="course-id">{c.id}</div>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && (
                  <p>No courses yet. Add some in Manage Courses.</p>
                )}
              </div>
            </div>

            <div className="quick-actions-panel">
              <h3>Quick Actions</h3>
              <span className="panel-description">
                Jump to common admin tasks.
              </span>
              <div className="actions-grid">
                <button
                  className="action-button"
                  onClick={() => navigate("/admin-manage-courses")}
                >
                  Go to Manage Courses
                </button>
                <button
                  className="action-button amber"
                  onClick={() => navigate("/admin-manage-marks")}
                >
                  Go to Manage Marks
                </button>
              </div>

              {students[0] && (
                <div style={{ marginTop: "1.5rem" }}>
                  <h4>Sample Student Snapshot</h4>
                  <p style={{ fontSize: "0.9rem" }}>
                    Student Overview in their dashboard is based on this shared
                    data.
                  </p>
                  <div className="student-overview-box">
                    <div className="student-overview-grid">
                      <div className="overview-item">
                        <span className="overview-label">Name</span>
                        <span className="overview-value">
                          {students[0].name}
                        </span>
                      </div>
                      <div className="overview-item">
                        <span className="overview-label">GPA</span>
                        <span className="overview-value">
                          {students[0].gpa}
                        </span>
                      </div>
                      <div className="overview-item">
                        <span className="overview-label">
                          Enrolled Courses
                        </span>
                        <span className="overview-value">
                          {students[0].courses.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
