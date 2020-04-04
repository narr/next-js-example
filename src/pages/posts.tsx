import React from 'react';
import { GlobalCss } from '../components/GlobalCss';
import Head from 'next/head';
import { Posts } from '../containers/Posts';
import { useRouter } from 'next/router';

const PostsPage = () => {
  const router = useRouter();
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
            Get started by editing{' '}
            <code>{`src/pages${router.pathname}.tsx`}</code>
          </p>
          <Posts />
        </main>

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
        `}</style>
      </div>
    </>
  );
};

export default PostsPage;
