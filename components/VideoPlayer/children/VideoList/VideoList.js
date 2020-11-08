import React, { useRef } from "react";
import VideoListItem from "./VideoListItem";

const VideoList = ({ videos }) => {
  const ref = useRef();
  const scroll = (top = 1000) => {
    ref.current.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  console.log("update videoList");
  return (
    <div className="wrapper">
      <div className="container" ref={ref}>
        {videos.map((video) => (
          <VideoListItem
            key={video.id}
            video={video}
            scroll={scroll}
          />
        ))}
      </div>
      <style jsx>{`
        .wrapper {
          flex: 1;
          position: relative;
        }
        .container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: auto;
        }
        @media (max-width: 1000px){
          .wrapper {
            height: 250px;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoList;
