import { useState } from "react";
import Course from "./children/Course";
import { encodeString } from "../../lib";
import { Wrapper } from "../Wrapper";
import { Tabs } from "./children/Tabs";

export const HomeCourses = ({ coursesSample }) => {
  const fetchSampleCourses = async (category) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const res = await fetch(
        `/api/courses/sample?category=${encodeString(category)}`
      );
      console.log("fetch sample status =", res.status);
      if (res.status === 200) {
        const json = await res.json();
        const courses = json.sample;
        setCourses(courses);
      }
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  const [courses, setCourses] = useState(coursesSample.courses);
  const [isFetching, setIsFetching] = useState(false);

  return (
    <section>
      <Wrapper>
        <div className="container">
          <h1>Learn how to do this too</h1>
          <Tabs courses={courses} fetchSampleCourses={fetchSampleCourses} />
          <div className="courses-container">
            {courses.map((cours) => {
              return <Course key={cours.id} cours={cours} />;
            })}
          </div>
        </div>
      </Wrapper>

      <style jsx>{`
        section {
          background-color: #faf9fd;
        }
        .container {
          padding: 2rem 0;
        }
        .courses-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        h1 {
          text-align: center;
          text-transform: uppercase;
          font-style: oblique;
          color: #1b202d;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
        }

        @media (max-width: 1200px) {
          .courses-container {
            justify-content: space-around;
          }
        }
      `}</style>
    </section>
  );
};
