import { Banner, HomeCourses } from "../components";
import { InterviewsContainer } from "./InterviewsContainer";
import { VideoListContainer } from "./VideoListContainer";

export function HomeContainer({ videoList, coursesSample, interviews }) {
  return (
    <main>
      <Banner />
      <VideoListContainer videoList={videoList} />
      <HomeCourses coursesSample={coursesSample} />
      <InterviewsContainer interviews={interviews} />
    </main>
  );
}
