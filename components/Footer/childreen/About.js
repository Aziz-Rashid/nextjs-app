import { Logo } from "../../Logo";

const About = () => {
  return (
    <div className="about">
      <Logo width="25ch" />
      <p>
        Home to the world&apos;s top influencers and the best resource to learn
        how to become one
      </p>
      <style jsx>{`
        .about {
          margin-top: 2rem;
        }
        p {
          max-width: 29ch;
          line-height: 1.5;
        }
        @media (max-width: 600px) {
          .about {
            margin-right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
