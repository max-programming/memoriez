import { Head, Html, Main, NextScript } from 'next/document';

class Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <script
            async
            defer
            data-website-id='4b493259-b01a-4728-976a-c357291ec12e'
            src='https://analytics.usman-s.me/umami.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
