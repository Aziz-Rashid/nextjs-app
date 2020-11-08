import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Course, Pagination } from "../../components";

const CoursesSearch = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [isFetching, setIsFetching] = useState(true);


  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const { q } = router.query;
  useEffect(() => {
    if (!q) {
      return;
    }

    setIsFetching(true);
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/search/courses`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ q, page }),
        });
        const { courses, total } = await res.json();
        setCourses(courses);
        setTotal(total);
      } catch (error) {
        console.error(error);
      }
      setIsFetching(false);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    fetchCourses();
  }, [page, q]);
  console.log("q =", q);
  return (
    <main>
      <div className="wrapper">
        <Link href={"/courses"} as={"/courses"}>
          <a>Back to courses</a>
        </Link>
        <p className="search-text">Search result for: {q} </p>
       
        <section className="section">
          <div className="container">
            {isFetching && <p className="loader">Loading....</p>}
            {courses.length ? (
              courses.map((course) => <Course key={course.id} cours={course} />)
            ) : (
              <p>No result</p>
            )}
          </div>
          { total > 20 ? (
            <div className="pagination-wrapper">
              <Pagination
                page={page}
                onChange={(p) => {
                  setPage(p);
                }}
                total={Math.ceil(total / 20)}
                url={"/courses?page="}
              />
            </div>
          ) : null}
        </section>
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 1rem;
          min-height: 600px;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          position: relative;
        }
        .loader {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .pagination-wrapper {
          margin-top: 2rem;
        }
        .search-text {
          font-style: italic;
        }
      `}</style>
    </main>
  );
};

export default CoursesSearch;
