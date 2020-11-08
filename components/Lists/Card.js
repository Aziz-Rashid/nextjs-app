import Link from "next/link";
import TruncateMarkup from "react-truncate-markup";
import { LazyImage } from "../LazyImage";

export const Card = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <article>
      <Link href={props.hrefAtr} as={props.url}>
        <a>
          <div className="container">
            <div className="img-wrapper">
              <LazyImage
                image={{
                  src: props.thumbnail,
                  alt: "youtube thumbnail",
                  width: "100%",
                  heigth: "100%",
                }}
                afterLoad={()=> setIsLoading(false)}
                beforeLoad={()=> setIsLoading(true)}
              />
              {!isLoading && (
                <>
                  <img
                    src="/img/youtube_black.png"
                    alt=""
                    className="play-icon black"
                  />
                  <img
                    src="/img/youtube_red.png"
                    alt=""
                    className="play-icon red"
                  />
                </>
              )}
            </div>

            <TruncateMarkup lines={4}>
              <h1 className="title">
                {props.title}
                {props.description ? ": " + props.description : ""}
              </h1>
            </TruncateMarkup>

            {props.children}
          </div>
        </a>
      </Link>
      <style jsx>{`
        article {
          height: 100%;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }
        article:hover {
          transform: scale(1.01)
        }
        .container {
          height: 100%;
          border: solid thin #faf9fd;
         
          overflow: hidden;
          padding: 5px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
        }
        .img-wrapper {
          position: relative;
          overflow: hidden;
          height: 153px;
        }
        .play-icon {
          position: absolute;
          width: 50px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .play-icon.red {
          visibility: hidden;
        }
        .container:hover .play-icon.red {
          visibility: visible;
        }
        .container:hover .play-icon.black {
          visibility: hidden;
        }
        
        .title {
          font-size: 1em;
          font-weight: normal;
          padding: 0.5em;
          margin: 0;
          color: #333;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
      `}</style>
    </article>
  );
};
