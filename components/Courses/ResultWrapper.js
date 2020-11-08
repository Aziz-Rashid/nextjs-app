import { Pagination } from "../Pagination";
import { Course } from "./Course";
import { ResultHeader } from "./ResultHeader";

export const ResultWrapper = ({
  page,
  limit,
  total,
  setSortByDate,
  setSortByPrice,
  sortByDate,
  sortByPrice,
  fetchCourses,
  courses,
  marginLeft
}) => (
  <div className="result-wrapper">
    <ResultHeader
      setSortByDate={setSortByDate}
      setSortByPrice={setSortByPrice}
      sortByDate={sortByDate}
      sortByPrice={sortByPrice}
      fetchCourses={fetchCourses}
      page={page}
      total={total}
      limit={limit}
      marginLeft={marginLeft}
    />

    <div className="search-result">
      {courses.map((el) => (
        <Course key={el.id} cours={el} />
      ))}
    </div>

    <div className="pagination-wrapper">
      <Pagination
        page={page}
        onChange={(page) => {
          fetchCourses({ page, scroll: true });
        }}
        total={Math.ceil(total / limit)}
        url={"/courses?page="}
      />
    </div>
    <style jsx>{`
      .search-result {        
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        min-height: 550px;
      }  
      .search-wrapper {
        padding: 5px;
      }
      .search-wrapper input {
        width: 100%;
        height: 3.5em;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
          0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      }
      .result-wrapper{
        position: relative;
        padding-bottom: 2rem;
        padding-left: 1rem;
        width: 100%;
      }
      .btn-wrapper{
        position: absolute;
        bottom 0;
        left: 0;
        right: 0;
        text-align: center;
      }
      .pagination-wrapper{
        margin-top: 2rem;
        width: 100%;
      }
      
      @media (max-width: 900px){
        .result-wrapper {
          padding-left: 0;
        }
      }
      `}</style>
  </div>
);
