import { useState } from "react";
import { Grid, ButtonsWrapper, Card, VideoStats, Wrapper } from "../components";

export const VideoListContainer = ({ videoList: p_videoList }) => {
 
  const fetchVideos = async (page) => {
    try {
      const res = await fetch(`/api/videos?page=${page}`);
      const videoList = await res.json();
      setVideoList(videoList);
    } catch (error) {
      console.error(error);
    }
  };

  const [videoList, setVideoList] = useState(p_videoList);

  const { videos, limit, page, total } = videoList;
  
  return (
    <section>
      <Wrapper>
        <h1 className="section-title">Latest Videos</h1>
        <Grid
          customStyles={{ minHeight: "530px" }}
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
        <ButtonsWrapper
          page={page}
          limit={limit}
          total={total}
          fn={fetchVideos}
          queryVariable="video_page"
        />
      </Wrapper>
      <style jsx>{`
        section {
          padding: 1rem;
          padding-bottom: 8rem;
          position: relative;
        }

        .section-title {
          text-align: center;
          text-transform: uppercase;
          font-style: oblique;
          color: #1b202d;
          font-size: 1.8rem;
          letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
};
