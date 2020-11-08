import TruncateMarkup from "react-truncate-markup";
import { LazyImage } from "../../LazyImage";

const Course = ({ cours }) => {
  const { title, url, price, img, headline } = cours;
  return (
    <article className="article">
      <h1>
        <TruncateMarkup lines={3}>
          <span>{title}</span>
        </TruncateMarkup>
      </h1>
      <LazyImage
        image={{
          src: img,
          alt: "udemy course",
          width: "100%",
          heigth: "100%",
        }}
      />
      <p>
        <TruncateMarkup lines={4}>
          <span>{headline}</span>
        </TruncateMarkup>
      </p>
      <h2 className="price">Only {price}</h2>
      <a target="_blank" rel="noreferrer noopener" href={url} className="snapLeftBtn" >
        <span>Tell me more</span>
      </a>
      <style jsx>{`
        .article {
          width: 270px;
          margin: 0 5px 1rem ;
          color: #1b202d;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          padding: 0.5rem;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
        }
        .snapLeftBtn {
          text-align: center;         
          background-color: hsl(222, 100%, 95%);
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          position: relative;      
          overflow: hidden;        
          padding: 0.7em 1.4em;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          display: block;
          width: 9em;
          margin: 0 auto 10px;
          text-align: center;
      }
      
      .snapLeftBtn::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          transform: translateX(-101%);
          background:#6717cd;
          transition: transform .25s ease-in;
      }
      
      .snapLeftBtn:hover::before {
          transform: translateX(0);
         
      }
      
      .snapLeftBtn span {
          position: relative;
          z-index: 1;
          display: block;
          transition: color 0.1s .15s ease-in;
      }
      
      .snapLeftBtn:hover span {
        color: #faf9fd;
          animation: animButtonSpan 0.4s;
      }
      
      @keyframes animButtonSpan {
          0% {
              transform: translateX(0);
              opacity: 1;
          }
      
          35% {
              transform: translateX(20px);
              opacity: 0;
          }
      
          50.001% {
              transform: translateX(-20px);
          }
      
          60% {
              transform: translateX(0px);
          }
      
      }
      
      
      
      
      
        // a {
        //   background-image: linear-gradient(to right, #6717cd, #2871fa);
        //   padding: 0.7em 1.4em;
        //   color: white;
        //   text-decoration: none;
        //   border-radius: 5px;
        //   font-weight: bold;
        //   display: block;
        //   width: 9em;
        //   margin: 0 auto 10px;
        //   text-align: center;
        // }
        // a:hover {
        //   background-image: linear-gradient(to left, #6717cd, #2871fa);
        // }

        h1 {
          margin: 0;
          padding: 0;
          font-size: 1rem;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        h1 span {
          text-align: center;
        }
        p {
          height: 85px;
          overflow: hidden;
          line-height: 1.5;
        }
        .price {
          align-self: center;
          margin-bottom: 0.5em;
          margin-top: auto;
          font-size: 1rem;
          font-weight: normal;
        }
      `}</style>
    </article>
  );
};

export default Course;
