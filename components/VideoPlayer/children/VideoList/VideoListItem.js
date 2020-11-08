import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router"

const VideoListItem = ({ video,  scroll }) => {
  const ref = useRef();
  const router = useRouter()
  useEffect(() => {
    if (video.active) {
      const top = ref.current.offsetTop;
      scroll(top);
    }
  }, [scroll, video.active]);
  return (
    <div
      ref={ref}
      className={`${video.active ? "active" : ""}`}
      onClick={() => {        
        router.push("/influencer/[...slug]" , `/influencer/${video.playlistId || "video"}/${video.slug}`)
      }}
    >
      <img src={video.thumbnail} alt="" />
      <h1>{video.title}</h1>
      <style jsx>{`
        div {
          height: 110px;
          display: flex;
          align-items: flex-start;
          cursor: pointer;
          padding: 0.5rem 0;
        }
        div:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        h1 {
          font-size: 0.8rem;
          margin: 0;
          padding: 0 .5em;
        }
        img {
          height: 100%;
        }
        .active {
          background: rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </div>
  );
};

export default VideoListItem;
