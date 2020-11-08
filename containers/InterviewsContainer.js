import { useState } from "react";
import {
  Card,
  ButtonsWrapper,
  Grid,
  InterviewsStats,
  Wrapper,
} from "../components";

export const InterviewsContainer = ({ interviews: p_interviews }) => {

  async function fetchInterviews(page) {
    try {
      const res = await fetch(`api/interviews?page=${page}`);
      const interviews = await res.json();
      setInterviews(interviews);
    } catch (error) {
      console.error(error);
    }
  }
  
  const [interviews, setInterviews] = useState(p_interviews);

  const { videos, page, limit, total } = interviews;

  return (
    <section>
      <Wrapper>
        <h1 className="title">Go to your favorite influencer</h1>
        <Grid
          items={videos.map((interview) => (
            <Card
              key={interview.id}
              hrefAtr="/influencer/[...slug]"
              url={`/influencer/${interview.slug}`}
              alt={interview.title}
              {...interview}
            >
              <InterviewsStats viewCount={interview.viewCount} />
            </Card>
          ))}
        />
        <ButtonsWrapper
          page={page}
          limit={limit}
          total={total}
          fn={fetchInterviews}
          queryVariable="interview_page"
        />
      </Wrapper>
      <style jsx>{`
        section {
          background-color: #fff;
          padding: 1rem;
          padding-bottom: 8rem;
          position: relative;
        }
        .title {
          text-align: center;
          text-transform: uppercase;
          font-style: oblique;
          color: #1b202d;
          font-size: 1.8rem;
          lettre-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
};
