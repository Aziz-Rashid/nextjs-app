import React from "react";
import { MdLoop, MdShuffle } from "react-icons/md";

const Controls = ({ playlist, loop, isLoop, shuffle, isShuffle }) => {
  return (
    <div className="container">
      <button
        className={`${isLoop && !isShuffle ? "active" : ""}`}
        onClick={() => {
          if (isShuffle) loop(false);
          loop(!isLoop);
        }}
      >
        <MdLoop size="1.8em" />
      </button>
      <button
        className={`${isShuffle ? "active" : ""}`}
        onClick={() => {
          shuffle(!isShuffle);
          loop(false);
        }}
      >
        <MdShuffle size="1.8em" />
      </button>
      <h1>{playlist.title}</h1>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
        }
        h1 {
          font-size: 1.1rem;
          margin: 0 auto 0;
          text-transform: capitalize;
        }

        button {
          border: none;
          background: transparent;
          padding: 5px;
          margin: 0 0.5rem 0.2rem;
          border-radius: 50%;
          cursor: pointer;
        }

        button:hover {
          background: rgba(0, 0, 0, 0.1);
        }
        .active {
          color: #2871fa;
        }

        @media (max-width: 1000px){
          .container {
            margin-top: 1rem;
          }
        }

      `}</style>
    </div>
  );
};

export default Controls;
