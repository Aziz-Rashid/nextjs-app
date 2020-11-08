import React, { useState } from "react";
import { useRouter } from "next/router";
import YoutubePlayer from "./children/YoutubePlayer";
import { VideoList } from "./children/VideoList";
import Controls from "./children/Controls";

export const VideoPlayer = ({ playlist }) => {
  const router = useRouter();
  const {videos = []} = playlist;

  const playNextVideo = () => {
    const index = videos.findIndex((v) => v.active);
    if (isShuffle) {
      const ran = Math.floor(Math.random() * videos.length);
      router.push(
        "/influencer/[...slug]",
        `/influencer/${videos[ran].playlistId || "video"}/${videos[ran].slug}`
      );
      return;
    }

    if (index < videos.length - 1) {
      router.push(
        "/influencer/[...slug]",
        `/influencer/${videos[index + 1].playlistId || "video"}/${
          videos[index + 1].slug
        }`
      );
    } else if (isLoop) {
      router.push(
        "/influencer/[...slug]",
        `/influencer/${videos[0].playlistId || "video"}/${videos[0].slug}`
      );
    }
  };

  const [isLoop, setIsLoop] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  return (
    <div className="container">
      <YoutubePlayer
        vidId={videos.find((v) => v.active).id}
        onEnded={playNextVideo}
      />

      <div className="list-container">
        <div className="sub-container">
          <Controls
            playlist={playlist}
            loop={setIsLoop}
            shuffle={setIsShuffle}
            isLoop={isLoop}
            isShuffle={isShuffle}
          />
          <VideoList
            videos={videos}
            currentVideo={videos.find((v) => v.active)}
          />
        </div>
      </div>
      <style jsx>{`
      
        @media (min-width: 1001px) {
          .container {
            width: 100%;
            display: flex;
          }
          .list-container {
            flex: 1;
            position: relative;
            min-width: 350px;
          }
          .sub-container {
            display: flex;
            flex-direction: column;
            position: relative;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};


