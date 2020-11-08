import { useState, useEffect } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";
import styled from "./checkmark.module.css";

export const InputSubCategory = ({
  category,
  subCategory,
  showSubCategory,
  hideSubCategory,
  open,
}) => {
  const check = category.active && subCategory.active
  const [checked, setChecked] = useState(check);

  useEffect(() => {
    setChecked(check);
  }, [check]);
  const onChange = () => {
    if (!check) {
      showSubCategory();
    } else {
      hideSubCategory();
    }
    setChecked(check);
  };

  // console.log("subcategory =", subCategory.name, subCategory.active);
  return (
    <li>
      <div className={styled.wrapper}>
      {checked ? (
          <MdCheckBox className={styled.checkmark} />
        ) : (
          <MdCheckBoxOutlineBlank className={styled.unchecked} />
        )}
      <input
        id={subCategory.id}
        type="checkbox"
        checked={checked}
               onChange={onChange}
      />
      <label htmlFor={subCategory.id}>{subCategory.name}</label>
      </div>
      <style jsx>
        {`
           input {
            opacity: 0;
            width: 20px;
            height: 12px;
            position: absolute;
            left: 0;
          }
          li {
            display: ${open ? "block" : "none"};
            list-style: none;
            margin-left: 1rem;
          }
          label {
            flex: 1;
            padding-left: 0.5em;
            color: rgba(0, 0, 0, 0.7);
            font-size: 0.9rem;
          }
         
        `}
      </style>
    </li>
  );
};

export default InputSubCategory;
