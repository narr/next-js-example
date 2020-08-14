import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import PostsPage from '../../pages/test/posts';

export default {
  title: 'Test/PostsPage',
  component: PostsPage,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = args => <PostsPage {...args} />;

export const Base = Template.bind({});
Base.args = {};
