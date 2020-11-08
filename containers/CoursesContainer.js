import { useState, useRef } from "react";
import { getCourses } from "../api";
import { Panel, ResultWrapper, Wrapper, ModalSpinner } from "../components";
import { MdFilterList } from "react-icons/md";

export const CoursesContainer = ({
  p_courses,
  p_total,
  limit,
  p_categories,
  sort_by_price,
  sort_by_date,
  p_openFilter,
}) => {
  const ref = useRef();
  const [courses, setCourses] = useState(p_courses);
  const [categories, setCategories] = useState(p_categories);

  const [total, setTotal] = useState(p_total);
  const [page, setPage] = useState(0);

  const [sortByPrice, setSortByPrice] = useState(sort_by_price);
  const [sortByDate, setSortByDate] = useState(sort_by_date);

  const [openFilter, setOpenFilter] = useState(p_openFilter);

  const [isFetching, setIsFetching] = useState(false);

  const fetchCourses = async ({
    page = 0,
    _categories = categories,
    sort_by_price = sortByPrice,
    sort_by_date = sortByDate,
    scroll = false,
  }) => {
    const filteredCat = _categories.filter((el) => el.active);
    let query;
    if (filteredCat.length) {
      query = {
        categories: filteredCat,
        page,
        sort_by_price,
        sort_by_date,
        limit,
      };
    } else {
      query = {
        page: 0,
        limit,
      };
    }
    setIsFetching(true);
    try {
      const { courses, total } = await getCourses(query);
      if (scroll) {
        ref.current.scrollIntoView({
          top,
          behavior: "smooth",
        });
      }
      setCourses(courses);
      setTotal(total);
      setPage(page);
      setCategories(_categories);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };
  return (
    <Wrapper>
      <main ref={ref}>
        <h1 className="title">Courses</h1>
        <div className="container">
          {isFetching && <ModalSpinner />}
          <div
            className="btn-filter"
            role="button"
            aria-label="show courses filter"
            onClick={() => {
              setOpenFilter(true);
            }}
          >
            <MdFilterList size={"36px"} />
          </div>
          <Panel
            categories={categories}
            fetchCourses={fetchCourses}
            open={openFilter}
            onClose={() => setOpenFilter(false)}
          />
          <ResultWrapper
            page={page}
            limit={limit}
            total={total}
            setSortByDate={setSortByDate}
            setSortByPrice={setSortByPrice}
            sortByDate={sortByDate}
            sortByPrice={sortByPrice}
            fetchCourses={fetchCourses}
            courses={courses}
          />
        </div>
        <style jsx>{`
          .container {
            display: flex;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            margin-top: 2rem;
            margin-bottom: 2rem;
            position: relative;
          }
          .btn-filter {
            display: none;
          }
          .title {
            text-align: center;
            text-transform: uppercase;
            font-style: oblique;
            color: #1b202d;
            font-size: 1.8rem;
            lettre-spacing: 0.1em;
            margin-top: 3rem;
            letter-spacing: 0.1em;
          }
          @media (max-width: 900px) {
            .btn-filter {
              display: block;
              position: absolute;
              top: 1rem;
              left: 1rem;
              cursor: pointer;
              z-index: 1;
            }
          }
        `}</style>
      </main>
    </Wrapper>
  );
};
