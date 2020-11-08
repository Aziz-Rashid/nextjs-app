import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

const YoutubePlayer = ({ vidId, onEnded }) => {
  const [id, setId] = useState(null);

  // I have to use this effect to remove the youtube player from the DOM and then add it after one second
  useEffect(() => {
    setId(null);
    const timer = setTimeout(() => {
      vidId && setId(vidId);
    }, 1000);
    return () => clearTimeout(timer);
  }, [vidId]);

  return (
    <div className="container">
      <div className="sub-container">
        <div className="wrapper">
         {id && <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
            height="100%"
            style={{ heigth: "100%", width: "100%" }}
            playing={true}
            onEnded={onEnded}
            
          />}
        </div>
      </div>

      <style jsx>{`
        .container {
          flex: 2;
        }
        .sub-container {
          padding-top: 56.25%;
          margin: 0 0.5rem;
          position: relative;
        }
        .wrapper {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          background-color: black;
        }
      `}</style>
    </div>
  );
};

export default YoutubePlayer;
