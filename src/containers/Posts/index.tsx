/* eslint-disable no-console */

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Post = {
  id: string;
  title: string;
  body: string;
};

const API_URL_POST =
  process.env.NODE_ENV === 'production'
    ? `https://jsonplaceholder.typicode.com`
    : `/api`;

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${API_URL_POST}/posts`, {
        cancelToken: source.token,
      })
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.log(error);
        }
      });

    return function cleanup() {
      // cancel the request (the message parameter is optional)
      source.cancel('API is canceled on cleanup');
    };
  }, []);

  return (
    <div>
      <h1> API calls with React Hooks </h1>
      {isLoading && (
        <h2 style={{ color: 'yellowgreen' }}>Wait I'm Loading posts for you</h2>
      )}
      {posts.map(p => (
        <div key={p.id} data-testid="post">
          <div>
            <h2 style={{ textDecoration: 'Underline' }}>{p.title}</h2>
            <p>{p.body}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
