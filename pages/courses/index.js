import Error from "next/error";
import Head from "next/head";
import { getBaseUrl, categories as libCategories, SORT } from "../../lib";
import { CoursesContainer } from "../../containers";

const CoursesPage = ({
  courses = [],
  total = 0,
  limit = 6,
  categories = [],
  sort_by_price = SORT.ASC,
  sort_by_date = SORT.ASC,
  error,
  openFilter,
}) => {
  if (error) {
    return <Error statusCode={error} />;
  }
  return (
    <>
      <Head>
        <title>The Moti Courses</title>
        <meta
          name="description"
          content="Learn how to bacome an Influencer by folowing the moti courses"
        />
      </Head>
      <CoursesContainer
        p_courses={courses}
        p_total={total}
        limit={limit}
        p_categories={categories}
        sort_by_price={sort_by_price}
        sort_by_date={sort_by_date}
        p_openFilter={openFilter}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { page, filter } = query;

  const baseUrl = getBaseUrl();
  const limit = 24;
  let categories = [];
  let parsedFilter = null;
  let q = {};
  let openFilter = false;
  if (filter) {
    parsedFilter = JSON.parse(filter);
  }
  if (parsedFilter && parsedFilter.length) {
    const activeCategories = parsedFilter.map((el) => el.name);
    const activeSubcategories = parsedFilter
      .map((el) => el.subcategories)
      .flat();
    categories = Object.keys(libCategories).map((el, i) => ({
      id: i,
      name: el,
      active: activeCategories.includes(el),
      subcategories: libCategories[el].map((s, idx) => ({
        id: i + "-" + idx,
        categoryId: i,
        name: s,
        active: activeSubcategories.includes(s),
      })),
    }));
    q = {
      page,
      limit,
      categories: activeCategories.length ? activeCategories : undefined,
      sub_categories: activeSubcategories.length
        ? activeSubcategories
        : undefined,
    };
    openFilter = true;
  } else {
    categories = Object.keys(libCategories).map((el, i) => ({
      id: i,
      name: el,
      active: false,
      subcategories: libCategories[el].map((s, idx) => ({
        id: i + "-" + idx,
        categoryId: i,
        name: s,
        active: false,
      })),
    }));
    q = { page, limit };
  }
  try {
    const fetchCourses = await fetch(`${baseUrl}/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(q),
    });
    if (fetchCourses.status === 200) {
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
          categories,
          sort_by_date,
          sort_by_price,
          limit,
          openFilter,
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
}

export default CoursesPage;
