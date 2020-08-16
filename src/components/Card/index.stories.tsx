import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Card, CardProps } from './index';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<CardProps> = args => <Card {...args} />;

export const Base = Template.bind({});
Base.args = {
  title: 'title test',
  subTitle: 'subTitle test',
};
