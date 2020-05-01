import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCouses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCouses().length === 0) loadCourses();
    return () => courseStore.removeAllListeners(onChange); //This cleanup method will be called when the component unmounts
  }, []);

  function onChange() {
    setCourses(courseStore.getCouses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
