import React, { useContext } from "react";
import Link from "next/link";
import MenuCoursesDesktop from "./MenuCoursesDesktop";
import { UserContext } from "../../index.js";

const Navbar = () => {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <MenuCoursesDesktop />
        </li>
      </ul>
      <ul className="links">
        <li>
          <Link href="/interviews">
            <a>Interviews</a>
          </Link>
        </li>
        <li>
          <Link href="/our-story">
            <a>Our story</a>
          </Link>
        </li>
        {/* <li>
          <Link href="#">
            <a>Become an influencer</a>
          </Link>
        </li> */}

        {/* <li>
          <Link href="#">
            <a>Influencer goodies</a>
          </Link>
        </li> */}
        {/* <li>
          <Link href="#">
            <a>Brand deals</a>
          </Link>
        </li> */}
    
        <li>
          <Link href="/hashtag">
            <a>Hashtag generator</a>
          </Link>
        </li>
        <li>
          <Link href="/news">
            <a>News</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </li>
        {isLoggedIn && user.isAdmin ? (
          <li className="admin">
            <Link href="/admin">
              <a>
                <strong>Admin</strong>
              </a>
            </Link>
          </li>
        ) : (
          <div></div>
        )}
      </ul>

      <style jsx>{`
        nav {
          display: flex;
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
        .admin {
          margin-left: 1rem;
        }
        .menu-more {
          display: none;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        ul.links a {
          height: 75px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        ul.links a:hover {
          background: #faf9fd;
          color: #2871fa;
        }
        @media (max-width: 1000px) {
          nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
