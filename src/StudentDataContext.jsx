// StudentDataContext.jsx
import React, { createContext, useContext, useState } from "react";

const StudentDataContext = createContext();

export function StudentDataProvider({ children }) {
  // One demo student; admin will keep adding courses/marks for this student
  const [students, setStudents] = useState([
    {
      id: "STU001",
      name: "Demo Student",
      gpa: 3.5,
      attendance: 92,
      courses: [
        // { id: "CS101", name: "Intro to CS", grade: 85, comment: "Good job" }
      ],
    },
  ]);

  // Helper: add or update a course mark for a given student
  const addOrUpdateMark = ({ studentId, courseId, courseName, marks }) => {
    setStudents((prev) =>
      prev.map((stu) => {
        if (stu.id !== studentId) return stu;

        const existingIndex = stu.courses.findIndex(
          (c) => c.id === courseId
        );

        // If course already exists, update grade; else push new course
        let updatedCourses;
        if (existingIndex !== -1) {
          updatedCourses = [...stu.courses];
          updatedCourses[existingIndex] = {
            ...updatedCourses[existingIndex],
            name: courseName || updatedCourses[existingIndex].name,
            grade: marks,
          };
        } else {
          updatedCourses = [
            ...stu.courses,
            {
              id: courseId,
              name: courseName || courseId,
              grade: marks,
              comment: "",
            },
          ];
        }

        return { ...stu, courses: updatedCourses };
      })
    );
  };

  const value = { students, setStudents, addOrUpdateMark };
  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
}

export function useStudentData() {
  return useContext(StudentDataContext);
}
