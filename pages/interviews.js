import Error from "next/error";
import Head from 'next/head'
import { Grid, Card, InterviewsStats } from "../components";
import { getBaseUrl } from "../lib";

export default function Interviews({ playlists, error }) {
  if (error) return <Error statusCode={error} />;
  const { videos = [] } = playlists;
  return (
    <>
     <Head>
        <title>The Moti: Interviews</title>
        <meta 
        name="description"
        content="watch the moti interview and learn how to become an influencer"
        />
      </Head>
      <section className="section">
        <div className="wrapper">
          <h1>Our Interviews</h1>
          <Grid
            items={videos.map((playlist) => (
              <Card
                key={playlist.id}
                {...playlist}
                hrefAtr="/influencer/[...slug]"
                url={`/influencer/${playlist.slug}`}
                alt={playlist.title}
              >
                <InterviewsStats viewCount={playlist.viewCount} />
              </Card>
            ))}
          />
        </div>
        <style jsx>{`
          .section {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          h1 {
            text-align: center;
            text-transform: uppercase;
            font-style: oblique;
            color: #1b202d;
            font-size: 1.8rem;
            lettre-spacing: 0.1em;
          }
          .wrapper {
            max-width: 1200px;
            margin: auto;
          }
        `}</style>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const baseUrl = getBaseUrl();
  let playlists = {};

  try {
    const fetchPlaylist = await fetch(
      `${baseUrl}/api/interviews?page=${0}&limit=10000`
    );
    if (fetchPlaylist.status === 200) {
      playlists = await fetchPlaylist.json();
    }
  } catch (error) {
    console.error(error);
    return { props: { error: 500 } };
  }

  return { props: { playlists } };

  // Pass data to the page via props
}
