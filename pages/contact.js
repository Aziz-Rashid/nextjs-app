import Head from "next/head";
import { useState } from "react";
import { ModalSpinner } from "../components";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [social, setSocial] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [token, setToken] = useState("");

  return (
    <main>
      <Head>
        <title>The Moti: Contact page</title>
        <meta name="description" content="contact us for more information" />
      </Head>
      {success ? (
        <div className="success-message">
          <p>
            Thank your for reaching out, we will get back in touch with you
            soon!
          </p>
        </div>
      ) : (
        <section className="contact-wrapper">
          <div>
            <h1 className="contact-title">contact us</h1>
            <p className="contact-text">
              Got a question? We&apos;d love to hear from you.
            </p>
            <p className="contact-text">
              Send us a message and we&apos;ll respond
            </p>
            <p className="contact-text">as soon as possible.</p>
            <form
              className="form-contact"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!token) return;
                const empty = [name, email, message].find((e) => e === "");
                if (empty) {
                  setError(empty + " can't be empty");
                  return;
                }
                try {
                  setIsFetching(true);
                  const response = await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                      "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      email,
                      message,
                      social,
                      token,
                    }),
                  });
                  if (response.status === 200) {
                    setSuccess(true);
                  } else {
                    setError("Something went wrong, please try again later");
                  }
                } catch (error) {
                  console.error(error);
                }
                setIsFetching(false);
              }}
            >
              <input
                id="name"
                className="input-text"
                type="text"
                name="name"
                required
                placeholder="YOUR NAME"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 50))}
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
                className="input-text"
                type="text"
                name="username"
                placeholder="YOUR SOCIAL HANDLE"
                value={social}
                onChange={(e) => setSocial(e.target.value.slice(0, 50))}
              />
              <textarea
                className="contact-message"
                name="message"
                id="message"
                placeholder="YOUR MESSAGE"
                minLength="20"
                maxLength="500"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              ></textarea>
              <div className="recaptcha-container">
                <ReCAPTCHA
                  sitekey="6Le6Y84ZAAAAAPdviShK5YMINX0jBVYEr53YRJAq"
                  onChange={(value) => setToken(value)}
                />
              </div>
              <div className="btn-contact-send-container">
                <button className="btn-contact-send" type="submit">
                  send message
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
          </div>
          {error && <p>{error}</p>}
        </section>
      )}
      <style jsx>{`
        .contact-wrapper {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem auto;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .contact-title {
          text-align: center;
          text-transform: uppercase;
          font-size: 2.4rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .contact-text {
          text-align: center;
          font-size: 1.2rem;
          margin: 0;
        }
        .form-contact {
          display: flex;
          flex-direction: column;
          margin-top: 1rem;
        }
        .input-text {
          padding: 1em;
          margin: 10px 0;
        }

        .contact-message {
          min-height: 100px;
          line-height: 1.5;
          padding: 5px 10px;
          margin: 10px 0;
        }
        .input-text,
        .contact-message {
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
          .contact-wrapper {
            width: auto;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
