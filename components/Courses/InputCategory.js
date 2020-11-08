import { useState, useEffect } from "react";
import InputSubCategory from "./InputSubCategory";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import styled from "./checkmark.module.css";

export const InputCategory = ({
  category,
  showCategory,
  hideCategory,
  categories,
  fetchCourses,
}) => {
  const check = category.active;
  const [checked, setChecked] = useState(check);
  const [isOpenSubcategory, setIsOpenSubcategory] = useState(true);

  useEffect(() => {
    setChecked(check);
  }, [check]);

  const onChange = () => {
    setChecked(check);
  };
  // console.log('selected sub categories =', selectedSubCategories)

  return (
    <li>
      <div className={styled.wrapper}>
        {checked ? (
          <MdCheckBox className={styled.checkmark} />
        ) : (
          <MdCheckBoxOutlineBlank className={styled.unchecked} />
        )}

        <input
          id={category.id}
          type="checkbox"
          checked={checked}
          onClick={(e) => {
            if (e.target.checked) {
              showCategory();
            } else {
              hideCategory();
            }
          }}
          onChange={onChange}
        />
        <label htmlFor={category.id}>{category.name}</label>
        <button
          onClick={() => {
            setIsOpenSubcategory(!isOpenSubcategory);
          }}
        >
          {isOpenSubcategory ? (
            <FaAngleUp className={styled.checkmark} />
          ) : (
            <FaAngleDown className={styled.checkmark} />
          )}
        </button>
      </div>
      <ul className="subcategories-wrapper">
        {[...category.subcategories]
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((subCategory) => (
            <InputSubCategory
              key={subCategory.id}
              category={category}
              subCategory={subCategory}
              showSubCategory={() => {
                const c = categories.map((el) => {
                  if (el.id === subCategory.categoryId) {
                    return {
                      ...el,
                      active: true,
                      subcategories: el.subcategories.map((s) => {
                        if (s.id === subCategory.id) {
                          return { ...s, active: true };
                        }
                        return s;
                      }),
                    };
                  }
                  return el;
                });
                fetchCourses({ _categories: c });
              }}
              hideSubCategory={() => {
                // const allCategoriesAreSelected = !!categories.filter(
                //   (c) => !c.active
                // ).length;
                // if (!allCategoriesAreSelected) {
                //   const c = categories.map((el) => {
                //     if (el.id === subCategory.categoryId) {
                //       return {
                //         ...el,
                //         active: true,
                //         subcategories: el.subcategories.map((s) => {
                //           if (s.id === subCategory.id) {
                //             return { ...s, active: true };
                //           }
                //           return { ...s, active: false };
                //         }),
                //       };
                //     }
                //     return {
                //       ...el,
                //       active: false,
                //       subcategories: el.subcategories.map((s) => {
                //         return { ...s, active: false };
                //       }),
                //     };
                //   });
                //   fetchCourses({ _categories: c });
                //   return;
                // }
                // const shouldCheckAllInputs =
                //   categories.filter((c) => c.active).length < 2 &&
                //   category.subcategories.filter((c) => c.active).length < 2;

                // if (shouldCheckAllInputs) {
                //   const c = categories.map((el) => {
                //     return {
                //       ...el,
                //       active: true,
                //       subcategories: el.subcategories.map((s) => {
                //         return { ...s, active: true };
                //       }),
                //     };
                //   });

                //   fetchCourses({ _categories: c });
                //   return;
                // }
                const c = categories.map((el) => {
                  if (el.id === subCategory.categoryId) {
                    return {
                      ...el,
                      active:
                        el.subcategories.filter((s) => s.active).length > 1
                          ? true
                          : false,
                      subcategories: el.subcategories.map((s) => {
                        if (s.id === subCategory.id) {
                          return { ...s, active: false };
                        }
                        return s;
                      }),
                    };
                  }
                  return el;
                });

                fetchCourses({ _categories: c });
              }}
              open={isOpenSubcategory}
            />
          ))}
      </ul>
      <style jsx>
        {`
          input {
            opacity: 0;
            width: 20px;
            height: 12px;
            position: absolute;
          }
          li {
            list-style: none;
            margin: 5px;
          }

          label {
            flex: 1;
            padding-left: 0.5em;
            color: rgba(0, 0, 0, 0.7);
            font-size: 0.9rem;
          }
          .subcategories-wrapper {
            margin: 0;
            padding: 0;
            margin-bottom: 1em;
          }
          button {
            padding: 0;
            margin: 0;
            margin-right: auto;
            background: none;
            border: none;
          }
        `}
      </style>
    </li>
  );
};
