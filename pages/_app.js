import Head from "next/head";
import { useEffect } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../components/Banner/banner.css";
import { Layout } from "../Layout";
import { BackToTop, UserContext } from "../components";

import Router from "next/router";
import NProgress from "nprogress";
import { useState } from "react";
import "nprogress/nprogress.css";
import axios from "axios";

NProgress.configure({ showSpinner: false, parent: "#nprogress-container" });

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    lastLogin: "",
    registerDate: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check online status of user and get userdata
  const getUser = () => {
    axios
      .get("/api/user")
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
          setIsLoggedIn(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
    if (process.env.NODE_ENV === "production") {
      console.log = () => {};
    }
    const timer = setTimeout(() => {
      const script = document.createElement("script");
      script.src = "/js/rakuten.js";
      document.body.appendChild(script);
    }, 1000 * 5);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  const { coursesSample = {} } = pageProps;
  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      <Layout courses={coursesSample.courses}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <BackToTop />
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            margin: 0;
            font-family: "Roboto", Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #1b202d;
          }
          * {
            box-sizing: border-box;
          }
          .viewport {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
          }
        `}</style>
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
