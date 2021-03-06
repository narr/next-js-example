import React from 'react';

export type CardProps = {
  title: string;
  subTitle: string;
};

export const Card = (props: CardProps) => {
  const { title, subTitle } = props;
  return (
    <div className="card">
      <h3>{title} &rarr;</h3>
      <p>{subTitle}</p>

      <style jsx>{`
        .card {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
