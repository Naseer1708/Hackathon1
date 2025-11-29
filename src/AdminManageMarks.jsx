import React from "react";
import { useNavigate } from "react-router-dom";

function AdminManageMarks({ courses, students, setMarks }) {
  const navigate = useNavigate();

  const handleAddMarks = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const studentId = formData.get("studentId");
    const courseId = formData.get("courseId");
    const marksValue = Number(formData.get("marks"));

    if (!studentId || !courseId || Number.isNaN(marksValue)) return;

    setMarks(studentId, courseId, marksValue);
    e.target.reset();
  };

  const totalEntries = students.reduce(
    (count, stu) =>
      count + stu.courses.filter((c) => c.grade != null).length,
    0
  );

  return (
    <div className="admin-manage-page">
      <div className="admin-manage-card">
        <h2>Manage Marks</h2>
        <p className="subtitle">Add or update marks for students.</p>
        <p className="total">Total Entries: {totalEntries}</p>

        <form onSubmit={handleAddMarks} className="admin-form">
          <label>
            Student ID:
            <input
              type="text"
              name="studentId"
              placeholder="e.g. STU123"
              required
            />
          </label>

          <label>
            Course:
            <select name="courseId" required>
              <option value="">Select course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </label>

          <label>
            Marks (%):
            <input
              type="number"
              name="marks"
              min="0"
              max="100"
              placeholder="e.g. 90"
              required
            />
          </label>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-btn">
              Save Marks
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
          {students.map((stu) =>
            stu.courses.map((c) => (
              <div className="admin-list-item" key={`${stu.id}-${c.id}`}>
                <div className="admin-list-main">
                  <strong>{stu.name}</strong>
                  <span className="admin-list-id">
                    {stu.id} · {c.name} ({c.id})
                  </span>
                </div>
                <div className="admin-list-extra">
                  {c.grade != null ? `${c.grade}%` : "-"}
                </div>
              </div>
            ))
          )}
          {totalEntries === 0 && (
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              No marks saved yet. Add marks using the form above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminManageMarks;
