import Link from "next/link";
import { MdClose } from "react-icons/md";

export const PanelSubCategory = ({ open, onClose }) => (
  <div className={`wrapper ${open ? "open" : ""}`}>
    <div className="btn-close" onClick={onClose}>
      <MdClose size={"36px"} />
    </div>
    <div className="toolbare">
      <h1 className="title">SEARCH FILTER</h1>
      <div className="search-wrapper"></div>
      <p>
        <Link href={"/courses"} as={"/courses"}>
          <a className="show-all-categories">Show all categories</a>
        </Link>
      </p>
    </div>
    <style jsx>{`
      .toolbare {
        width: 250px;
        padding: 0.5rem;
      }

      h1,
      h2 {
        font-size: 1rem;
        color: rgba(0, 0, 0, 0.8);
        padding-left: 15px;
      }
      h1 {
        text-transform: uppercase;
        margin: 15px;
        padding: 0 0 15px;
      }
      h1.title {
        border-bottom: solid thin rgba(0, 0, 0, 0.1);
      }
      .btn-close {
        display: none;
      }
      .show-all-categories {
        padding-left: 15px;
        color: #2851fa;
        text-decoration: none;
        font-weight: bold;
      }
      .show-all-categories:active {
        color: #2851fa;
      }
      .show-all-categories:hover {
        color: #2871fa;
      }
      .wrapper {
        position: absolute;
        left: 0;
        top: 0;
        background: white;
        padding: 0.5rem;
        z-index: 2;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
        transform: translate(-2000%);
        transition: all 300ms ease-in 0s;
      }
      @media (max-width: 900px) {
        .wrapper {
          transform: translate(-120%);
        }
        .open {
          transform: translate(0);
        }
        .btn-close {
          display: block;
          position: absolute;
          top: 5px;
          right: 5px;
          cursor: pointer;
        }
      }
    `}</style>
  </div>
);
