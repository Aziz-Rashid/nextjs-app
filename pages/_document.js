import Document, { Html, Head, Main, NextScript } from "next/document";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#f50f4c" />

          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="icon"
            sizes="16x16 32x32 64x64"
            href="/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/favicon/favicon-192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="160x160"
            href="/favicon/favicon-160.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/favicon/favicon-64.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16.png"
          />
          <link rel="apple-touch-icon" href="/favicon/favicon-57.png" />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicon/favicon-114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicon/favicon-72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicon/favicon-144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicon/favicon-60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicon/favicon-120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicon/favicon-76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicon/favicon-152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/favicon-180.png"
          />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta
            name="msapplication-TileImage"
            content="/favicon/favicon-144.png"
          />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          />

          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
