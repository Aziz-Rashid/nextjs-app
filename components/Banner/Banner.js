import Link from "next/link";

import { Wrapper } from "../Wrapper";

import { Carousel } from "react-responsive-carousel";

export const Banner = () => {
  return (
    <section>
      <div className="banner">
        <Wrapper>
          <Carousel
            autoPlay
            infiniteLoop
            interval={10000}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
          >
            <div className="banner-container">
              <div className="banner-left">
                <div className="banner-left-container">
                  <h1>
                    Discover the world&apos;s top influencers and learn how to
                    become one!
                  </h1>
                  <p>
                    The Moti: Home to the world&apos;s top influencers and the
                    best resource to learn how to become one.
                  </p>
                  <Link href="/courses" as="/courses">
                    <a className="btn">Teach me how!</a>
                  </Link>
                </div>
              </div>
              <div className="banner-right">
                <img
                  src="/img/socialmedia_coach.jpg"
                  alt="man using blackboard to teaching a woman to become influencer"
                />
              </div>
            </div>
            <div className="banner-container">
              <div className="banner-left">
                <div className="banner-left-container">
                  <h1>Make sure to subscribe to our Youtube channel!</h1>
                  <p>
                    Don&apos;t forget to hit the bell to be notified when we
                    upload a new interview.
                  </p>

                  <a
                    className="btn"
                    href="https://www.youtube.com/themoti?sub_confirmation=1"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Subscribe
                  </a>
                </div>
              </div>
              <div className="banner-right">
                <img src="/img/youtube.jpg" alt="youtube video player" />
              </div>
            </div>
          </Carousel>
        </Wrapper>
      </div>
      <Wrapper>
        <div className="foot">
          <div className="foot-container">
            <img className="checkmark" src="/img/checkmark.png" alt="" />
            <div>
              <p className="big">influencers interviews</p>
              <p>Enjoy a variety of fresh topics.</p>
            </div>
          </div>
          <div className="foot-container">
            <img className="checkmark" src="/img/checkmark.png" alt="" />
            <div>
              <p className="big">expert instructions</p>
              <p>Let us help you become an influencer.</p>
            </div>
          </div>
          <div className="foot-container">
            <img className="checkmark" src="/img/checkmark.png" alt="" />
            <div>
              <p className="big">exclusive brand deals</p>
              <p>Helping your brand reach the right audience.</p>
            </div>
          </div>
        </div>
      </Wrapper>
      <style jsx>{`
        .banner {
          background-color: #faf9fd;
          min-height: 400px;
        }
        .banner-container {
          width: 100%;
          display: flex;
          overflow: hidden;
          flex-wrap: wrap;
          padding-bottom: 2rem;
        }
        .btn {
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          padding: 0.7em 1.4em;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          display: inline-block;
          align-self: flex-start;
          margin: 20px 0;
          text-transform: uppercase;
        }
        .btn:hover {
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }
        .banner-right {
          flex: 1;
          max-width: 500px;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .banner-left {
          flex: 1;
          display: flex;
          align-items: center;
          height: 400px;
        }
        .banner-left-container {
          display: flex;
          flex-direction: column;
        }
        .banner-left h1 {
          margin: 0;
          font-weight: 400;
          font-size: 2.5rem;
          min-height: 100px;
        }
        .banner-left p {
          max-width: 48ch;
          font-size: 1.1rem;
        }

        .foot-container {
          display: flex;
          margin: 1em;
        }
        .checkmark {
          height: 2.5em;
          margin-right: 0.5em;
        }
        .foot-container p {
          margin: 0;
        }
        .big {
          text-transform: uppercase;
        }

        .foot {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 600px) {
          .banner-container {
            flex-direction: column;
          }
          .banner-left {
            height: auto;
          }
          .banner-right,
          .banner-left-container {
            padding-top: 2rem;
          }
          .banner-left h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};
