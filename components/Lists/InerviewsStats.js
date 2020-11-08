
export const InterviewsStats = ({ viewCount }) => (
  <div>
    <img src="/img/views.png" alt="" />
    <span>{viewCount}</span>
    <style jsx>{`
      div {
        color: #333;
        margin-top: auto;
      }
      img {
        width: 1.5rem;
        opacity: 0.7;
        vertical-align: -0.1rem;
        margin-right: .2rem;
      }
    `}</style>
  </div>
);

