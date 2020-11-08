import Head from "next/head";
import { useState, useContext } from "react";
import { UserContext, emailContext } from "../components";
import { ModalSpinner } from "../components";
import Router from "next/router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function Register() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [token, setToken] = useState("");

  return (
    <main>
      <Head>
        <title>The Moti: Join the Community</title>
        <meta name="description" content="register with your credentials" />
      </Head>
      <section className="register-wrapper">
        <div>
          <h1 className="register-title">Join the Community</h1>
          <p className="register-text">
            Register now and be part of the awesome community of The Moti!
          </p>
          <form
            className="form-register"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!token) return;
              const empty = [
                username,
                firstName,
                lastName,
                email,
                password,
                confirmPW,
              ].find((e) => e === "");
              if (empty) {
                setError(empty + " can't be empty");
                return;
              }
              if (!email.includes("@")) {
                setError("Invalid email");
                return;
              }
              if (password !== confirmPW) {
                setError("Your passwords do not match");
                return;
              }
              const config = {
                headers: {
                  "content-type": "application/json",
                },
              };
              const body = JSON.stringify({
                username,
                firstName,
                lastName,
                email,
                password,
                token,
              });
              axios
                .post("api/user/register", body, config)
                .then((res) => {
                  if (res.status === 200) {
                    const user = res.data;
                    setUser({
                      id: user._id,
                      username: user.username,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      lastLogin: user.lastLogin,
                      registerDate: user.registerDate,
                      formattedRegisterDate: user.formattedRegisterDate,
                      isAdmin: user.isAdmin,
                      isActive: user.isActive,
                    });
                    // setIsLoggedIn(true);
                    Router.push("/confirmation");
                  } else {
                    setError(res.data.msg);
                  }
                })
                .catch((err) => {
                  setError(err.response.data.msg);
                });
              setIsFetching(false);
            }}
          >
            <input
              id="username"
              className="input-text"
              type="text"
              name="username"
              required
              placeholder="YOUR USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value.slice(0, 50))}
            />
            <input
              id="firstName"
              className="input-text"
              type="text"
              name="firstName"
              required
              placeholder="YOUR FIRST NAME"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.slice(0, 100))}
            />
            <input
              id="lastName"
              className="input-text"
              type="text"
              name="lastName"
              required
              placeholder="YOUR LAST NAME"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.slice(0, 100))}
            />
            <input
              id="email"
              className="input-text"
              type="email"
              name="email"
              required
              placeholder="YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value.slice(0, 100))}
            />
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
              id="confirmPW"
              className="input-text"
              type="password"
              name="confirmPW"
              required
              placeholder="CONFIRM YOUR PASSWORD"
              value={confirmPW}
              onChange={(e) => setConfirmPW(e.target.value.slice(0, 100))}
            />
            <div className="recaptcha-container">
              <ReCAPTCHA
                sitekey="6Le6Y84ZAAAAAPdviShK5YMINX0jBVYEr53YRJAq"
                onChange={(value) => setToken(value)}
              />
            </div>
            <div className="btn-contact-send-container">
              <button className="btn-contact-send" type="submit">
                Register
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
        .register-wrapper {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem auto;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .register-title {
          text-align: center;
          text-transform: uppercase;
          font-size: 2.4rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .register-text {
          text-align: center;
          font-size: 1.2rem;
          margin: 0;
        }
        .form-register {
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
          .register-wrapper {
            width: auto;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
