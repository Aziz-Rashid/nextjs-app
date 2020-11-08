import React from "react";
import FooterMenu from "./childreen/FooterMenu";
import Social from "./childreen/Social";
import Service from "./childreen/Service";
import About from "./childreen/About";

export function Footer() {
  return (
    <footer>
      <div className="wrapper">
        <About />
        <FooterMenu />
        <Service />
        <Social />
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} The Moti. All Rights Reserved.
      </div>
      <style jsx>{`
        footer {
          padding: 0 2rem 1rem;
          color: #333;
          background-color: #faf9fd;
        }
        .wrapper {
          max-width: 1200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          margin: auto;
        }
        .copyright {
          border-top: solid thin #333;
          margin-top: 1em;
          padding-top: 1em;
          color: #333;
          max-width: 1200px;
          margin: auto;
        }

        @media (max-width: 600px) {
          .wrapper {
            justify-content: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
