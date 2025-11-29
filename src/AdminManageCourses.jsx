import React from "react";
import { useNavigate } from "react-router-dom";

function AdminManageCourses({ courses, addCourse }) {
  const navigate = useNavigate();

  const handleAddCourse = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseId = formData.get("courseId");
    const courseName = formData.get("courseName");
    if (!courseId || !courseName) return;
    addCourse(courseId, courseName);
    e.target.reset();
  };

  return (
    <div className="admin-manage-page">
      <div className="admin-manage-card">
        <h2>Manage Courses</h2>
        <p className="subtitle">Add or view courses.</p>
        <p className="total">Total Courses: {courses.length}</p>

        <form onSubmit={handleAddCourse} className="admin-form">
          <label>
            Course ID:
            <input
              type="text"
              name="courseId"
              placeholder="e.g. CS101"
              required
            />
          </label>
          <label>
            Course Name:
            <input
              type="text"
              name="courseName"
              placeholder="e.g. Intro to CS"
              required
            />
          </label>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-btn">
              Add Course
            </button>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => navigate("/admin-dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </form>

        <div className="admin-list">
          {courses.map((c) => (
            <div className="admin-list-item" key={c.id}>
              <div className="admin-list-main">
                <strong>{c.name}</strong>
                <span className="admin-list-id">{c.id}</span>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              No courses yet. Add some using the form above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminManageCourses;
