import Head from "next/head";
import Error from "next/error";
import {
  getBaseUrl,
  categories as libCategories,
  slugify,
  SORT,
} from "../../../lib";

import { CoursesContainerCategory } from "../../../containers";

const CoursesCategoryPage = ({
  courses = [],
  total = 0,
  limit = 6,
  sort_by_price = SORT.ASC,
  sort_by_date = SORT.ASC,
  error,
  category,
  page,
}) => {
  if (error) {
    return <Error statusCode={error} />;
  }

  return (
    <>
      <Head>
        <title>The Moti Courses: {category.name}</title>
        <meta
          name="description"
          content="Learn how to bacome an Influencer by flowing the moti courses"
        />
      </Head>
      <CoursesContainerCategory
        p_courses={courses}
        p_total={total}
        p_page={page}
        limit={limit}
        p_category={category}
        sort_by_price={sort_by_price}
        sort_by_date={sort_by_date}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { page, id } = query;
  // console.log({ page, id });
  const limit = 24;

  const baseUrl = getBaseUrl();
  const categoryName = Object.keys(libCategories).find(
    (e) => slugify(e) === id
  );
  if (!categoryName) {
    return {
      props: {
        error: 404,
      },
    };
  }
  const category = {
    id: 0,
    active: true,
    name: categoryName,
    subcategories: libCategories[categoryName].sort().map((s, idx) => ({
      id: 0 + "-" + idx,
      categoryId: 0,
      name: s,
      active: false,
    })),
  };
  const body = {
    categories: [categoryName],
    page,
    limit,
  };
  // console.log("body =", body);
  try {
    const fetchCourses = await fetch(`${baseUrl}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const {
      courses,
      total,
      sort_by_date,
      sort_by_price,
    } = await fetchCourses.json();

    return {
      props: {
        courses,
        total,
        sort_by_date,
        sort_by_price,
        category,
        page: page ? Number(page) : 0,
        limit,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 500,
      },
    };
  }

  // Pass data to the page via props
}

export default CoursesCategoryPage;
