import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { CurvedLineChart, CurvedLineChartProps } from './CurvedLineChart';

export default {
  title: 'D3/CurvedLineChart',
  component: CurvedLineChart,
  argTypes: {},
} as Meta;

const Template: Story<CurvedLineChartProps> = args => (
  <CurvedLineChart {...args} />
);

export const Base = Template.bind({});
Base.args = {};
