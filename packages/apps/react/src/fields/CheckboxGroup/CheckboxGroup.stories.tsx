import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Checkbox from '../Checkbox/Checkbox';
import CheckboxGroup from './CheckboxGroup';

export const Default: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup>
      <Checkbox name="opt1" color="primary" label="Option 1" />
      <Checkbox name="opt2" color="primary" label="Option 2" />
      <Checkbox name="opt3" color="primary" label="Option 3" />
    </CheckboxGroup>
  ),
};

export const WithPreselected: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup values={['opt1', 'opt3']}>
      <Checkbox name="opt1" color="primary" label="Option 1" />
      <Checkbox name="opt2" color="primary" label="Option 2" />
      <Checkbox name="opt3" color="primary" label="Option 3" />
    </CheckboxGroup>
  ),
};

export const Playground: StoryObj<typeof CheckboxGroup> = {
  tags: ['!dev'],
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox name="opt1" color="primary" label="Option 1" />
      <Checkbox name="opt2" color="primary" label="Option 2" />
      <Checkbox name="opt3" color="primary" label="Option 3" />
    </CheckboxGroup>
  ),
};

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Fields/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        `CheckboxGroup manages a set of checkboxes as a controlled group, 
        handling checked state and change events collectively.`,
      tag: (
        <Chip
          label="Fields"
          color="info"
          icon={<Icon name="check-square" />}
        />
      ),
    },
  },
};

export default meta;
