import Link from "next/link";
import { categories, slugify } from "../../../lib";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const Menu = () => {
  //these state and useEffect fix the issue the menu don't hide on courses/[id] etc..
  const [menu, setMenu] = useState(true);
  useEffect(() => {
    setMenu(true);
    return () => setMenu(false);
  }, [menu]);

  return (
    <div className="container">
      <Link href="/courses">
        <a onClick={() => setMenu(false)}>
          <span className="title">
            <span>Courses</span> <FaChevronDown />
          </span>
        </a>
      </Link>
      {menu && (
        <ul className="categories">
          {Object.keys(categories)
            .sort()
            .map((category) => {
              return (
                <li className="category" key={category}>
                  <Link
                    href={"/courses/[id]"}
                    as={`/courses/${slugify(category)}`}
                  >
                    <a onClick={() => setMenu(false)}>
                      <span className="chevron-right">
                        <FaChevronRight />
                      </span>
                      {category}
                    </a>
                  </Link>
                  <ul className="subcategories">
                    {categories[category].sort().map((subcategory, i) => (
                      <li className="subcategory" key={i}>
                        <Link
                          href={"/courses/[id]/[sub]"}
                          as={`/courses/${slugify(category)}/${slugify(
                            subcategory
                          )}`}
                        >
                          <a onClick={() => setMenu(false)}>
                            <span className="chevron-right">
                              <FaChevronRight />
                            </span>
                            {subcategory}
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          <li className="all-courses">
            <Link href={"/courses"}>
              <a onClick={() => setMenu(false)}>
                <span className="chevron-right">
                  <FaChevronRight />
                </span>
                All Courses
              </a>
            </Link>
          </li>
        </ul>
      )}

      <style jsx>{`
        .container {
          height: 75px;
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0 0.5rem;
        }
        .container span {
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        .title {
          display: flex;
          align-items: center;
        }
        .title span{
          padding-right: .2em;
        }
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .categories {
          position: absolute;
          top: 100%;
          left: 0;
          padding-top: 1rem;
          padding-left: 250px;
          width: 100%;
          height: 100vh;
          z-index: 1;
          background: #faf9fd;
          transform: scale(1, 0);
          transition: all 0s ease-in 100ms;
        }
        .subcategories {
          position: absolute;
          padding-top: 1rem;
          top: 0;
          left: 450px;
        }
        .category a {
          height: 100%;
        }
        .subcategory {
          display: none;
          color: inherit;
        }
        li {
          padding: 0.5em;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .container:hover {
          background: #faf9fd;
        }
        .container:hover span,
        .category:hover > a,
        .subcategory:hover a,
        .all-courses:hover a {
          color: #2871fa;
        }
        .container:hover ul {
          transform: scale(1, 1);
        }
        .category:hover .subcategory {
          display: block;
        }
        .chevron-right {
          visibility: hidden;
        }
        .category:hover > a .chevron-right,
        .subcategory:hover .chevron-right,
        .all-courses:hover .chevron-right {
          visibility: visible;
        }
        @media (max-width: 1000px){
          .container{
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
