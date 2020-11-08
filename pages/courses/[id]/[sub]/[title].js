import Error from "next/error";
import Head from "next/head";
import {
  getBaseUrl,
  categories as libCategories,
  slugify,
} from "../../../../lib";
import { Wrapper } from "../../../../components";

const Courses = ({ course, error }) => {
  if (error) {
    return <Error statusCode={error} />;
  }
  return (
    <Wrapper>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@themoticom" />
        <meta name="twitter:creator" content="@themoticom" />
        {/* <meta property="og:url" content={url} /> */}
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.headline} />
        <meta property="og:image" content={course.img} />
        <title>The Moti Course: {course.title}</title>
        <meta name="description" content={course.headline} />
      </Head>
      <main>
        <div className="container">
          <div className="container-left">
            <h1>{course.title}</h1>
            <p>{course.headline}</p>
            <a
              className="btn-buy"
              href={course.url}
              target="_blanck"
              rel="noopener noreferrer"
            >
              {course.price} Buy
            </a>
          </div>
          <div className="container-right">
            <img src={course.img} alt="" />
          </div>
        </div>

        <style jsx>{`
          main {
            min-height: calc(100vh - 125px);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem 0;
          }
          .container {
            display: flex;
            flex-wrap: wrap-reverse;
            box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
              0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
            padding: 5rem 2rem;
            justify-content: center;
            background: #fefefe;
          }
          .container-left {
            flex: 1;
            padding: 0.5rem 1rem;
            min-width: 500px;
          }
          .container-right {
            width: 480px;
            height: 270px;
          }
          img {
            width: 100%;
            max-width: 480px;
            margin-bottom: 1rem;
          }
          .btn-buy {
            background-image: linear-gradient(to right, #6717cd, #2871fa);
            padding: 0.7em 1.4em;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            align-self: flex-start;
            margin: 20px 0;
            text-transform: uppercase;
          }
          .btn-buy:hover {
            background-image: linear-gradient(to left, #6717cd, #2871fa);
          }
          h1 {
            font-size: 2.3rem;
          }
          p {
            font-size: 1.3rem;
            line-height: 1.5;
          }
          @media (max-width: 1000px) {
            .container {
              padding: 3rem 2rem;
            }
            .container-right {
              width: auto;
              height: auto;
            }
            .container-left {
              min-width: 250px;
            }
          }
        `}</style>
      </main>
    </Wrapper>
  );
};

export async function getServerSideProps({ query }) {
  console.log("query =", query);
  const { page, id, sub, title } = query;
  console.log("page =", page, "id =", id, "sub =", sub, "title =", title);
  const baseUrl = getBaseUrl();

  let category = Object.keys(libCategories).find((e) => slugify(e) === id);
  if (!category) {
    return {
      props: {
        error: 404,
      },
    };
  }
  const subcategory = libCategories[category].find((e) => slugify(e) === sub);

  if (!subcategory) {
    return {
      props: {
        error: 404,
      },
    };
  }

  let course;

  try {
    const fetchCourses = await fetch(`${baseUrl}/api/courses/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: `${id}/${sub}/${title}`,
      }),
    });
    if (fetchCourses.status === 200) {
      course = await fetchCourses.json();
    } else {
      return {
        props: {
          error: 404,
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 500,
      },
    };
  }

  return {
    props: {
      course,
    },
  };

  // Pass data to the page via props
}

export default Courses;
