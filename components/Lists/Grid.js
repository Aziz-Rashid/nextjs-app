import React from "react";

export const Grid = ({ items, customStyles = {} }) => {
  return (
    <div>
      {items}
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: repeat(auto-fill, 270px);
          gap: 2em 0.5em;
          justify-content: space-around;
          min-height: ${customStyles.minHeight || "auto"}
        }
      `}</style>
    </div>
  );
};
