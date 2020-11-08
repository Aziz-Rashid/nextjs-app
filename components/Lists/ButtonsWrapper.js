export const ButtonsWrapper = ({ page, total, limit, fn, queryVariable }) => {

  return (
    <div className="btn-wrapper">
      <a
        className="btn-prev"
        aria-label="previous"
        href={`/?${queryVariable}=${page > 0 ? page - 1 : 0}`}
        onClick={(e) => {
          e.preventDefault();
          if (page < 1) return;
          if (typeof fn === "function") {
            fn(page - 1);
          }
        }}
      />
      <a
        className="btn-next"
        aria-label="next"
        href={`/?${queryVariable}=${
          (page + 1) * limit < total ? page + 1 : page
        }`}
        onClick={(e) => {
          e.preventDefault();
          if ((page + 1) * limit > total) return;
          if (typeof fn === "function") {
            fn(page + 1);
          }
        }}
      />

      <style jsx>{`
        .btn-wrapper {
          position: absolute;
          bottom: 2rem;
          left: 0;
          right: 0;
          text-align: center;
        }
        .btn-prev,
        .btn-next {
          display: inline-block;
          width: 40px;
          height: 40px;
          background-size: cover;
          border: none;
          margin: 0 0.5rem;
          cursor: pointer;
        }
        .btn-prev {
          background: url("/img/previous.png");
        }
        .btn-next {
          background: url("/img/next.png");
        }
        .btn-prev:active,
        .btn-next:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};
