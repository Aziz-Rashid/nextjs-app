import { InputSearch } from "./InputSearch";
import { InputCategory } from "./InputCategory";
import { MdClose } from "react-icons/md";

export const Panel = ({ categories, fetchCourses, open, onClose }) => {
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
                  // const allCategoriesAreSelected = !!categories.filter(
                  //   (c) => !c.active
                  // ).length;
                  // if(!allCategoriesAreSelected){
                  //   const c = categories.map((el) => {
                  //     if (el.id == category.id) {
                  //       return {
                  //         ...el,
                  //         active: true,
                  //         subcategories: el.subcategories.map((s) => ({
                  //           ...s,
                  //           active: true,
                  //         })),
                  //       };
                  //     }
                  //     return {
                  //       ...el,
                  //       active: false,
                  //       subcategories: el.subcategories.map((s) => ({
                  //         ...s,
                  //         active: false,
                  //       })),
                  //     };
                  //   });
                  //   fetchCourses({
                  //    _categories: c
                  //   });
                  //   return
                  // }
                  // const count = categories.filter((c) => c.active).length;
                  const c = categories.map((el) => {
                    // if (count <= 1) {
                    //   return {
                    //     ...el,
                    //     active: true,
                    //     subcategories: el.subcategories.map((s) => ({
                    //       ...s,
                    //       active: true,
                    //     })),
                    //   };
                    // }
                    if (el.id == category.id) {
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
                  fetchCourses({
                    _categories: c,
                  });
                }}
                showCategory={() => {
                  const c = categories.map((el) => {
                    if (el.id == category.id) {
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
                  fetchCourses({
                    _categories: c,
                  });
                }}
                categories={categories}
                fetchCourses={fetchCourses}
              />
            ))}
        </ul>
      </div>
      <style jsx>{`
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
