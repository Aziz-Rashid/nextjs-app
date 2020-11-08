import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { UserContext } from "../../components";
import { ModalSpinner } from "../../components";
import Router from "next/router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function resetPassword() {
  const [cpassword, setCpassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [ktoken, setToken] = useState("");

  const {
    query: { token },
  } = useRouter();
  console.log(token);

  return (
    <main>
      <Head>
        <title>The Moti: reset password</title>
        <meta name="description" content="login to user area" />
      </Head>
      <section className="login-wrapper">
        <div>
          <h1 className="login-title">reset password</h1>
          <form
            className="form-login"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!ktoken) return;
              const empty = [cpassword, password].find((e) => e === "");
              if (empty) {
                setError(empty + " can't be empty");
                return;
              }
              setIsFetching(true);
              // Headers
              const config = {
                headers: {
                  "content-type": "application/json",
                },
              };
              const body = JSON.stringify({ cpassword, password, token });
              console.log(body);
              axios
                .post("/api/auth/local/reset", body, config)
                .then((res) => {
                  if (res.status === 200) {
                    Router.push("/login");
                  } else {
                    setError("Something went wrong, please try again later");
                  }
                })
                .catch((err) => {
                  err
                    ? setError(err.response.data.msg)
                    : setError("passwords dont't match");
                });
              setIsFetching(false);
            }}
          >
            <input
              id="password"
              className="input-text"
              type="password"
              name="password"
              required
              placeholder="YOUR PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value.slice(0, 100))}
            />
            <input
              id="cpassword"
              className="input-text"
              type="password"
              name="cpassword"
              required
              placeholder="CONFIRM PASSWORD"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value.slice(0, 100))}
            />
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Le6Y84ZAAAAAPdviShK5YMINX0jBVYEr53YRJAq"
                onChange={(value) => setToken(value)}
              />
            </div>
            <div className="btn-contact-send-container">
              <button className="btn-contact-send" type="submit">
                reset
              </button>
              {isFetching && (
                <ModalSpinner width="100%" height="100%" position="absolute" />
              )}
            </div>
          </form>
        </div>
        {error && <p>{error}</p>}
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
        .resetPw {
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
        .recaptcha-container {
          min-height: 80px;
          display: flex;
          justify-content: center;
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
