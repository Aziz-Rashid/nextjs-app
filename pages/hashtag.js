import Head from "next/head";
import { useState } from "react";
import { ModalSpinner } from "../components";
import {FaSearch} from "react-icons/fa";
import {FaClipboardList} from "react-icons/fa";
import {FaArrowAltCircleLeft} from "react-icons/fa";
// import {HorizontalBar} from "react-chartjs-2";

export default function Hashtag() {
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [response, setResponse] = useState({ best_30_hashtags: { hashtags: [] } });
    const [isCopied, setIsCopied] = useState(false);
    /*const [graph, setGraph] = useState({
        labels: [],
        datasets: [
            {
                label: 'Relevance',
                backgroundColor: 'rgba(204, 15, 63, 0.2)',
                borderColor: 'rgba(204, 15, 63, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(204, 15, 63, 0.4)',
                hoverBorderColor: 'rgba(204, 15, 63, 1)',
                data: []
            }
        ]
    });*/

    const copyToClipboard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const copyHashtags = async () => {
        const copyText = await document.getElementById("hashtags-list");
        const hashtags = copyText.textContent.replace(/#/g, " #").substring(1)

        copyToClipboard(hashtags)
        setIsCopied(true)

        setTimeout(function() {
            setIsCopied(false)
        }, 3000);
    }

    const generateNewHashtags = ()  => {
        setSuccess(false)
        setSearch("")
    }

    const callApi = async () => {
        setError("");
        setIsFetching(true);
        await fetch("/api/hashtags", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({search}),
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    console.log(res.data)
                    const data = res.data.data
                    setResponse(data.best_30_hashtags)

                    /*const hashtagsArray = data.hashtags.map(item => item.hashtag)
                    const relevanceArray = data.hashtags.map(item => item.relevance)

                    const graphLabels = graph
                    graphLabels.labels = hashtagsArray.slice(0, 10);
                    graph.datasets[0].data = relevanceArray.slice(0, 10);
                    setGraph(graph)*/
                    setSuccess(true)

                    setIsFetching(false);
                } else {
                    setError(res.message)
                    setIsFetching(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsFetching(false);
            });
    }

    return (
        <main>
            <Head>
                <title>The Moti: Hashtag generator</title>
                <meta name="description" content="hashtag generator" />
            </Head>
            { success ? (
                <div className="hashtag-result-wrapper">
                    <section className="hashtag-wrapper">
                        <div>
                            <div className="hashtag-header">
                                <h1 className="hashtag-subtitle">Hashtags</h1>
                                <div className="btn-hashtag-back" onClick={generateNewHashtags}>
                                    <FaArrowAltCircleLeft size="1.2em" /> Generate new hashtags
                                </div>
                            </div>
                            <p id="hashtags-list">
                                {response.hashtags.map((item, index) => (
                                    <span key={index}>#{item}</span>
                                ))}
                            </p>
                            { isCopied &&
                            <div className="copied-text">
                                Copied successfully
                            </div>
                            }
                            <div className="btn-hashtag-container">
                                <button
                                    className="btn-hashtag"
                                    type="button"
                                    onClick={copyHashtags}
                                >
                                    <FaClipboardList size="1.2em" /> Copy all hashtags
                                </button>
                            </div>
                        </div>
                    </section>
                    {/*<section className="hashtag-wrapper" style={{marginTop: "0"}}>
                        <HorizontalBar data={graph} height={110} />
                    </section>*/}
                </div>
            ) : (
                <section className="hashtag-wrapper">
                    <div>
                        <h1 className="hashtag-title">Hashtag Generator</h1>
                        <p className="hashtag-text">
                            Automatically Generate Relevant Hashtags Based on Keywords
                        </p>
                        <form
                            className="form-hashtag"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                callApi();
                            }}
                        >
                            <div className="search-wrapper">
                                <div className="search-input-wrapper">
                                    <input
                                        id="search-input"
                                        aria-label="Search for hashtags"
                                        type="text"
                                        value={search}
                                        placeholder="Type your hashtag..."
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <button className='btn-search' type="submit">
                                    <FaSearch size="1.2em" />
                                </button>
                            </div>
                            {isFetching && (
                                <ModalSpinner
                                    width="100%"
                                    height="100%"
                                    position="absolute"
                                />
                            )}
                        </form>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                </section>
            )}
            <style jsx>{`
        .copied-text {
          text-transform: uppercase;
          color: #2fc47c;
          font-weight: bold;
          font-size: 1.2rem;
          text-align: center;
        }
        .error-text {
          text-transform: uppercase;
          color: #d63131;
          font-weight: bold;
          font-size: 1.2rem;
          text-align: center;
        }
        .hashtag-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .btn-hashtag-back {
          color: #6717cd;
          cursor: pointer;
        }
        
        .hashtag-result-wrapper {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }
        .hashtag-wrapper {
          padding: 40px;
          box-sizing: border-box;
          line-height: 1.5;
          margin: 3rem auto;
          border-radius: 5px;
          
          width: 100%;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .hashtag-title {
          text-align: center;
          font-size: 2.4rem;
          margin: -15px 0 0 0;
        }
        .hashtag-subtitle {
          font-size: 2rem;
          margin: 0;
        }
        .hashtag-text {
          text-align: center;
          font-size: 1.2rem;
        }
        .form-hashtag {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input-text {
          padding: 1em;
          margin: 10px 0;
        }
        .hashtag-message {
          min-height: 100px;
          line-height: 1.5;
          padding: 5px 10px;
          margin: 10px 0;
        }
        .input-text,
        .hashtag-message {
          background-color: #f4f4f4;
          border: #f4f4f4 thin solid;
          border-radius: 5px;
          font-size: 1rem;
        }
        .btn-hashtag-container {
          position: relative;
        }
        .btn-hashtag {
          width: 100%;
          font-size: 1.1rem;
          border: solid thin transparent;
          background-color: #6717ce;
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          text-transform: uppercase;
          color: #fff;
          margin: 10px 0;
          padding: 0.5em;
          border-radius: 5px;
        }
        .btn-hashtag:hover {
          cursor: pointer;
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }
        .success-message {
          width: 500px;
          min-height: 80vh;
          margin: auto;
          display: flex;
          align-items: center;
        }
        .success-message p {
          font-size: 1.3rem;
          text-align: center;
          line-height: 1.5;
        }
        #hashtags-list span {
          display: inline-flex;
          padding: 7px 10px;
          margin-right: 8px;
          margin-bottom: 8px;
          background: #eff3f9;
          border-radius: 15px;
        }
        @media (max-width: 600px) {
          .hashtag-wrapper {
            width: auto;
            box-shadow: none;
          }
        }
        
        .search-wrapper {
          display: flex;
          align-items: center;
          background-color: #f7f7f7;
          padding-left: 0.5rem;
          border-radius: 4px;
          /*border: thin solid rgb(103,23,205, 0.1);*/
          box-shadow: 0px 0px 13px 1px rgba(0,0,0,0.10);
          width: 300px;
        }
        .label-search {
          visibility: hidden;
          position: absolute;
          top: -9999px;
        }
        .btn-search { 
          border-radius: 5px;
          border: none;
          background: linear-gradient(to right, #6717cd, #2871fa );
          color: white;
          padding: 10px 15px;
          cursor: pointer;
          box-shadow: 0px 0px 17px 1px rgba(0,0,0,0.10);
        }
        .btn-search:hover {
          background: linear-gradient(to left, #6717cd, #2871fa );
        }
        .search-input-wrapper {
          flex: 1;
        }
        .search-input-wrapper input {
          width: 100%;
          min-width: 150px;
          border: none;
          padding-left: 0.5em;
          background: transparent;
          outline: 0;
          border-radius: 5px;
        }
      `}</style>
        </main>
    );
}
