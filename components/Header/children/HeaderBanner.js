import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../index.js";
import Router from "next/router";
import axios from "axios";

const HeaderBanner = ({ courses: p_courses }) => {
  const [isClosed, setisClosed] = useState(false);
  const [courses, setCourses] = useState(
    p_courses.length ? [...p_courses] : []
  );
  const [selectedCourse, setSelectedCourse] = useState(
    p_courses.length ? [...p_courses][0] : ""
  );
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const logout = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        if (res.status == 200) {
          setUser({});
          setIsLoggedIn(false);
          Router.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (courses.length > 0) return;
    const fetchCourses = async () => {
      try {
        const count = selectedCourse ? 20 : 3;
        const res = await fetch(`/api/courses/sample?count=${count}`);
        const { sample = [0] } = await res.json();
        if (!selectedCourse) {
          setCourses(sample.slice(1));
          setSelectedCourse(sample[0]);
        } else {
          setCourses(sample);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [courses.length, selectedCourse]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHover) return;
      if (!courses.length) return;
      setSelectedCourse(courses[0]);
      setCourses(courses.slice(1));
    }, 1000 * 10);
    if (isClosed) clearInterval(interval);
    return () => clearInterval(interval);
  });

  return (
    <div className={isClosed ? "hide" : "banner-wrapper"}>
      {selectedCourse && (
        <a
          href={selectedCourse.url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {selectedCourse.title}
        </a>
      )}
      {!isLoggedIn ? (
        <div className="signinup-wrapper">
          <ul className="links">
            <li>
              <Link href="/login">
                <a>
                  <strong>Sign in</strong>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a>
                  <strong>Join</strong>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="signinup-wrapper">
          <ul className="links">
            <li>
              <Link href="/dashboard">
                <a>
                  <strong>{user.username}</strong>
                </a>
              </Link>
            </li>
            <li>
              <a href="/" onClick={logout}>
                <strong>Log out</strong>
              </a>
            </li>
          </ul>
        </div>
      )}
      {/* Commented out option to close banner - the login/sign up buttons should be on the banner */}
      {/*
      <img
        className={isClosed ? "hide-img" : ""}
        onClick={() => {
          setisClosed(true);
        }}
        src="/img/cross.png"
        alt=""
      />*/}
      <style jsx>{`
        .banner-wrapper {
          position: relative;
          height: 50px;
          background-image: linear-gradient(
            to right,
            #6717cd,
            #6717cd,
            #2871fa,
            #2871fa
          );
          display: flex;
          align-items: center;
          padding: 0 0.5em;
          transition: all 0.5s ease-out;
        }
        .signinup-wrapper {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        ul {
          padding: 0;
          margin: 0;
        }
        ul.links {
          display: flex;
        }
        li {
          list-style: none;
        }
        .menu-more {
          display: none;
        }
        a {
          margin: auto;
          color: white;
          text-decoration: none;
          text-align: center;
        }
        ul.links a {
          height: 50px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-size: 0.8rem;
          width: auto;
        }
        ul.links a:hover {
          background: #faf9fd;
          color: #2871fa;
        }
        .img {
          position: absolute;
          width: 15px;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .hide {
          transform-origin: top;
          transform: scale(1, 0);
          height: 0;
        }
        .hide-img {
          display: none;
        }
        @media (max-width: 1000px) {
          .signinup-wrapper {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .signinup-wrapper {
            margin-right: 5px;
          }
          a {
            padding-right: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderBanner;
