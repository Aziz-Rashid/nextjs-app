import Head from "next/head";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../components";
import Router from "next/router";
import { AdminInfo } from "../components";

export default function Admin() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [admin, setAdmin] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [editorClosed, setEditorClosed] = useState(true);
  const [deleteClosed, setDeleteClosed] = useState(true);
  const [editUser, setEditUser] = useState("");

  // Check online status and get userdata for dashboard
  // Redirect if user is not logged in (dashboard access only for logged in users)
  const getUser = () => {
    axios
      .get("/api/user")
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
          setIsLoggedIn(true);

          if (!res.data.isAdmin) {
            Router.push("/");
          }
        } else {
          setUser({});
          setIsLoggedIn(false);
          Router.push("/login");
        }
      })
      .catch((e) => {
        console.log("an error occured: " + e);
        Router.push("/login");
      });
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  return (
    <main>
      <Head>
        <title>The Moti: Admin Dashboard</title>
        <meta name="description" content="dashboard overview" />
      </Head>
      {isLoggedIn && user.isAdmin ? (
        <div className="dashboard-wrapper">
          <h1 className="content-title1">Admin Dashboard</h1>
          <section className="content-wrapper1">
            <AdminInfo
              setEditorClosed={setEditorClosed}
              setDeleteClosed={setDeleteClosed}
              setEditUser={setEditUser}
            />
          </section>
          <section className={editorClosed ? "hide" : "register-wrapper"}>
            <div>
              <img
                src="/img/cross_dark.png"
                height="20"
                width="20"
                onClick={() => {
                  setEditorClosed(true);
                }}
              />
              <h1 className="register-text">
                Change User-Data: {editUser.username} ID ({editUser.id})
              </h1>
              <form
                className="form-register"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email && !email.includes("@")) {
                    setError("Invalid email");
                    return;
                  }
                  if (password !== confirmPW) {
                    setError("Your passwords do not match");
                    return;
                  }
                  setIsFetching(true);
                  const config = {
                    headers: {
                      "content-type": "application/json",
                    },
                  };
                  const body = JSON.stringify({
                    id: editUser.id,
                    username,
                    firstName,
                    lastName,
                    email,
                    password,
                    admin,
                  });
                  axios
                    .put("api/user", body, config)
                    .then((res) => {
                      if (res.status === 200) {
                        Router.reload();
                      } else {
                        setError(res.data.msg);
                      }
                    })
                    .catch((err) => {
                      setError(err.response.data.msg);
                    });
                  setIsFetching(false);
                  setEditorClosed(true);
                }}
              >
                <input
                  id="username"
                  className="input-text"
                  type="text"
                  name="username"
                  placeholder="Change Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.slice(0, 50))}
                />
                <input
                  id="firstName"
                  className="input-text"
                  type="text"
                  name="firstName"
                  placeholder="Change first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value.slice(0, 100))}
                />
                <input
                  id="lastName"
                  className="input-text"
                  type="text"
                  name="lastName"
                  placeholder="Change last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.slice(0, 100))}
                />
                <input
                  id="email"
                  className="input-text"
                  type="email"
                  name="email"
                  placeholder="Change email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, 100))}
                />
                <input
                  id="password"
                  className="input-text"
                  type="password"
                  name="password"
                  placeholder="Change password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.slice(0, 100))}
                />
                <input
                  id="confirmPW"
                  className="input-text"
                  type="password"
                  name="confirmPW"
                  placeholder="Confirm new password"
                  value={confirmPW}
                  onChange={(e) => setConfirmPW(e.target.value.slice(0, 100))}
                />
                <input
                  id="admin"
                  className="input-text"
                  type="text"
                  name="admin"
                  placeholder="Set to admin: true/false"
                  value={admin}
                  onChange={(e) => setAdmin(e.target.value.slice(0, 50))}
                />
                <div className="btn-contact-send-container">
                  <button className="btn-contact-send" type="submit">
                    Change User-Data
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
          <section className={deleteClosed ? "hide" : "delete-wrapper"}>
            <div>
              <h1 className="delete-text">
                Do you want to Delete the user {editUser.username} ID (
                {editUser.id})?
              </h1>
              <div className="btn-contact-send-container">
                <button
                  className="btn-contact-send"
                  onClick={() => {
                    setIsFetching(true);
                    const config = {
                      headers: {
                        "content-type": "application/json",
                      },
                      data: { id: editUser.id },
                    };
                    axios
                      .delete("/api/user", config)
                      .then((res) => {
                        if (res.status === 200) {
                          Router.reload();
                        } else {
                          setError(res.data.msg);
                        }
                      })
                      .catch((err) => {
                        setError(err.response.data.msg);
                      });
                    setIsFetching(false);
                    setDeleteClosed(true);
                  }}
                >
                  Yes
                </button>
              </div>
              <div className="btn-contact-send-container">
                <button
                  className="btn-contact-send"
                  onClick={() => {
                    setDeleteClosed(true);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <section className="dashboard-wrapper">
          <div>
            <h1 className="dashboard-title">Not authorized.</h1>
          </div>
        </section>
      )}
      <style jsx>{`
        .dashboard-wrapper {
          padding: 10px;
          display: block;
          align-items: center;
          box-sizing: border-box;
          line-height: 1.5;
          width: auto;
          margin: 0;
        }
        .content-wrapper1 {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: auto;
          margin: 3rem 3rem;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          overflow: scroll;
        }
        .content-title1 {
          text-align: center;
          text-transform: uppercase;
          font-size: 1.4rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .register-wrapper {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem auto;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
          color: #fff;
          margin: 10px 0;
          padding: 0.5em;
          border-radius: 5px;
        }
        .btn-contact-send:hover {
          cursor: pointer;
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }
        .delete-wrapper {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem auto;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .delete-text {
          text-align: center;
          font-size: 1.2rem;
          margin: 0;
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
        .hide {
          display: none;
        }
        @media (max-width: 600px) {
          .register-wrapper,
          .delete-wrapper {
            width: auto;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}
