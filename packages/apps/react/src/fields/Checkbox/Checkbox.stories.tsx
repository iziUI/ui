import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Checkbox, { CheckboxProps } from './Checkbox';

export const Colors: StoryObj<typeof Checkbox> = {
  render: () => {
    return (
      <Stack gap={4}>
        <Checkbox name="fake" color="primary" checked label="Primary" />
        <Checkbox name="fake" color="secondary" checked label="Secondary" />
        <Checkbox name="fake" color="error" checked label="Error" />
        <Checkbox name="fake" color="info" checked label="Info" />
        <Checkbox name="fake" color="success" checked label="Success" />
        <Checkbox name="fake" color="warning" checked label="Warning" />
        <Checkbox name="fake" color="grey" checked label="Grey" />
      </Stack>
    );
  }
};

export const Label: StoryObj<typeof Checkbox> = {
  render: () => {
    return (
      <Checkbox checked name="fake" color="primary" label="Some label here" />
    );
  }
};

export const Validation: StoryObj<typeof Checkbox> = {
  render: () => {
    return (
      <Checkbox
        checked
        name="fake"
        color="primary"
        label="Accept terms"
        error helperText="You must accept the terms"
      />
    );
  }
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: () => {
    return (
      <Stack>
        <Checkbox name="fake" color="primary" label="Disabled unchecked" disabled />
        <Checkbox name="fake" color="primary" label="Disabled checked" disabled checked />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Checkbox> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Checkbox> = {
  title: 'Fields/Checkbox',
  component: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked);

    const handleChange = () => { setChecked(prev => !prev); };

    return (
      <Checkbox {...args} checked={checked} onChange={handleChange} />
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Checkbox allows users to select one or more options from a set, ideal for multi-selection scenarios.',
      tag: (
        <Chip
          label="Fields"
          color="info"
          icon={<Icon name="check-square" />}
        />
      ),
    },
  },
  args: {
    color: 'primary',
    label: 'Some label here',
    error: false,
    helperText: '',
    disabled: false,
    checked: false,
  },
  argTypes: {
    color: {
      control: 'select',
      type: 'string',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The color of the component.',
      table: {
        type: { summary: 'Colors' },
        defaultValue: { summary: 'primary' },
      },
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'Label text displayed next to the checkbox.',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, it displays the error status in the component.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
      type: 'string',
      description: 'Auxiliary text displayed below the component.',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, the checkbox is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checked: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, the checkbox is checked.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
