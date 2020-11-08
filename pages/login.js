import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "../components";
import { ModalSpinner } from "../components";
import Router from "next/router";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import BackgroundSlider from 'react-background-slider';

import image1 from '../public/img/carousel_01.jpg';
import image2 from '../public/img/carousel_02.jpg';
import image3 from '../public/img/carousel_03.jpg';

export default function Login() {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [token, setToken] = useState("");

  return (
    <main>
      <Head>
        <title>The Moti: Sign In</title>
        <meta name="description" content="login to user area" />
      </Head>
      <section className="login-wrapper">
        <div className="carousel-wrapper">
            <div className="carousel-overlay"></div>
            {/* Background image Carosel */}
            <div className="carousel-image-wrapper">
                <BackgroundSlider
                    images={[image1, image2, image3]}
                    duration={8} transition={1} 
                />
            </div>        
            <div className="carousel-content" >
                <div className="top-logo">
                <img src="/img/themoti_white.png" alt="Logo White"/>
                </div>
                <div className="web-intro">
                <h2>Home to the world's top influencers</h2>
                <p className="sub-title">The best resource to learn how to become one</p>
                <button className="btn-intro">Teach Me How!</button>
                </div>
            </div>
        </div>
        <div className="form-wrapper">
            <div className="login-content">
                <div className="content-header">
                    <p>Not a member yet?</p>
                    <div className="btn-border-blue btn-large btn-join">
                        <Link  href="/register">
                            <a>Join</a>
                        </Link>
                    </div>
                </div>
                <div className="content-form">
                <h1 className="login-title form-title">Sign in to The Moti</h1>
                <form
                    className="form-login"
                    onSubmit={async (e) => {
                        e.preventDefault();
                    if (!token) return;
                    const empty = [email, password].find((e) => e === "");
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
                    const body = JSON.stringify({ email, password });
                    axios
                        .post("/api/auth/local", body, config)
                        .then((res) => {
                        if (res.status === 200) {
                            const user = res.data;
                            if (user) {
                            setUser({
                                id: user.id,
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
                            if (user.isActive) {
                                setIsLoggedIn(true);
                                Router.push("/dashboard");
                            } else {
                                Router.push("/confirmation");
                            }
                            } else {
                            setError("Something went wrong, please try again later");
                            }
                        } else {
                            setError("Something went wrong, please try again later");
                        }
                        })
                        .catch(() => {
                        setError("Invalid Credentials.");
                        });
                    setIsFetching(false);
                    }}
                >
                <div>
                    <button className="btn-large btn-border-grey mb-2">
                        <img src="/img/google_icon.png" alt="Google Button icon" />
                        Sign in with Google
                    </button>
                    <button className="btn-large btn-border-grey mb-2">
                        <img src="/img/facebook_icon.png" alt="Facebook Button icon" />
                        Sign in with Facebook
                    </button>
                    <button className="btn-large btn-border-grey">
                        <img src="/img/apple_icon.png" alt="Apple Button icon" />
                        Sign in with Apple
                    </button>
                </div>
                <div className="split-or">
                  <p>OR</p>
                </div>
                <div><label className="input-label" for="email">Email</label></div>
                <input
                    id="email"
                    className="input-text"
                    type="text"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.slice(0, 50))}
                />
                <div><label className="input-label" for="password">Password</label></div>
                <input
                    id="password"
                    className="input-text"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value.slice(0, 100))}
                />
                <div className="forgot-link-wrapper">
                  <a href="/forgot" className="resetPw">
                    Forgot Password?
                  </a>
                </div>
            <div className="btn-contact-send-container">
                {/* ToDo: should validate button active and disable state with empty email & password */}
                <button className={`btn-large btn-contact-send ${ !email || !password ? 'disabled' : 'active' } `} type="submit">
                    Sign in
                </button>
                {/* ToDo: This should hide */}
                <div className="recaptcha-container">
                    <ReCAPTCHA
                        sitekey="6Le6Y84ZAAAAAPdviShK5YMINX0jBVYEr53YRJAq"
                        onChange={(value) => setToken(value)}
                    />
                </div>
              {isFetching && (
                <ModalSpinner width="100%" height="100%" position="absolute" />
              )}
            </div>
          </form>
                </div>
                <div className="content-footer">
                    <p>© 2020 The Moti. All Rights Reserved.</p>
                </div>
            </div>
        </div>
        {error && <p>{error}</p>}
      </section>
      <style jsx global>{`
        #ReactBackgroundSlider > figure{
            width: 25vw !important;
        }
      `}
      </style>
      <style jsx>{`
        .recaptcha-container{
            display: flex;
            justify-content: center;
            margin-top: 10px;
        }
        .btn-intro{
            background: transparent linear-gradient(90deg, #ED1C4D 0%, #6717CD 100%) 0% 0% no-repeat padding-box;
            border: 0;
            border-radius: 4px;
            height: 45px;
            color: white;
            padding: 0 1.5rem;
            font-weight: bold;
            font-size: 14px;
          }
        .btn-intro:hover{
            background: transparent linear-gradient(270deg,#ED1C4D 0%,#6717CD 100%) 0% 0% no-repeat padding-box;
        }
        button{          
            cursor: pointer;
        }
        .sub-title{
            font-size: 20px;
            font-weight: 100;
            margin-top: 0;
        }
        .top-logo{
            position: relative;
            z-index: 12;
            width: 100%;
            display: flex;
        }
        .top-logo img{
            max-width: 180px;
            margin: 25px auto;
        }
        .web-intro{          
            position: absolute;
            z-index: 12;
            bottom: -110px;
            color: white;
            width: 25vw;
            padding: 1rem 1.5rem;
        }
        .web-intro h2{          
            font-size: 34px;
            font-weight: 400;
            margin-bottom: 12px;
        }
        .carousel-overlay{
            display: flex;
            height: 100%;
            width: 25vw;
            position: absolute;
            background: rgb(0 0 0 / 0.5);
            z-index: 6;
        }
        .carousel-image-wrapper{
            display: flex;
            height: 100%;
            width: 25vw;
            position: absolute;
            z-index: 4;
        }
        .carousel-content{
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 25vw;
            background-position: center;
            background-size: cover;
        }      
        .carousel-wrapper{
            min-height: 100vh;
            background-color: black;
        } 
        .forgot-link-wrapper{
            display: flex;
            justify-content: flex-end;
        }
        .forgot-link-wrapper a{
            color: #ED1C4D;
            font-size: 11px;
            text-decoration: none;
            font-weight: bold;
            margin-bottom: 1rem;
            line-height: 1;
        }
        .forgot-link-wrapper a:hover{
            text-decoration: underline;
        }
        .split-or{
            display: flex;
            justify-content: center;
            color: #89898A;
            font-size: 11px;
            position: relative;
        }
        .split-or p::after, .split-or p::before{
            content: "";
            width: 46%;
            height: 1px;
            background: #FAF9FD;
            display: initial;
            position: absolute;
            top: 50%; 
        }
        .split-or p::after{
            right: 0;
        }
        .split-or p::before{
            left: 0;
        }
        .input-label{
            text-transform: uppercase;
            display: flex;
            color: #89898A;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        .login-wrapper{
            display: flex;         
        }  
        .form-wrapper{
            width: 100%;
        }
        .login-content{
            display: flex;
            flex-direction: column;
            height: 100%;
        }
        .content-header{
            display: flex;
            height: 70px;
            justify-content: flex-end;
            align-items: center;
            padding-right: 2rem;
        }
        .content-header p{
            margin-right: 1rem;
            color: #89898A;
            font-weight: 600;
        }
        .content-form{
            width: 500px;
            padding: 0 1rem;
            margin: 0 auto;
        }
        .content-footer{
            display: flex;
            justify-content: center;
            color: #89898A;
            font-size: 10px;
        }
        .btn-large{
            cursor: pointer;
            display: flex;
            height: 50px;
            width: 100%;
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: #2871FA;
            border: 0;
            font-weight: bold;
            color: white;
            outline: 0;
            transition: background-color .218s,border-color .218s,box-shadow .218s;
        }
        .btn-large a{
            color: white;
            text-decoration: none;
        }
        .btn-large:hover{
            background: #004ee0;
        }
        .disabled{
            opacity: 0.6;
        }
        .btn-large img{
            height: 16px;
            margin-right: 6px;
        }
        .btn-border-grey{
            background: transparent;
            border: 2px solid #FAF9FD; 
            color: #89898A;
        }      
        .btn-border-grey:hover{
            border: 2px solid #a6b7c5;
            background: transparent;
        }  
        .btn-border-blue{
            background: transparent;
            border: 2px solid #2871FA; 
            color: #2871FA;
            width: 110px;
        }
        .btn-border-blue a{
            color: #2871FA;
            display: flex;
            height: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;
        }
        .btn-border-blue:hover a{
            color: white;
        }
        .btn-border-blue:hover{
            background: #2871FA;
            color: white;
        }
        .btn-join{
            height: 45px;
        }
        .form-title{
            text-align: center;
            font-size: 1.7rem;
            margin-top: 0;
        }
        .mb-2{
            margin-bottom: 0.75rem;
        }
        .input-text{
            width: 100%;
            background: #EFF3F6;
            border-radius: 10px;
            font-size: 18px;
            height: 50px;
            border: 1px solid transparent;
            margin-bottom: 1rem;
            padding: 0 1rem;
        }
        @media (max-width: 768px) {
            .carousel-wrapper{
                display: none;
            }
          }
        @media (max-width: 530px) {
            .content-form{
                max-width: 350px;
            }
            .content-header{
                margin-bottom: 2rem;
            }
          }
        @media (max-width: 375px) {
            .content-form{
                max-width: 280px;
            }
          }
      `}</style>
    </main>
  );
}
