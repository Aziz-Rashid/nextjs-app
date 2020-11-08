import Head from "next/head";
import { Wrapper } from "../components";
export default function About() {
  return (
    <Wrapper>
      <Head>
        <title>The Moti: About page</title>
        <meta
          name="description"
          content="The Moti is an online platform that focusses on the world of
        influencers. What is their story? What is their passion? How did they
        gain such a massive following? The Moti is active globally and speaks
        to influencers on all continents."
        />
      </Head>
      <div className="container">
        <h1>Our Story</h1>
        <p>
          In 2017 a couple of friends came up with the idea of interviewing
          people with a large following in order to understand why these
          influencers are so popular. Why are they so successful? What are their
          habits? What are their tricks and trades? The fascination with
          influencers came from what it is these people stand for. Almost all of
          them represent freedom and drive. To do what makes you happy and to
          give that your all. Most of them now earn their income doing what they
          love, something many of us could learn from. The idea was to then
          publish these interviews to share the information with the world. And
          so the Museum of the Influencers (the MOTI) was born. Why “Museum”?
          Because people go to a museum, for 3 reasons: To learn, to admire and
          to be entertained. That is exactly what The MOTI strives to do.
        </p>
        <p>
          The two friends began interviewing influencers in the fitness scene,
          but soon expanded to include influencers active in various different
          niches. The interviews are published daily, in bite size chunks to
          give the influencers’ followers something to look forward to every
          day. This format proved to be very popular and the MOTI grew into a
          popular platform where influencer fans come to learn more about their
          idols and where those who have the ambition of becoming an influencer
          themselves can find information and courses to help them attain their
          goal. The platform is expanded continually and today a team of
          programmers work incessantly on optimizing the platform to deal with
          the growth and on adding new features. The MOTI interviews influencers
          from around the globe.
        </p>
        <style jsx>{`
          .container {
            width: 600px;
            max-width: 100%;
            margin: 3rem auto;
          }
          p {
            font-size: 1.2rem;
            line-height: 2;
            text-align: justify;
          }
          p::first-letter{
            font-weight: bold;
            line-height: 0;
            font-size: 150%;
          }
          h1 {
            text-align: center;
            text-transform: uppercase;
            font-style: oblique;
            color: #1b202d;
            font-size: 1.8rem;
            lettre-spacing: 0.1em;
            margin-top: 3rem;
            letter-spacing: 0.1em;
          }
        `}</style>
      </div>
    </Wrapper>
  );
}
