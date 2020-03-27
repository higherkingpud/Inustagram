import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            // href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            href="https://fonts.googleapis.com/css?family=Noto+Sans+JP:300,600&display=swap"
          />
          <style>{`
            * {
              box-sizing: border-box;
            }
            *::-webkit-scrollbar {
              display: none;
            }
            html {
              font-size: 15px;
              font-family: 'Noto+Sans+JP' !important;
            }
            html::-webkit-scrollbar {
              display:none;
            }
            body {
              -webkit-font-smoothing: antialiased;
              background-color: #9d8770;
              color: #333;
              font-size: 14px;
              margin: 0;
              min-width: 800px;
            }
            a {
              text-decoration: none;
            }
            ul {
              margin: 0;
              padding: 0;
              list-style-type: none;
            }
            input,
            textarea {
              border: none;
              outline: none;
            }
            .flex {
              display: flex;
              flex-diraction: row;
            }
            .overlay {
              background-color: #000;
              height: 100vh;
              left: 0;
              opacity: 0.3;
              position: absolute;
              top: 0;
              width: 100vw;
              z-index: 2;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
