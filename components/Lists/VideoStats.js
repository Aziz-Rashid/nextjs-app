import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const VideoStats = ({ publishedAt, viewCount }) => {
  return (
    <div>
      <span>
        <img src="/img/views.png" alt="" />
        {viewCount}
      </span>
      <span>{dayjs(publishedAt).toNow(true)}</span>
      <style jsx>{`
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #333;
          margin-top: auto;
        }
        img {
          width: 1.5rem;
          opacity: 0.7;
          vertical-align: -0.1rem;
          margin-right: 0.2rem;
        }
      `}</style>
    </div>
  );
};