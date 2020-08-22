import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import createAsyncCallback from '@loki/create-async-callback';

import PostsPage, { PostsPageProps } from '../../pages/test/posts';

export default {
  title: 'Test/PostsPage',
  component: PostsPage,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<PostsPageProps> = args => {
  // NOTE: createAsyncCallback doesn't work if it is passed by args like example below
  // it hangs when running loki test
  // Base.args = {
  //   onPostsLoad: createAsyncCallback(),
  // };
  return (
    <PostsPage
      {...args}
      onPostsLoad={args.onPostsLoad ? args.onPostsLoad : createAsyncCallback()}
    />
  );
};

export const Base = Template.bind({});
Base.args = {};
