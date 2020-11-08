import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { MdSearch, MdClose } from "react-icons/md";

const GlobalSearch = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [isShowResult, setIsShowResult] = useState(false);
  const [blur, setBlur] = useState(false);
  const [result, setResult] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (input.length < 2) {
      setResult([]);
      return;
    }
    if (input.length % 2 !== 0) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(`/api/search?q=${input}`);
        const json = await result.json();
        setResult(json);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [input]);

  useEffect(() => {
    let timeout;
    if (blur) {
      timeout = setTimeout(() => {
        setIsShowResult(false);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [blur]);

  const handleShowModal = () => {
    document.body.classList.add("viewport");
    setShowModal(true);
  };
  const handleCloseModal = () => {
    document.body.classList.remove("viewport");
    setShowModal(false);
    setInput("");
  };

  return (
    <>
      {showModal && (
        <>
          <div className="modal" />
          <div
            className="btn-close-search"
            role="button"
            aria-label="close search"
            onClick={handleCloseModal}
          >
            <MdClose size={"36px"} color={"white"} />
          </div>
        </>
      )}
      <div className="mobile-search" onClick={handleShowModal}>
        <MdSearch size={"36px"} />
      </div>
      <div
        className={`wrapper ${showModal ? "mobile-wrapper" : ""}`}
        onBlur={() => setBlur(true)}
      >
        <form
          role="search"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.length < 2) return;
            setInput("");
            setResult([]);
            handleCloseModal();
            router.push(`/search?q=${input}`);
          }}
        >
          <label htmlFor="search-input" className="label-search">
            Search
          </label>
          <div className="search-wrapper">
            <FaSearch size="1.2em" color="#6717cd" />
            <div className="search-input-wrapper">
              <input
                id="search-input"
                autoComplete="off"
                aria-label="search The Moti website"
                type="search"
                value={input}
                placeholder="Search for anything"
                onChange={(e) => {
                  const value = e.target.value;
                  setInput(value);
                  if (value < 2) {
                    setResult([]);
                  }
                }}
                onFocus={() => {
                  setIsShowResult(true);
                  setBlur(false);
                }}
              />
            </div>
            <button className="btn-search" type="submit">
              Search
            </button>
          </div>
        </form>

        <ul className="result">
          {isLoading ? (
            <p>Loading....</p>
          ) : isShowResult && result.length ? (
            <div className="result-container">
              {result.map((r) =>
                r.type === "course" ? (
                  <li key={r.id}>
                    <Link href="/courses/[id]/[sub]/[title]" as={r.url}>
                      <a onClick={handleCloseModal}>
                        <span className="result-type">{r.type}:</span>{r.title}
                      </a>
                    </Link>
                  </li>
                ) : (
                  <li key={r.id}>
                    <Link href="/influencer/[...slug]" as={r.url}>
                      <a onClick={handleCloseModal}>
                      <span className="result-type">{r.type}:</span>{r.title}
                      </a>
                    </Link>
                  </li>
                )
              )}
            </div>
          ) : null}
        </ul>
      </div>
      <style jsx>{`
        .wrapper {
          position: relative;
          margin: auto;
          width: 400px;
        }
        .search-wrapper {
          display: flex;
          align-items: center;
          background-color: #faf9fd;
          padding-left: 0.5rem;
          border-radius: 4px;
          border: thin solid rgb(103, 23, 205, 0.1);
        }
        .label-search {
          visibility: hidden;
          position: absolute;
          top: -9999px;
        }
        .btn-search {
          border: none;
          background: linear-gradient(to right, #6717cd, #2871fa);
          color: white;
          padding: 0.5em 1em;
          cursor: pointer;
        }
        .btn-search:hover {
          background: linear-gradient(to left, #6717cd, #2871fa);
        }
        .search-input-wrapper {
          flex: 1;
        }
        input {
          width: 100%;
          min-width: 150px;
          border: none;
          padding-left: 0.5em;
          background: transparent;
          outline: 0;
        }
        .result {
          position: absolute;
          background: white;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 111;
          padding: 0;
          margin: 0;
        }
        .result-container {
          padding: 0.5rem 0;
          height: 500px;
          min-height: 300px;
          max-height: 70vh;
          overflow-y: auto;
          margin: 5px 0 0;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
        .result li {
          list-style: none;
        }
        .result a {
          text-decoration: none;
          color: inherit;
          padding: 0.5em;
          display: block;
        }
        .result a:hover {
          background-color: #faf9fd;
          color: #000;
        }
        .result-type{
          text-transform: capitalize;
          font-weight: bold;
          margin-right: .5em;
        }
        .mobile-search,
        .btn-close-search {
          display: none;
        }

        @media (max-width: 600px) {
          .wrapper {
            display: none;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: linear-gradient(135deg, #6717cd 10%, #2871fa 90%);
            z-index: 5;
          }
          .mobile-search {
            display: block;
            padding: 0 0.5rem;
          }
          .mobile-wrapper {
            display: block;
            width: auto;
            position: absolute;
            top: 10px;
            left: 10px;
            right: 50px;
            z-index: 6;
          }
          .btn-close-search {
            display: block;
            position: absolute;
            top: 10px;
            right: 5px;
            width: min-content;
            z-index: 6;
          }
        }
      `}</style>
    </>
  );
};

export default GlobalSearch;
