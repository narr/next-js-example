import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Message } from './Message';

export default {
  title: 'Example/Mobx/Message',
  component: Message,
  argTypes: {},
} as Meta;

const Template: Story = args => <Message {...args} />;

export const Base = Template.bind({});
Base.args = {};
