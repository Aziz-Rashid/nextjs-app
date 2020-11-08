import React from "react";
import Link from "next/link";

export function Logo({ height = "auto", width = "auto", maxWidth = "100%", minWidth }) {
  return (
    <div>
      <Link href="/">
        <a>
          <img src="/img/themoti.png" alt="the moti logo" />
        </a>
      </Link>
      <style jsx>{`
        img {
          height: ${height};
          width: ${width};
          max-width: ${maxWidth};
          min-width: ${minWidth}
        }
        div {
          margin: 0 1rem 0 .5rem;
        }
        @media (max-width: 600px){
          div {
            margin: auto;
          }
        }
      `}</style>
    </div>
  );
}

