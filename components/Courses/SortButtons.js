import { SORT } from "../../lib";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export const SortButtons = ({
  setSortByDate,
  setSortByPrice,
  sortByDate,
  sortByPrice,
  fetchCourses,
}) => {
  return (
    <div className="container" >
      <h2 className="title">Sort by:</h2>
      <div
        className="btn"
        role="button"
        aria-label="sort by price"
        onClick={() => {
          setSortByPrice(sortByPrice === SORT.ASC ? SORT.DESC : SORT.ASC);
          fetchCourses({
            sort_by_price: sortByPrice === SORT.ASC ? SORT.DESC : SORT.ASC,
          });
        }}
      >
        Price{" "}
        <span className="icon">
          {sortByPrice === SORT.ASC ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      </div>
      <div
        className="btn"
        role="button"
        aria-label="sort by date"
        onClick={() => {
          setSortByDate(sortByDate === SORT.ASC ? SORT.DESC : SORT.ASC);
          fetchCourses({
            sort_by_date: sortByDate === SORT.ASC ? SORT.DESC : SORT.ASC,
          });
        }}
      >
        Date{" "}
        <span className="icon">
          {sortByDate === SORT.ASC ? <FaArrowUp /> : <FaArrowDown />}
        </span>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        .title {
          font-size: 0.9rem;
          text-decoration: underline;
        }
        .btn {
          display: inline-block;
          margin-left: 1em;
          padding: 0.3em 0.5em;
          color: white;
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          border-radius: 3px;
          cursor: pointer;
        }
        .icon {
          font-size: 1em;
        }
        .btn:hover {
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }
        @media (max-width: 600px){
          .container {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
