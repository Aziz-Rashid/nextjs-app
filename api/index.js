// Fetch courses
export const getCourses = async ({
  categories = [],
  page = 0,
  sort_by_date,
  sort_by_price,
  limit = 6,
}) => {
  const filtedCategories = categories.filter((c) => c.active);
  try {
    const body = {
      categories: filtedCategories.length
        ? filtedCategories.map((el) => el.name)
        : undefined,
      sub_categories: filtedCategories.length
        ? filtedCategories.reduce(
            (acc, el) => [
              ...acc,
              ...el.subcategories.filter((s) => s.active).map((c) => c.name),
            ],
            []
          )
        : undefined,
      page,
      sort_by_date,
      sort_by_price,
      limit,
    };
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};


