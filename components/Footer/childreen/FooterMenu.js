import React from "react";
import Link from "next/link";

function FooterMenu() {
  return (
    <section>
      <div className="wrapper">
        <h1 className="title">menu</h1>
        <Link href="/our-story">
          <a>Our story</a>
        </Link>
        {/* <Link href="#">
          <a>Become an influencer</a>
        </Link> */}
        <Link href="/interviews">
          <a>Interviews</a>
        </Link>
        <Link href="/hashtag">
          <a>Hashtag Generator</a>
        </Link>
        <Link href="/courses">
          <a>Courses</a>
        </Link>
        <Link href="/news">
          <a>News</a>
        </Link>
        {/* <Link href="#">
          <a>Influencer goodies</a>
        </Link>
        <Link href="#">
          <a>Brand deals</a>
        </Link> */}
      </div>
      <style jsx>{`
        .title {
          font-size: 1.2rem;
          text-transform: uppercase;
          margin: 2rem 0;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          margin: auto;
          min-width: 23ch;
        }
        a {
          color: inherit;
          text-decoration: none;
          margin-bottom: 21px;
        }
        a:hover {
          color: #000;
          font-weight: bold;
        }
        @media (max-width: 600px) {
          .wrapper {
            margin-right: 10px;
          }
        }
      `}</style>
    </section>
  );
}

export default FooterMenu;
