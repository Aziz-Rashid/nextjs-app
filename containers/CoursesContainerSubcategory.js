import { useState, useEffect, useRef } from "react";
import { getCourses } from "../api";
import { MdFilterList } from "react-icons/md";
import {
  ResultWrapper,
  Wrapper,
  PanelMobile,
  ModalSpinner,
} from "../components";

export const CoursesContainerSubcategory = ({
  p_courses,
  p_total,
  limit,
  p_page,
  p_category,
  sort_by_date,
  sort_by_price,
}) => {
  const ref = useRef();
  const fetchCourses = async ({
    page = 0,
    _categories = [category],
    sort_by_price = sortByPrice,
    sort_by_date = sortByDate,
  }) => {
    setIsFetching(true);

    try {
      const { courses, total } = await getCourses({
        categories: _categories,
        page,
        sort_by_price,
        sort_by_date,
        limit,
      });
      ref.current.scrollIntoView({
        top,
        behavior: "smooth",
      });
      setCourses(courses);
      setTotal(total);
      setPage(page);
      setCategory(_categories[0]);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  const [courses, setCourses] = useState(p_courses);
  const [category, setCategory] = useState(p_category);
  const [total, setTotal] = useState(p_total);
  const [page, setPage] = useState(p_page);
  const [sortByPrice, setSortByPrice] = useState(sort_by_price);
  const [sortByDate, setSortByDate] = useState(sort_by_date);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    console.log("useEffect update states");
    setCourses(p_courses);
    setCategory(p_category);
    setTotal(p_total);
    setPage(p_page);
    setSortByDate(sort_by_date);
    setSortByPrice(sort_by_price);
  }, [p_category, p_total, p_page, sort_by_date, sort_by_price, p_courses]);

  const [openFilter, setOpenFilter] = useState(false);

  return (
    <Wrapper>
      <main ref={ref}>
        <h1 className="title">
          {category.subcategories.length ? category.subcategories[0].name : ""}
        </h1>
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
          <PanelMobile
            setIsFetching={setIsFetching}
            category={p_category}
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
            margin-top: 1rem;
            margin-bottom: 1rem;
            position: relative;
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
          .btn-filter {
            display: none;
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
