import { LazyLoadImage } from "react-lazy-load-image-component";

export const LazyImage = ({ image, ...props }) => (
  <div className="wrapper">
    <div className="container">
      <LazyLoadImage
        alt={image.alt}
        height={image.height}
        src={image.src} // use normal <img> attributes as props
        width={image.width}
        effect="blur"
        {...props}
      />
    </div>
    <style jsx>{`
      .wrapper {
        width: 100%;
        padding-top: 56.25%;
        margin: 0 auto;
        background-color: #faf9fd;
        overflow: hidden;
        position: relative;
      }
      .container {
       position: absolute;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
      }
    `}</style>
  </div>
);
