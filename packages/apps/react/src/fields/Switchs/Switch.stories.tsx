import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import logger from '@iziui/toolkit/logger';

import Stack from '@/layout/Stack';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import { Control, Form, useForm } from '@/lab/Form';

import Switch, { SwitchProps } from './Switch';

type SwitchForm = {
  switch: boolean;
}

export const Colors: StoryObj<typeof Switch> = {
  render: () => {
    return (
      <Stack>
        <Switch color="primary" checked />
        <Switch color="secondary" checked />
        <Switch color="error" checked />
        <Switch color="info" checked />
        <Switch color="success" checked />
        <Switch color="warning" checked />
      </Stack>
    );
  }
};

export const Label: StoryObj<typeof Switch> = {
  render: () => {
    return (
      <Stack>
        <Switch color="primary" label="Some label here" />
      </Stack>
    );
  }
};

export const Validation: StoryObj<typeof Switch> = {
  render: () => {
    return (
      <Stack>
        <Switch color="primary" label="Some label here" error helperText="helper text here" />
      </Stack>
    );
  }
};

export const Controlled: StoryObj<typeof Switch> = {
  render: () => {
    const formGroup = useForm<SwitchForm>({
      form: {
        switch: { defaultValue: false },
      },
      handle: {
        submit: (form) => {
          logger.debug({ form });
        }
      }
    });

    return (
      <Form formGroup={formGroup}>
        <Control
          action="change"
          controlName="switch"
          field={(control) => (
            <Switch
              color="primary"
              label="Some label here"
              checked={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />)
          }
        />
      </Form>
    );
  }
};

export const Playground: StoryObj<typeof Switch> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Switch> = {
  title: 'Fields/Switch',
  component: (args: SwitchProps) => {
    const [checked, setChecked] = useState(args.checked);

    const handleChange = () => { setChecked(prev => !prev); };

    return (
      <Switch {...args} checked={checked} onChange={handleChange} />
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'The switch allows you to enable or disable an option in binary form, ideal for settings and preferences.',
      tag: (
        <Chip
          label="Layout"
          color="info"
          icon={<Icon name="keyboard" />}
        />
      ),
    },
  },
  args: {
    color: 'primary',
    label: 'Some label here',
    error: false,
    helperText: '',
    auto: false,
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
      description: 'Label text displayed next to the switch.',
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
    auto: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, automatically applies margin to the container.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;