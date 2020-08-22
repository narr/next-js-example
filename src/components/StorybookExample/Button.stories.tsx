import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button, ButtonProps } from './Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};
Secondary.parameters = {
  loki: { skip: true },
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};
Large.parameters = {
  loki: { skip: true },
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
Small.parameters = {
  loki: { skip: true },
};
