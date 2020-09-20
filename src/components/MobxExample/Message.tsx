import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const Author = observer(
  ({
    author,
    hobby,
  }: {
    author: MessageViewProps['message']['author'];
    hobby: { value: string };
  }) => {
    return (
      <span>
        Author&apos;s name is {author.name} and her/his hobby is {hobby.value}.
      </span>
    );
  }
);

const Likes = observer(
  ({ likes }: { likes: MessageViewProps['message']['likes'] }) => (
    <div>
      Who likes the book?
      <ul>
        {likes.map(like => (
          <li key={like}>{like}</li>
        ))}
      </ul>
    </div>
  )
);

interface MessageViewProps {
  message: {
    title: string;
    author: {
      name: string;
    };
    likes: string[];
  };
}

const hobby = {
  value: 'playing tennis',
};

const MessageView = observer(({ message }: MessageViewProps) => {
  setTimeout(() => {
    message.title = 'Food';
  }, 2000);
  return (
    <div>
      Book title is {message.title}.
      <br />
      <br />
      <Author author={message.author} hobby={hobby} />
      <br />
      <br />
      <Likes likes={message.likes} />
    </div>
  );
});

export const Message = () => {
  const message = observable({
    title: 'Love',
    author: {
      name: 'Michel',
    },
    likes: ['John', 'Sara'],
  });
  return <MessageView message={message} />;
};
