import Head from "next/head";
import Error from "next/error";
import { getBaseUrl } from "../../lib";
import { InfluencerContainer } from "../../containers";

const Influencer = ({ playlist, error }) => {
  if (error) {
    return <Error statusCode={error} />;
  }
  const currentVideo = playlist.videos.find((v) => v.active);

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@themoticom" />
        <meta name="twitter:creator" content="@themoticom" />
        {/* <meta property="og:url" content={url} /> */}
        <meta property="og:title" content={playlist.title} />
        <meta property="og:description" content={currentVideo.title} />
        <meta
          property="og:image"
          content={currentVideo.thumbnail.replace("mqdefault", "maxresdefault")}
        />
        <meta
          name="description"
          content={`The Moti interview: ${playlist.title} \n ${currentVideo.title}`}
        />
        <title>{currentVideo.title}</title>
      </Head>
      <InfluencerContainer playlist={playlist} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const baseUrl = getBaseUrl();
  const {
    slug: [id, videoSlug],
  } = params;

  // if video doesn't have a playlist
  if (id === "videos") {
    if (!videoSlug) {
      return {
        props: {
          error: 404,
        },
      };
    }
    try {
      const res = await fetch(`${baseUrl}/api/videos/${videoSlug}$`);
      if (res.status !== 200) {
        return {
          props: {
            error: res.status,
          },
        };
      }
      const { title, videos } = await res.json();
      return {
        props: {
          playlist: {
            title,
            videos: videos.map((v) => {
              return { ...v, active: v.slug === videoSlug };
            }),
          },
          url: `${baseUrl}/${id}/${videoSlug}`,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          error: 500,
        },
      };
    }
  }

  // if video have a playlist
  try {
    const res = await fetch(`${baseUrl}/api/interviews/${id}`);
    if (res.status !== 200) {
      return {
        props: {
          error: res.status,
        },
      };
    }
    const { videos, ...playlist } = await res.json();
    return {
      props: {
        playlist: {
          ...playlist,
          videos: videos.map((v, i) => {
            const active =
              (videoSlug && v.slug === videoSlug) || (!videoSlug && i === 0);
            return { ...v, active };
          }),
        },
        url: `${baseUrl}/${id}/${videoSlug}`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: 500,
      },
    };
  }
}

export default Influencer;
