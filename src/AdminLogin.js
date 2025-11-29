import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { useStudentData } from "./StudentDataContext.jsx";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { students, updateGrade, updateAttendance } = useStudentData();
  const student = students[0]; // demo: single student

  const [selectedCourseId, setSelectedCourseId] = useState(
    student.courses[0].id
  );
  const [newGrade, setNewGrade] = useState(student.courses[0].grade);
  const [newAttendance, setNewAttendance] = useState(student.attendance);

  const handleLogout = () => {
    navigate("/teacher");
  };

  const handleUpdateGrade = (e) => {
    e.preventDefault();
    updateGrade(student.id, selectedCourseId, Number(newGrade));
  };

  const handleUpdateAttendance = (e) => {
    e.preventDefault();
    updateAttendance(student.id, Number(newAttendance));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    alert("Course added (demo only – connect this to context to persist).");
    e.target.reset();
  };

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo-section">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2 className="sidebar-title">Teacher Portal</h2>
          <span className="sidebar-welcome">Welcome back, Teacher</span>
        </div>
        <nav className="sidebar-menu">
          <ul>
            <li className="active"><span>Dashboard</span></li>
            <li><span>My Courses</span></li>
            <li><span>Attendance</span></li>
            <li><span>Assessments</span></li>
            <li><span>Reports</span></li>
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
            Here&apos;s your teaching overview and recent activity
          </p>

          {/* TOP SUMMARY CARDS */}
          <div className="dashboard-summary">
            <div className="dashboard-card gpa-card">
              <div>Classes Handling</div>
              <div className="dashboard-card-value">
                {student.courses.length}
              </div>
              <div className="dashboard-card-subtext">
                Active courses this semester
              </div>
            </div>
            <div className="dashboard-card attendance-card">
              <div>Selected Student Attendance</div>
              <div className="dashboard-card-value">
                {student.attendance}%
              </div>
              <div className="dashboard-card-subtext">
                Syncs with student dashboard
              </div>
            </div>
            <div className="dashboard-card courses-card">
              <div>Selected Student GPA</div>
              <div className="dashboard-card-value">{student.gpa}</div>
              <div className="dashboard-card-subtext">
                Based on latest course marks
              </div>
            </div>
          </div>

          <div className="dashboard-panels">
            {/* LEFT: list + update marks */}
            <div className="recent-grades-panel">
              <h3>Recent Course Marks</h3>
              <span className="panel-description">
                Latest grades you have assigned
              </span>

              <div className="grade-list">
                {student.courses.map((course) => (
                  <div className="grade-item" key={course.id}>
                    <div>
                      <strong>{course.name}</strong>
                      <div className="course-id">{course.id}</div>
                    </div>
                    <div>
                      <span className="grade-value">{course.grade}%</span>
                      <span className="grade-comment">
                        Current recorded mark
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form className="grade-form" onSubmit={handleUpdateGrade}>
                <label>
                  Course:
                  <select
                    value={selectedCourseId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedCourseId(id);
                      const course = student.courses.find((c) => c.id === id);
                      setNewGrade(course.grade);
                    }}
                  >
                    {student.courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.id})
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  New Grade (%):
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                  />
                </label>
                <button type="submit" className="action-button green">
                  Update Mark
                </button>
              </form>
            </div>

            {/* RIGHT: quick actions + add course + attendance */}
            <div className="quick-actions-panel">
              <h3>Quick Actions</h3>
              <span className="panel-description">
                Common teacher tasks and shortcuts
              </span>

              <div className="actions-grid">
                <button
                  type="button"
                  className="action-button green"
                  onClick={() =>
                    document
                      .getElementById("add-course-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Add Course
                </button>
                <button
                  type="button"
                  className="action-button"
                  onClick={() =>
                    document
                      .getElementById("attendance-section")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Take Attendance
                </button>
                <Link to="/teacher-assignments" className="action-button amber">
                  See Assignments
                </Link>
                <Link to="/teacher-reports" className="action-button violet">
                  View Reports
                </Link>
              </div>

              <div id="add-course-section" style={{ marginTop: "1.5rem" }}>
                <h4>Add Course</h4>
                <form className="grade-form" onSubmit={handleAddCourse}>
                  <label>
                    Course ID:
                    <input type="text" placeholder="e.g. CS101" required />
                  </label>
                  <label>
                    Course Name:
                    <input
                      type="text"
                      placeholder="e.g. Programming Basics"
                      required
                    />
                  </label>
                  <button type="submit" className="action-button">
                    Save Course
                  </button>
                </form>
              </div>

              <div id="attendance-section" style={{ marginTop: "1.5rem" }}>
                <h4>Update Attendance</h4>
                <form className="grade-form" onSubmit={handleUpdateAttendance}>
                  <label>
                    Attendance (%):
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newAttendance}
                      onChange={(e) => setNewAttendance(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="action-button amber">
                    Save Attendance
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;
