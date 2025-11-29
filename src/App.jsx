import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AdminLogin from "./AdminLogin.jsx";
import StudentLogin from "./StudentLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import StudentDashboard from "./StudentDashboard.jsx";
import AdminManageCourses from "./AdminManageCourses.jsx";
import AdminManageMarks from "./AdminManageMarks.jsx";

function App() {
  const [courses, setCourses] = useState([]);

  const [students, setStudents] = useState([]);

  const [currentStudentId, setCurrentStudentId] = useState(null);

  const addCourse = (courseId, courseName) => {
    setCourses((prev) => [
      ...prev,
      { id: courseId, name: courseName },
    ]);
  };

  const setMarks = (studentId, courseId, newMarks) => {
    setStudents((prevStudents) => {
      const existingStudent = prevStudents.find((s) => s.id === studentId);

      const buildUpdatedCourses = (stuCourses) => {
        const existingIndex = stuCourses.findIndex((c) => c.id === courseId);

        let updatedCourses;
        if (existingIndex !== -1) {
          updatedCourses = stuCourses.map((c) =>
            c.id === courseId ? { ...c, grade: newMarks } : c
          );
        } else {
          const course = courses.find((c) => c.id === courseId);
          updatedCourses = [
            ...stuCourses,
            {
              id: courseId,
              name: course ? course.name : courseId,
              grade: newMarks,
              comment: "",
            },
          ];
        }

        const avg =
          updatedCourses.reduce((sum, c) => sum + (c.grade || 0), 0) /
          (updatedCourses.length || 1);
        const newGpa = +(avg / 25).toFixed(2);

        return { updatedCourses, newGpa };
      };

      if (!existingStudent) {
        const { updatedCourses, newGpa } = buildUpdatedCourses([]);
        const newStudent = {
          id: studentId,
          name: `Student ${studentId}`,
          gpa: newGpa,
          attendance: 0,
          courses: updatedCourses,
        };
        return [...prevStudents, newStudent];
      }

      return prevStudents.map((stu) => {
        if (stu.id !== studentId) return stu;
        const { updatedCourses, newGpa } = buildUpdatedCourses(stu.courses);
        return { ...stu, courses: updatedCourses, gpa: newGpa };
      });
    });
  };

  const currentStudent =
    students.find((s) => s.id === currentStudentId) || null;

  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Logins */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/student"
          element={
            <StudentLogin
              students={students}
              setCurrentStudentId={setCurrentStudentId}
            />
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminDashboard
              courses={courses}
              students={students}
            />
          }
        />

        {/* Student dashboard */}
        <Route
          path="/dashboard"
          element={
            <StudentDashboard
              student={currentStudent}
              courses={courses}
            />
          }
        />

        {/* Admin manage courses */}
        <Route
          path="/admin-manage-courses"
          element={
            <AdminManageCourses
              courses={courses}
              addCourse={addCourse}
            />
          }
        />

        {/* Admin manage marks */}
        <Route
          path="/admin-manage-marks"
          element={
            <AdminManageMarks
              courses={courses}
              students={students}
              setMarks={setMarks}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
