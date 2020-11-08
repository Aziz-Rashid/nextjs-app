import { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";

export const Disqus = ({ currentVideo }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const config = {
      identifier: currentVideo.id,
      title: currentVideo.title,
      url: window.location.href,
    };
    setConfig(config);
  }, [currentVideo]);

  if (!config) return null;
  return (
    <div>
      <DiscussionEmbed shortname="www-themoti-com" config={config} />
      <style jsx>{`
        div {
          padding-left: 1rem;
          padding-right: 1rem;
          min-height: 300px;
        }
      `}</style>
    </div>
  );
};


