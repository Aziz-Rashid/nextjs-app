import Router from "next/router";
import { InputSearch } from "./InputSearch";
import { InputCategory } from "./InputCategory";
import { MdClose } from "react-icons/md";
import { categories as libCategories } from "../../lib";

export const PanelMobile = ({ category, open, onClose, setIsFetching }) => {
  const [categories, setCategories] = React.useState([]);
  React.useEffect(() => {
    const activeSubcategories = category.subcategories
      .filter((el) => el.active)
      .map((el) => el.name);
    const categories = Object.keys(libCategories).map((el, i) => {
      if (category.name === el) {
        return {
          id: i,
          name: el,
          active: true,
          subcategories: libCategories[el].map((s, idx) => ({
            id: i + "-" + idx,
            categoryId: i,
            name: s,
            active: activeSubcategories.includes(s),
          })),
        };
      }
      return {
        id: i,
        name: el,
        active: false,
        subcategories: libCategories[el].map((s, idx) => ({
          id: i + "-" + idx,
          categoryId: i,
          name: s,
          active: false,
        })),
      };
    });
    setCategories(categories);
  }, [category]);
  return (
    <div className={`wrapper ${open ? "open" : ""}`}>
      <div className="btn-close" onClick={onClose}>
        <MdClose size={"36px"} />
      </div>
      <div className="toolbare">
        <h1 className="title">SEARCH FILTER</h1>
        <div className="search-wrapper">
          <InputSearch />
        </div>
        <h2 className="title">Categories</h2>
        <ul className="catgeogies-wrapper">
          {categories
            .sort((a, b) => (a.name < b.name ? -1 : 1))
            .map((category) => (
              <InputCategory
                key={category.id}
                category={category}
                hideCategory={() => {
                  setIsFetching(true);
                  const c = categories.map((el) => {
                    if (el.id === category.id) {
                      return {
                        ...el,
                        active: false,
                        subcategories: el.subcategories.map((s) => ({
                          ...s,
                          active: false,
                        })),
                      };
                    }
                    return el;
                  });

                  Router.push(
                    {
                      pathname: "/courses",
                      query: {
                        filter: JSON.stringify(
                          c
                            .filter((el) => el.active)
                            .map((el) => {
                              return {
                                name: el.name,
                                subcategories: el.subcategories
                                  .filter((el) => el.active)
                                  .map((el) => el.name),
                              };
                            })
                        ),
                      },
                    },
                    "/courses"
                  );
                }}
                showCategory={() => {
                  setIsFetching(true);
                  const c = categories.map((el) => {
                    if (el.id === category.id) {
                      return {
                        ...el,
                        active: true,
                        subcategories: el.subcategories.map((s) => ({
                          ...s,
                          active: true,
                        })),
                      };
                    }
                    return el;
                  });

                  Router.push(
                    {
                      pathname: "/courses",
                      query: {
                        filter: JSON.stringify(
                          c
                            .filter((el) => el.active)
                            .map((el) => {
                              return {
                                name: el.name,
                                subcategories: el.subcategories
                                  .filter((el) => el.active)
                                  .map((el) => el.name),
                              };
                            })
                        ),
                      },
                    },
                    "/courses"
                  );
                }}
                categories={categories}
                fetchCourses={({ _categories }) => {
                  setIsFetching(true);
                  Router.push(
                    {
                      pathname: "/courses",
                      query: {
                        filter: JSON.stringify(
                          _categories
                            .filter((el) => el.active)
                            .map((el) => {
                              return {
                                name: el.name,
                                subcategories: el.subcategories
                                  .filter((el) => el.active)
                                  .map((el) => el.name),
                              };
                            })
                        ),
                      },
                    },
                    "/courses"
                  );
                }}
              />
            ))}
        </ul>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
        }
        .toolbare {
          width: 250px;
          padding: 0.5rem;
        }
        .catgeogies-wrapper {
          margin: 0;
          padding: 0;
        }
        h1,
        h2 {
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.8);
          padding-left: 15px;
        }
        h1 {
          text-transform: uppercase;
          margin: 15px;
          padding: 0 0 15px;
        }
        h1.title {
          border-bottom: solid thin rgba(0, 0, 0, 0.1);
        }
        .btn-close {
          display: none;
        }

        @media (max-width: 900px) {
          .wrapper {
            position: absolute;
            left: 0;
            top: 0;
            background: white;
            padding: 0.5rem;
            z-index: 2;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            transform: translate(-120%);
            transition: all 300ms ease-in 0s;
          }
          .open {
            transform: translate(0);
          }
          .btn-close {
            display: block;
            position: absolute;
            top: 5px;
            right: 5px;
            cursor: pointer;
          }
        }
      `}</style>
    </div>
  );
};
