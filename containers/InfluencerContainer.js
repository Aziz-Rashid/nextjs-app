import { VideoPlayer, SocialSharing, Disqus, Wrapper } from "../components";

export const InfluencerContainer = ({ playlist }) => {
  const currentVideo = playlist.videos.find((v) => v.active);
  return (
    <Wrapper>
      <main>
        <VideoPlayer playlist={playlist} />
        <div className="container">
          <div className="description">
            <p>{playlist.description}</p>
          </div>
          <div className="disqus">
            <SocialSharing video={currentVideo} />
            <Disqus currentVideo={currentVideo} />
          </div>
        </div>
        <style jsx>{`
        main {
          padding-top: 2rem;
        }
          p {
            line-height: 1.5;
          }
          @media (min-width: 1001px) {
            .container {
              display: flex;
            }
            .disqus {
              flex: 2;
            }
            .description {
              flex: 1;
              min-width: 350px;
              order: 2;
            }
          }
        `}</style>
      </main>
    </Wrapper>
  );
};
