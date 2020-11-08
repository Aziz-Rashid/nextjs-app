import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  // TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  // TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
} from "react-share";

export const SocialSharing = ({ video }) => {
  const url = typeof window !== "undefined" && window.location.href;
  console.log(video);
  return (
    <div>
      <FacebookShareButton url={url}>
        <span className="btn-icon">
          <FacebookIcon size={32} round={true} />
        </span>
      </FacebookShareButton>

      <LinkedinShareButton url={url} summary={video.title}>
        <span className="btn-icon">
          <LinkedinIcon size={32} round={true} />
        </span>
      </LinkedinShareButton>

      <TwitterShareButton url={url}>
        <span className="btn-icon">
          <TwitterIcon size={32} round={true} />
        </span>
      </TwitterShareButton>

      <PinterestShareButton
        url={url}
        media={video.thumbnail.replace("mqdefault", "maxresdefault")}
        description={video.title}
      >
        <span className="btn-icon">
          <PinterestIcon size={32} round={true} />
        </span>
      </PinterestShareButton>

      <RedditShareButton url={url} title={video.title}>
        <span className="btn-icon">
          <RedditIcon size={32} round={true} />
        </span>
      </RedditShareButton>
      <VKShareButton
        url={url}
        title={video.title}
        image={video.thumbnail.replace("mqdefault", "maxresdefault")}
      >
        <span className="btn-icon">
          <VKIcon size={32} round={true} />
        </span>
      </VKShareButton>

      <TelegramShareButton url={url} title={video.title}>
        <span className="btn-icon">
          <TelegramIcon size={32} round={true} />
        </span>
      </TelegramShareButton>

      {/* <TumblrShareButton url={url} title={video.title}>
        <span className="btn-icon">
          <TumblrIcon size={32} round={true} />
        </span>
      </TumblrShareButton> */}

      <ViberShareButton url={url} title={video.title}>
        <span className="btn-icon">
          <ViberIcon size={32} round={true} />
        </span>
      </ViberShareButton>

      

      <EmailShareButton url={url} subject={video.title}>
        <span className="btn-icon">
          <EmailIcon size={32} round={true} />
        </span>
      </EmailShareButton>

      <style jsx>{`
        div {
          padding: 0.5rem 1rem;
        }
        .btn-icon {
          margin-right: 5px;
        }
      `}</style>
    </div>
  );
};
