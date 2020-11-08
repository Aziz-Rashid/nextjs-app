import Head from "next/head";
import { useState, useContext } from "react";
import { ModalSpinner } from "../components";
import axios from "axios";

export default function forgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const onSendEmail = async (e) => {
    e.preventDefault();
    const empty = email === "";
    if (empty) {
      setError("email can't be empty");
      return;
    }
    setIsFetching(true);
    // Headers
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const body = JSON.stringify({ email });
    axios
      .post("/api/auth/local/forgot", body, config)
      .then((res) => {
        if (res.status === 200) {
          console.log("email send");
          setSendEmail(true);
        } else {
          setError("Something went wrong, please try again later");
        }
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
        setError("Invalid Credentials.");
      });
    setIsFetching(false);
  };

  return (
    <main>
      <Head>
        <title>The Moti: Rest Password</title>
        <meta name="description" content="reset password" />
      </Head>
      <section className="login-wrapper">
        <div>
          <h1 className="login-title">Email</h1>
          {sendEmail ? (
            <div style={{ textAlign: "center" }}>
              <p className="info" style={{ fontSize: "18px" }}>
                we have e-mailed your password reset link <br />
                Please check your inbox
              </p>
              <a className="resend-btn" onClick={async (e) => onSendEmail(e)}>
                resend the link
              </a>
            </div>
          ) : (
            <form className="form-login" onSubmit={async (e) => onSendEmail(e)}>
              <p className="info-forget">
                Enter your email address below and we'll send you a link to
                reset your password.
              </p>
              <input
                id="email"
                className="input-text"
                type="text"
                name="email"
                required
                placeholder="YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 50))}
              />
              <div className="btn-contact-send-container">
                <button className="btn-contact-send" type="submit">
                  send
                </button>
                {isFetching && (
                  <ModalSpinner
                    width="100%"
                    height="100%"
                    position="absolute"
                  />
                )}
              </div>
            </form>
          )}
        </div>
        {error && (
          <p
            className="error"
            style={{ textAlign: "center", color: "#cc0000" }}
          >
            {error}
          </p>
        )}
      </section>
      <style jsx>{`
        .login-wrapper {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem auto;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .login-title {
          text-align: center;
          text-transform: uppercase;
          font-size: 2.4rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .info-forget {
        }
        .form-login {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }
        .input-text {
          padding: 1em;
          margin: 10px 0;
        }
        .input-text {
          background-color: #f4f4f4;
          border: #f4f4f4 thin solid;
          border-radius: 5px;
          font-size: 1rem;
        }
        .btn-contact-send-container {
          position: relative;
        }
        .btn-contact-send {
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
        .btn-contact-send:hover {
          cursor: pointer;
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }
        .resend-btn {
          display: block;
          text-align: center;
          margin: 2rem 0 1rem 0;
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

        @media (max-width: 600px) {
          .login-wrapper {
            width: auto;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
