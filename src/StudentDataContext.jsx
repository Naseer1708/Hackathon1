import React, { createContext, useContext, useState } from "react";

const StudentDataContext = createContext();

export const useStudentData = () => useContext(StudentDataContext);

export function StudentDataProvider({ children }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      gpa: 3.4,
      attendance: 91,
      courses: [
        { id: "MATH101", name: "Mathematics", grade: 85, comment: "Good performance" },
        { id: "PHY101",  name: "Physics",     grade: 78, comment: "Needs improvement in theory" },
        { id: "CHEM101", name: "Chemistry",   grade: 92, comment: "Excellent work" }
      ]
    }
  ]);

  // Update grade (and optionally comment) for a given student + course
  const updateGrade = (studentId, courseId, newGrade, newComment) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id !== studentId) return s;

        const updatedCourses = s.courses.map(c =>
          c.id === courseId
            ? {
                ...c,
                grade: newGrade,
                comment: newComment !== undefined ? newComment : c.comment
              }
            : c
        );

        const avg =
          updatedCourses.reduce((sum, c) => sum + c.grade, 0) /
          updatedCourses.length;
        const newGpa = +(avg / 25).toFixed(2);

        return { ...s, courses: updatedCourses, gpa: newGpa };
      })
    );
  };

  // Admin helper: called from Admin Manage Marks form
  const setGradeFromAdmin = (studentId, courseId, newGrade) => {
    updateGrade(studentId, courseId, newGrade);
  };

  const updateAttendance = (studentId, newAttendancePercent) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentId ? { ...s, attendance: newAttendancePercent } : s
      )
    );
  };

  return (
    <StudentDataContext.Provider
      value={{ students, updateGrade, updateAttendance, setGradeFromAdmin }}
    >
      {children}
    </StudentDataContext.Provider>
  );
}
