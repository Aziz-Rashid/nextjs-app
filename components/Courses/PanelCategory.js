import Link from "next/link";
import { InputSubCategory } from "./InputSubCategory";
import { MdClose } from "react-icons/md";

export const PanelCategory = ({ category, fetchCourses, open, onClose }) => (
  <div className={`wrapper ${open ? "open" : ""}`}>
    <div className="btn-close" onClick={onClose}>
      <MdClose size={"36px"} />
    </div>
    <div className="toolbare">
      <h1 className="title">SEARCH FILTER</h1>
      <div className="search-wrapper"></div>
      <p>
        <Link href={"/courses"} as={"/courses"}>
          <a className="show-all-categories">Show all categories</a>
        </Link>
      </p>
      <h2 className="title">{category.name}</h2>
      <ul className="catgeogies-wrapper">
        {category.subcategories.map((subcategory) => (
          <InputSubCategory
            key={subcategory.id}
            open
            subCategory={subcategory}
            category={category}
            showSubCategory={() => {
              const subcategories = category.subcategories.map((s) => {
                if (s.id === subcategory.id) {
                  return { ...s, active: true };
                }
                return s;
              });
              fetchCourses({ _categories: [{ ...category, subcategories }] });
            }}
            hideSubCategory={() => {
              // const allSelected = !!category.subcategories.filter(
              //   (c) => !c.active
              // ).length;
              // if(!allSelected){
              //   const subcategories = category.subcategories.map((s) => {
              //     if (s.id === subcategory.id) {
              //       return { ...s, active: true };
              //     }
              //     return { ...s, active: false };
              //   });
              //   fetchCourses({ _categories: [{ ...category, subcategories }] });
              //   return;
              // }
              // const count = category.subcategories.filter((c) => c.active).length;
              const subcategories = category.subcategories.map((s) => {
                // if (count <= 1) {
                //   return { ...s, active: true };
                // }
                if (s.id === subcategory.id) {
                  return { ...s, active: false };
                }
                return s;
              });
              fetchCourses({ _categories: [{ ...category, subcategories }] });
            }}
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
      .show-all-categories {
        padding-left: 15px;
        color: #2851fa;
        text-decoration: none;
        font-weight: bold;
      }
      .show-all-categories:active {
        color: #2851fa;
      }
      .show-all-categories:hover {
        color: #2871fa;
      }
      @media (max-width: 900px) {
        .wrapper {
          display: none;
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
