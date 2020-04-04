import React from 'react';
import { GlobalCss } from '../components/GlobalCss';
import Head from 'next/head';
import { Card } from '../components/Card';
import { ZeitIcon } from '../components/ZeitIcon';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalCss />

      <div className="container">
        <main>
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <p className="description">
            Get started by editing <code>src/pages/index.tsx</code>
          </p>
          <div className="grid">
            {[
              {
                link: 'https://nextjs.org/docs',
                title: 'Documentation',
                subTitle:
                  'Find in-depth information about Next.js features and API.',
              },
              {
                link: 'https://nextjs.org/learn',
                title: 'Learn',
                subTitle:
                  'Learn about Next.js in an interactive course with quizzes!',
              },
              {
                link: 'https://github.com/zeit/next.js/tree/master/examples',
                title: 'Examples',
                subTitle:
                  'Discover and deploy boilerplate example Next.js projects.',
              },
              {
                link: '/posts',
                title: 'Posts',
                subTitle: 'A link to test File-System Routing of Nest.js',
              },
            ].map(data => {
              const { link, ...others } = data;
              if (data.title === 'Posts') {
                return (
                  <Link key={data.title} href={link}>
                    <a rel="noopener noreferrer">
                      <Card {...others} />
                    </a>
                  </Link>
                );
              }
              return (
                <a
                  key={data.title}
                  href={link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Card {...others} />
                </a>
              );
            })}
          </div>
        </main>
        <footer>
          <a
            href="https://zeit.co?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by &nbsp;
            <ZeitIcon />
          </a>
        </footer>

        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .title a {
            color: #0070f3;
            text-decoration: none;
          }

          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .title,
          .description {
            text-align: center;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }

          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }

          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            max-width: 800px;
            margin-top: 3rem;
          }

          .grid a {
            flex-basis: 45%;
          }

          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }

          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          footer img {
            margin-left: 0.5rem;
          }

          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    </>
  );
};

export default HomePage;
