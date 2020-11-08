import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const Subscribe = () => {
  const [focus, setFocus] = useState(false);
  const [focusFname, setFocusFname] = useState(false);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [token, setToken] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("");
  const [error, setError] = useState(false);
  return (
    <section>
      <div className="overlay"></div>
      <div className="wrapper">
        {error && (
          <div className="error">
            Something went wrong. Please try again later
          </div>
        )}
        {subscribeStatus && (
          <div className="subscribed">
            Thank you for subscribing to our newsletter.{" "}
            {subscribeStatus === "pending" &&
              " Please visit your email and confirm your subscription"}{" "}
          </div>
        )}
        {!subscribeStatus && !error && (
          <div>
            <h1 className="title">
              Want more advice on growing a successful online presence? Take
              action now!
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                console.log(email, fname, token);
                try {
                  const response = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({ fname, email, token }),
                  });

                  if (response.status !== 200) {
                    setError(true);
                  } else {
                    setSubscribeStatus(response.status);
                  }
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <div className="container">
                <label htmlFor="fname" className={focusFname ? "focus" : ""}>
                  First Name
                </label>
                <input
                  id="fname"
                  required
                  onFocus={() => {
                    setFocusFname(true);
                  }}
                  onBlur={() => {
                    if (fname) return;
                    setFocusFname(false);
                  }}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  type="text"
                  value={fname}
                />
              </div>
              <div className="container">
                <label htmlFor="email" className={focus ? "focus" : ""}>
                  E-mail-Adress
                </label>
                <input
                  id="email"
                  required
                  onFocus={() => {
                    setFocus(true);
                  }}
                  onBlur={() => {
                    if (email) return;
                    setFocus(false);
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  value={email}
                />
              </div>

              <button>Count me in!</button>
            </form>
            <div className="recaptcha-wrapper">
              {(fname || email) && (
                <ReCAPTCHA
                  sitekey="6Le6Y84ZAAAAAPdviShK5YMINX0jBVYEr53YRJAq"
                  theme="dark"
                  onChange={(value) => setToken(value)}
                />
              )}
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        section {
          position: relative;
          background-color: #333;
          background-image: url("/img/gadgets_1900.jpg");
          min-height: 350px;
          background-size: cover;
          background-position: right bottom;
          padding: 1em;
          display: flex;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: -1;
        }

        .wrapper {
          max-width: 1200px;
          margin: auto;
        }
        .subscribed,
        .error {
          color: white;
          font-size: 1.5em;
        }
        form {
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
        }
        .container {
          position: relative;
          margin-right: 1rem;
          flex: 1;
          max-width: 250px;
        }
        .recaptcha-wrapper {
          min-height: 80px;
        }
        input {
          margin: 0 1em 0 0;
          border: none;
          padding: 0.7rem;
          width: 100%;
          border-radius: 5px;
        }
        label {
          position: absolute;
          bottom: 0.7rem;
          left: 0.5rem;
          transition: all 0.3s;
          color: rgba(0, 0, 0, 0.7);
        }
        .focus {
          transform: translate(0, -3em);
          font-size: 0.8rem;
          color: white;
        }
        button {
          color: #fff;
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          border: none;
          padding: 0.7rem 1rem;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }
        button:hover {
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }

        p {
          font-size: 0.7rem;
        }
        .title {
          font-size: 2.5rem;
          color: white;
          max-width: 34ch;
          margin-top: 0;
        }

        @media (max-width: 1500px) {
          section {
            background-image: url("/img/gadgets_1200.jpg");
          }
        }
        @media (max-width: 1000px) {
          section {
            background-image: url("/img/gadgets_800.jpg");
          }
        }
        @media (max-width: 600px) {
          section {
            background-image: url("/img/gadgets_400.jpg");
          }
          form {
            flex-direction: column;
            align-items: center;
          }
          h1 {
            text-align: center;
            font-size: 2rem;
          }
          input {
            margin: 1rem;
          }
          button {
            margin: 1rem;
          }
          label {
            bottom: 1.5rem;
            left: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};
