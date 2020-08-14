import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import HomePage from '../../pages/test';

export default {
  title: 'Test/HomePage',
  component: HomePage,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = args => <HomePage {...args} />;

export const Base = Template.bind({});
Base.args = {};
