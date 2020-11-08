import {
  FaInstagramSquare,
  FaTwitter,
  FaFacebookSquare,
  FaYoutube,
  FaLinkedinIn,
  FaSnapchatGhost,
} from "react-icons/fa";

const Link = (props) => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    {props.icon}
    <span className="text">{props.title}</span>
    <style jsx>{`
      .text {
        margin-left: 0.5em;
      }
      a {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        text-decoration: none;
        color: inherit;
      }
      a:visited {
        color: inherit;
      }
      a:hover {
        color: #000;
        font-weight: bold;
      }
    `}</style>
  </a>
);

const Social = () => (
  <section>
    <div className="wrapper">
      <h1 className="title"> Social Media</h1>
      {socialArr.map((el) => (
        <Link key={el.id} {...el} />
      ))}
      <Tiktok />
    </div>
    <style jsx>{`
      .wrapper {
        width: max-content;
        margin: auto;
      }
      .title {
        font-size: 1.2rem;
        text-transform: uppercase;
        margin: 2rem 0;
      }
    `}</style>
  </section>
);

export default Social;

const Tiktok = () => (
  <a
    href="https://tiktok.com/@themoti.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="/img/tiktok.png" alt="tiktok icon" />
    <span className="text">Tiktok</span>
    <style jsx>{`
      .text {
        margin-left: 0.5em;
      }
      img {
        width: 1.5em;
        opacity: 0.8;
      }
      a {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        text-decoration: none;
        color: inherit;
      }
      a:visited {
        color: inherit;
      }
      a:hover {
        color: #000;
        font-weight: bold;
      }
      a:hover img {
        opacity: 1;
      }
    `}</style>
  </a>
);

const socialArr = [
  {
    id: 1,
    url: "https://www.youtube.com/themoti",
    icon: <FaYoutube size={"1.5em"} />,
    title: "Youtube",
  },
  {
    id: 2,
    url: "https://www.facebook.com/themoticom/",
    icon: <FaFacebookSquare size={"1.5em"} />,
    title: "Facebook",
  },
  {
    id: 3,
    url: "https://www.linkedin.com/company/themoticom/",
    icon: <FaLinkedinIn size={"1.5em"} />,
    title: "Linkedin",
  },
  {
    id: 4,
    url: "https://www.instagram.com/themoticom/",
    icon: <FaInstagramSquare size={"1.5em"} />,
    title: "Instagram",
  },
  {
    id: 5,
    url: "https://twitter.com/themoticom",
    icon: <FaTwitter size={"1.5em"} />,
    title: "Twitter",
  },
  {
    id: 6,
    url: "https://www.snapchat.com/add/themoticom",
    icon: <FaSnapchatGhost size={"1.5em"} />,
    title: "Snapchat",
  },
];
