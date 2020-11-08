import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { categories, slugify } from "../../../lib";
import { UserContext } from "../../index.js";
import Router from "next/router";
import axios from "axios";

import { MdMenu, MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";

const Menu = ({ handleCloseMenu, slide }) => {
  const [showCourses, setShowCourses] = useState(false);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const logout = () => {
    console.log("logging out from menu mobile...");
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

  console.log("show courses =", showCourses);
  return (
    <ul className={`menu ${slide ? "slide" : ""}`}>
      <li>
        <Link href="/">
          <a onClick={handleCloseMenu}>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/interviews">
          <a onClick={handleCloseMenu}>Interviews</a>
        </Link>
      </li>
      <li>
        <Link href="/our-story">
          <a onClick={handleCloseMenu}>Our story</a>
        </Link>
      </li>
     
      <li>
        <Link href="/hashtag">
          <a onClick={handleCloseMenu}>Hashtag Generator</a>
        </Link>
      </li>
      <li>
        <Link href="/news">
          <a onClick={handleCloseMenu}>News</a>
        </Link>
      </li>
      {/* <li>
        <Link href="#">
          <a onClick={handleCloseMenu}>Become an influencer</a>
        </Link>
      </li> */}

      {/* <li>
        <Link href="#">
          <a onClick={handleCloseMenu}>Influencer goodies</a>
        </Link>
      </li>
      <li>
        <Link href="#">
          <a onClick={handleCloseMenu}>Brand deals</a>
        </Link>
      </li> */}
      <li>
        <Link href="/contact">
          <a onClick={handleCloseMenu}>Contact</a>
        </Link>
      </li>
      <li>
        <div
          className="courses"
          role="button"
          onClick={() => setShowCourses(true)}
        >
          <span>Courses</span> <MdChevronRight size={"24px"} color={"white"} />
        </div>
      </li>
      {!isLoggedIn ? (
        <div className="login-wrapper">
          <li>
            <Link href="/login">
              <a onClick={handleCloseMenu}>
                <strong>Sign in</strong>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/register">
              <a onClick={handleCloseMenu}>
                <strong>Join</strong>
              </a>
            </Link>
          </li>
        </div>
      ) : (
        <div className="login-wrapper">
          <li>
            <Link href="/dashboard">
              <a onClick={handleCloseMenu}>
                <strong>{user.username}</strong>
              </a>
            </Link>
          </li>
          <li>
            <a
              href="/"
              onClick={() => {
                logout();
                handleCloseMenu();
              }}
            >
              <strong>Log out</strong>
            </a>
          </li>
          {user.isAdmin ? (
            <li className="admin">
              <Link href="/admin">
                <a onClick={handleCloseMenu}>
                  <strong>Admin</strong>
                </a>
              </Link>
            </li>
          ) : (
            <div></div>
          )}
        </div>
      )}
      <Categories
        handleCloseMenu={handleCloseMenu}
        visible={showCourses}
        hide={() => setShowCourses(false)}
      />
      <style jsx>{`
        .login-wrapper {
          margin-top: 1rem;
        }
        .admin {
          margin-top: 1rem;
        }
        .menu {
          margin: 0;
          padding: 0;
          padding-top: 3rem;
          list-style: none;
          position: relative;
          height: 100%;
          background: linear-gradient(135deg, #6717cd 10%, #2871fa 90%);
        }
        .menu li a,
        .courses {
          display: block;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          font-size: 1.1rem;
        }
        .courses {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </ul>
  );
};

const Subcategories = ({ category, handleCloseMenu, visible, hide }) => {
  console.log("subcategory category =", category && true);
  return (
    <div className={`container ${visible ? "show" : "hide"}`}>
      <div className="btn-back" onClick={hide}>
        <MdChevronLeft size={"36px"} color={"white"} />
      </div>
      {category && (
        <ul>
          <li>
            <Link href={"/courses/[id]"} as={`/courses/${slugify(category)}`}>
              <a onClick={handleCloseMenu}>All {category}</a>
            </Link>
          </li>
          {categories[category].sort().map((subcategory, i) => (
            <li key={i}>
              <Link
                href={"/courses/[id]/[sub]"}
                as={`/courses/${slugify(category)}/${slugify(subcategory)}`}
              >
                <a onClick={handleCloseMenu}>{subcategory}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(135deg, #6717cd 10%, #2871fa 90%);
          z-index: 22111;
          transform: translateX(-100%);
          transition: all 300ms ease-in 0s;
          overflow: auto;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        a {
          display: block;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          font-size: 1.1rem;
        }
        .btn-back {
          width: min-content;
          margin-top: 5px;
        }

        .show {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

const Categories = ({ handleCloseMenu, visible, hide }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openSubCategory, setOpenSubcategory] = useState(false);

  const handleShowCategory = (category) => {
    setSelectedCategory(category);
    setOpenSubcategory(true);
  };

  const handleCloseSubcategory = () => {
    setSelectedCategory("");
    setOpenSubcategory(false);
  };

  return (
    <div className={`container ${visible ? "show" : "hide"}`}>
      <div className="btn-back" onClick={hide}>
        <MdChevronLeft size={"36px"} color={"white"} />
      </div>
      <ul>
        <li>
          <Link href="/courses">
            <a onClick={handleCloseMenu}>All Courses</a>
          </Link>
        </li>
        {Object.keys(categories)
          .sort()
          .map((category) => (
            <li key={category}>
              <span
                className="category"
                onClick={() => handleShowCategory(category)}
              >
                <span>{category}</span>
                <MdChevronRight size={"24px"} color={"white"} />
              </span>
            </li>
          ))}
      </ul>
      <Subcategories
        handleCloseMenu={handleCloseMenu}
        visible={openSubCategory}
        category={selectedCategory}
        hide={handleCloseSubcategory}
      />
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(135deg, #6717cd 10%, #2871fa 90%);
          transform: translateX(-100%);
          transition: all 300ms ease-in 0s;
        }
        .btn-back {
          width: min-content;
          margin-top: 5px;
        }

        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          position: relative;
        }
        a,
        .category {
          display: block;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          font-size: 1.1rem;
        }
        .category {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .show {
          transform: translateX(0);
        }
      `}</style>
    </div>
  );
};

export const MenuMobile = () => {
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => {
    document.body.classList.add("viewport");
    setOpen(true);
  };
  const handleCloseMenu = () => {
    document.body.classList.remove("viewport");
    setOpen(false);
  };
  return (
    <div className="container">
      <div
        className="btn-open"
        role="button"
        aria-label="open menu"
        onClick={handleOpenMenu}
      >
        <span>
          <MdMenu size={"36px"} />
        </span>
      </div>
      <Modal show={open} onHide={handleCloseMenu} />
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          height: 75px;
          padding: 0 0.5rem;
          overflow: auto;
        }

        .btn-open {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        @media (min-width: 1000px) {
          .container {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

const Modal = ({ show, onHide }) => {
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    if (show) {
      setOpenMenu(true);
    }
  }, [show]);
  const handleCloseMenu = () => {
    setOpenMenu(false);
    setTimeout(() => {
      onHide();
    }, 300);
  };

  if (!show) return null;

  return (
    <div className="modal">
      <div className={`menu-container ${openMenu ? "slide" : ""}`}>
        <div className="btn-close" onClick={handleCloseMenu}>
          <MdClose size={"36px"} color={"white"} />
        </div>
        <Menu handleCloseMenu={handleCloseMenu} />
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.2);
          z-index: 111;
        }
        .btn-close {
          width: min-content;
          cursor: pointer;
          position: absolute;
          top: 5px;
          right: 5px;
          z-index: 10;
        }
        .menu-container {
          width: 400px;
          height: 100%;
          max-width: 100%;
          overflow-x: hidden;
          overflow-y: auto;

          transform: translateX(-100%);
          transition: all 300ms ease;
        }
        .slide {
          transform: translateX(0);
        }

        @media (max-width: 500px) {
          .menu-container {
            width: 500px;
          }
        }
      `}</style>
    </div>
  );
};
