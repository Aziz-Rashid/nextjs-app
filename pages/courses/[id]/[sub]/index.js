import Head from "next/head";
import Error from "next/error";
import {
  getBaseUrl,
  categories as libCategories,
  slugify,
} from "../../../../lib";

import { CoursesContainerSubcategory } from "../../../../containers";

const Courses = ({
  courses = [],
  total,
  sort_by_date,
  sort_by_price,
  category,
  page = 0,
  limit = 6,
  error,
}) => {
  if (error) {
    return <Error statusCode={error} />;
  }
  return (
    <>
      <Head>
        <title>
          The Moti Courses: {category.name} - {category.subcategories[0]?.name}
        </title>
        <meta
          name="description"
          content="Learn how to bacome an Influencer by flowing the moti courses"
        />
      </Head>
      <CoursesContainerSubcategory
        p_courses={courses}
        p_total={total}
        limit={limit}
        p_page={page}
        p_category={category}
        sort_by_date={sort_by_date}
        sort_by_price={sort_by_price}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const limit = 24;

  const { page, id, sub } = query;

  const baseUrl = getBaseUrl();

  let categoryName = Object.keys(libCategories).find((e) => slugify(e) === id);
  if (!categoryName) {
    return {
      props: {
        error: 404,
      },
    };
  }
  const subcategoryName = libCategories[categoryName].find(
    (e) => slugify(e) === sub
  );
  if (!subcategoryName) {
    return {
      props: {
        error: 404,
      },
    };
  }
  const category = {
    id: 0,
    name: categoryName,
    active: true,
    subcategories: [
      {
        id: "0-0",
        categoryId: 0,
        name: subcategoryName,
        active: true,
      },
    ],
  };

  try {
    const fetchCourses = await fetch(`${baseUrl}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: [categoryName],
        sub_categories: [subcategoryName],
        page,
        limit,
      }),
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
}

export default Courses;
