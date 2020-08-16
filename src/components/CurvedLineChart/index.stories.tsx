import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CurvedLineChart, CurvedLineChartProps } from '.';

export default {
  title: 'Components/CurvedLineChart',
  component: CurvedLineChart,
  argTypes: {},
} as Meta;

const Template: Story<CurvedLineChartProps> = args => (
  <CurvedLineChart {...args} />
);

export const Base = Template.bind({});
Base.args = {};
