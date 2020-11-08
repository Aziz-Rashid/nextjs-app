import Head from "next/head";
import Router from "next/router";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components";

export default function Confiramtion() {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [sendEmail, setSendEmail] = useState(false);
  let count = 0;
  const reSend = (e) => {
    axios
      .post("/api/user/confirm", { email: user.email })
      .then((res) => {
        // console.log("email send");
        setSendEmail(true);
      })
      .catch((err) => {
        console.log(err);
        setError("something went wrong");
      });
  };

  useEffect(() => {
    count++;
    if (user.email) reSend();
    if (count == 1 && !user.email) Router.push("/login");
  }, [user]);

  return (
    <main>
      <Head>
        <title>The Moti: Join the Community</title>
        <meta name="description" content="register with your credentials" />
      </Head>
      <section className="confirmation-warpper">
        <div>
          {sendEmail && (
            <p className="info">we have e-mailed your activate account link</p>
          )}
          {error && <p className="error">{error}</p>}

          <h1 className="confirmation-title">Welcome to The Moti</h1>

          <p className="confiramtion-text">
            Activate your account and start your journey <br />
            Please check your inboxe
          </p>
          <a className="resend-btn" onClick={(e) => reSend(e)}>
            resend the link
          </a>
        </div>
      </section>
      <style jsx>
        {`
          .confirmation-warpper {
            padding: 10px;
            box-sizing: border-box;
            line-height: 1.5;
            width: 500px;
            margin: 3rem auto;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .error {
            font-size: 16px;
            background-color: #ffb9b9;
            border: 2px solid #e68989;
            border-radius: 4px;
            color: #561212;
            padding: 10px;
            margin: 0 0 20px 0;
          }
          .info {
            font-size: 16px;
            background-color: #b7fdb9;
            border: 2px solid #89e68d;
            border-radius: 4px;
            color: #082308;
            padding: 10px;
            margin: 0 0 20px 0;
          }
          .confirmation-title {
            text-align: center;
            text-transform: uppercase;
            font-size: 2.4rem;
            margin: 0;
            margin-bottom: 1rem;
          }
          .confiramtion-text {
            margin: 20px;
          }
          .resend-btn {
            cursor: pointer;
            text-decoration: underline;
            color: #1958ce;
          }
        `}
      </style>
    </main>
  );
}
