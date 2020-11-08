import React from "react";
import { categories as libCategories } from "../../../lib";

export const Tabs = ({ courses = [], fetchSampleCourses }) => {
  const selectedCategory = courses.length ? courses[0].category : "";
  const categories = Object.keys(libCategories);

  return (
    <div className="container">
      {categories.map((category) => (
        <div
          role="button"
          className={`tab ${
            category.toLowerCase() === selectedCategory.toLowerCase()
              ? "active"
              : ""
          }`}
          key={category}
          onClick={() => {
            fetchSampleCourses(category);
          }}
        >
          {category}
        </div>
      ))}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          padding: 1rem 0;
        }
        .tab {
          display: inline-block;
          font-size: 1rem;
          position: relative;
          color: #1b202d;
          border: none;
          background: none;
          cursor: pointer;
          padding: .5em 1em;
          margin-bottom: 5px;
        }

        .tab::after {
          content: "";
          position: absolute;
          width: 101%;
          width: calc(100% + 4px);
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: -2px;
          background-color: #0549c7;
          transform-origin: bottom right;
          transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
        }

        .tab.active::after {
          transform: scaleX(1);
          transform-origin: bottom left;
          color: #0549c7;
        }
        .tab:hover {
          color: #0549c7;
        }
        .tab.active {
          color: #0549c7;
        }
      `}</style>
    </div>
  );
};
