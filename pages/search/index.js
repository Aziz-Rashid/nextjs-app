import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Course, Grid, Card, VideoStats, Wrapper } from "../../components";
import { Pagination } from "../../components/Pagination";

// function BackButton({ children }) {
//   const router = useRouter();
//   return (
//     <button type="button" onClick={() => router.back()}>
//       {children}
//     </button>
//   );
// }

const Search = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isFetchingCourses, setIsFetchingCourses] = useState(true);
  const [isFetchingVideos, setIsFetchingVideos] = useState(true);

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [pageCourses, setPageCourses] = useState(0);
  const [pageVideos, setPageVideos] = useState(0);

  const { q } = router.query;
  useEffect(() => {
    if (!q) {
      return;
    }
    setIsFetchingVideos(true);
    const fetchVideos = async () => {
      try {
        const res = await fetch(`/api/search/videos`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ q, page: pageVideos }),
        });

        const { videos, total } = await res.json();

        setVideos(videos);
        setTotalVideos(total);
      } catch (error) {
        console.error(error);
      }
      setIsFetchingVideos(false);
    };
    fetchVideos();
  }, [pageVideos, q]);

  useEffect(() => {
    if (!q) {
      return;
    }
    setIsFetchingCourses(true);
    const fetchCourses = async () => {
      try {
        const res = await fetch(`/api/search/courses`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ q, page: pageCourses }),
        });
        const { courses, total } = await res.json();
        setCourses(courses);
        setTotalCourses(total);
      } catch (error) {
        console.error(error);
      }
      setIsFetchingCourses(false);
    };
    fetchCourses();
  }, [q, pageCourses]);

  if (isFetchingCourses || isFetchingVideos) {
    return (
      <Wrapper>
        <div className="container">
          <p className="loader">Loading....</p>

          <style jsx>{`
            .container {
              height: 600px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </div>
      </Wrapper>
    );
  }

  if (
    !isFetchingCourses &&
    !isFetchingVideos &&
    !videos.length &&
    !courses.length
  ) {
    return (
      <Wrapper>
        <div className="container">
        <p className="search">Search result for: {q} </p>
        <p>Not found</p>

          <style jsx>{`
            .container {
              height: 400px;
              margin: 3rem 0;              
            }
            .search{
              font-style: italic;
            }
          `}</style>
        </div>
       
      </Wrapper>
    );
  }
  return (
    <main>
      <Wrapper>
        {/* <BackButton>Go back</BackButton> */}
        <p className="search-text">Search result for: {q} </p>
        {videos.length > 0 && (
          <section>
            <h1>Videos</h1>
            <Grid
              // customStyles={{ minHeight: "530px" }}
              items={videos.map((video) => (
                <Card
                  key={video.id}
                  hrefAtr={`/influencer/[...slug]`}
                  url={
                    video.playlistId
                      ? `/influencer/${video.playlistId}/${video.slug}`
                      : `/influencer/video/${video.slug}`
                  }
                  alt={video.title.slice(0, video.title.indexOf("."))}
                  {...video}
                >
                  <VideoStats {...video} />
                </Card>
              ))}
            />
            {totalVideos > 20 ? (
              <div className="pagination-wrapper">
                <Pagination
                  page={pageVideos}
                  onChange={(p) => {
                    setPageVideos(p);
                  }}
                  total={Math.ceil(totalVideos / 20)}
                  url={"/courses?page="}
                />
              </div>
            ) : null}
          </section>
        )}

        {courses.length > 0 && (
          <section >
            <h1>Courses</h1>
            <div className="container">
              {courses.map((course) => (
                <Course key={course.id} cours={course} />
              ))}
            </div>
            {!isFetchingCourses && totalCourses > 20 ? (
              <div className="pagination-wrapper">
                <Pagination
                  page={pageCourses}
                  onChange={(p) => {
                    setPageCourses(p);
                  }}
                  total={Math.ceil(totalCourses / 20)}
                  url={"/courses?page="}
                />
              </div>
            ) : null}
          </section>
        )}
      </Wrapper>
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
        }
        section{
          margin: 3rem 0;
        }
        .pagination-wrapper{
          margin-top: 2rem;
        }
        h1 {
          text-align: center;
          text-transform: uppercase;
          font-style: oblique;
          color: #1b202d;
          font-size: 1.8rem;
          lettre-spacing: 0.1em;
          margin-top: 3rem;
          letter-spacing: 0.1em;
        }
        .search-text {
          font-style: italic;
          margin: 2rem 0;
        }
       
      `}</style>
    </main>
  );
};

export default Search;
