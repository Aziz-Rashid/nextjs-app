import Head from "next/head";
import { getBaseUrl } from "../lib";
import { HomeContainer } from "../containers";

const Home = ({ interviews, videoList, coursesSample }) => {
  return (
    <>
      <Head>
        <script
          data-ad-client="ca-pub-8739307908289324"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        />
        <title>{"The Moti | Source of Influencers"}</title>
        <meta
          name="description"
          content={
            "The Moti - Source of Influencers : is an online platform that focusses on the world of influencers. What is their story? What is their passion?"
          }
        />
      </Head>
      <HomeContainer
        interviews={interviews}
        videoList={videoList}
        coursesSample={coursesSample}
      />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { video_page = 0, interview_page = 0 } = query;
  const baseUrl = getBaseUrl();
  let interviews = {
    videos: [],
    total: 0,
    page: 0,
    limit: 8,
  };
  let videoList = {
    videos: [],
    total: 0,
    page: 0,
    limit: 8,
  };
  let coursesSample = {
    courses: [],
    slectedCategory: "",
  };

  try {
    const fetchInterviews = await fetch(
      `${baseUrl}/api/interviews?page=${interview_page}`
    );
    if (fetchInterviews.status === 200) {
      interviews = await fetchInterviews.json();
    }

    const fetchVideos = await fetch(`${baseUrl}/api/videos?page=${video_page}`);
    if (fetchVideos.status === 200) {
      videoList = await fetchVideos.json();
    }

    const fetchSample = await fetch(`${baseUrl}/api/courses/sample`);
    if (fetchSample.status === 200) {
      const { sample, category } = await fetchSample.json();
      coursesSample = { courses: sample, slectedCategory: category };
    }
  } catch (error) {
    console.error(error);
  }

  return { props: { interviews, videoList, coursesSample } };
}

export default Home;
