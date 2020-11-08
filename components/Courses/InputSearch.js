import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { FaSearch } from "react-icons/fa";

export const InputSearch = () => {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (value.length < 2) {
      setResult([]);
      return;
    }
    if (value.length % 2 !== 0) return;

    const fetchCourses = async () => {
      try {
        const courses = await fetch(`/api/search/courses?q=${value}`);
        const json = await courses.json();
        setResult(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [value]);

  return (
    <form
      autoComplete="off"
      onSubmit={async (e) => {
        e.preventDefault();
        if (value.length < 2) return;
        Router.push(`/search/courses?q=${value}`);
      }}
    >
      <label htmlFor="search-input-cours" className="label-search">
        Search
      </label>
      <div className="search-wrapper">
        <div className="search-input-wrapper">
          <input
            id="search-input-cours"
            autoComplete="off"
            aria-label="search for a course"
            type="search"
            value={value}
            placeholder="Search courses"
            onChange={(e) => {
              const value = e.target.value;
              if (value.length < 0) setResult([]);
              setValue(value);
            }}
          />
        </div>
        <button type="submit" aria-label="search">
          <FaSearch size="1.2em" color="#6717cd" />
        </button>
      </div>
      <div className="wrapper">
        {result.length ? (
          <ul className="container">
            {result.map((el) => (
              <li key={el.id}>
                <Link href={"/courses/[id]/[sub]/[title]"} as={el.url}>
                  <a>{el.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          background-color: #fff;
          padding: 0.5rem;
          border-radius: 4px;
          box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
            0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        }
        .label-search {
          visibility: hidden;
          position: absolute;
          top: -9999px;
        }
        button {
          border: none;
          background: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .search-input-wrapper {
          flex: 1;
        }
        input {
          width: 100%;
          min-width: 150px;
          border: none;
          padding: 0.5em;
          background: transparent;
          outline: 0;
        }
        .wrapper {
          position: relative;
        }
        .container {
          margin: 0;
          padding: 0.5em;
          list-style: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          min-height: 200px;
          height: 50vh;
          overflow-y: auto;
          z-index: 1;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
        }
        a {
          display: block;
          text-decoration: none;
          color: inherit;
          margin-bottom: 0.5em;
          font-size: 0.8rem;
        }
        li:hover {
          background-color: #faf9fd;
          color: #000;
        }
      `}</style>
    </form>
  );
};
