import { useEffect, useState } from "react";

export const BackToTop = () => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const displayBackToTop = () => {
      const scroll = window.pageYOffset;
      if (scroll > 175) {
        if (!display) setDisplay(true);
      } else {
        if (display) setDisplay(false);
      }
    };
    window.addEventListener("scroll", displayBackToTop, { passive: true });
    return () => window.removeEventListener("scroll", displayBackToTop);
  }, [display]);
  return (
    <div
      role="button"
      aria-label="back to top"
      className={display ? "visible" : ""}
      onClick={() => {
        if (display) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <img className="arrow" src="/img/backtotop.png" alt="" />
      <img className="arrow-black" src="/img/backtotop-black.png" alt="" />
      <style jsx>{`
        div {
          position: fixed;
          width: 40px;
          height: 40px;
          right: 1.5rem;
          bottom: 3rem;
          opacity: 0;
          transition: opacity 0.5s ease-in;
          z-index: 9000;
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
        }
        .arrow-black {
          opacity: 0;
        }
        .visible {
          opacity: 1;
          cursor: pointer;
        }
        @media only screen {
          .arrow-black {
            opacity: 1;
          }
          div:hover .arrow-black {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
