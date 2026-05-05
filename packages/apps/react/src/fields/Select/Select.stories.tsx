import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Select, { type SelectProps } from './Select';
import Option from './Option';

export const normal: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        placeholder="Selecione um valor"
        value={selected}
        label={`Selected: ${selected}`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const helperText: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        placeholder="Selecione um valor"
        helperText="Some text here"
        value={selected}
        label={`Selected: ${selected}`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const validation: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        error
        placeholder="Selecione um valor"
        helperText="Some text here"
        value={selected}
        label={`Selected: ${selected}`}
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const Disabled: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        disabled
        placeholder="Selecione um valor"
        label={`Selected: ${selected}`}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        startIcon={
          <Icon name="fire" />
        }
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const DisabledOption: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        placeholder="Selecione um valor"
        label={`Selected: ${selected}`}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        startIcon={
          <Icon name="fire" />
        }
      >
        <Option disabled value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const autoclose: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        autoClose
        placeholder="Select value"
        label={`Selected: ${selected}`}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const withIcon: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        placeholder="Selecione um valor"
        label={`Selected: ${selected}`}
        value={selected}
        startIcon={
          <Icon name="fire" />
        }
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>
    );
  }
};

export const optionWithIcon: StoryObj<typeof Select> = {
  render: () => {
    const [selected, setSelected] = useState<string>();

    return (
      <Select
        placeholder="Choose device"
        label={`Selected: ${selected}`}
        value={selected}
        startIcon={
          <Icon name="mobile-android" />
        }
        onChange={(e) => setSelected(e.target.value)}
      >
        <Option value="apple"
          startIcon={
            <Icon name="apple" />
          }
        >
          Apple
        </Option>
        <Option value="android"
          startIcon={
            <Icon name="android" />
          }
        >
          Android
        </Option>
      </Select>
    );
  }
};

export const Playground: StoryObj<typeof Select> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Select> = {
  title: 'Fields/Select',
  component: (args: SelectProps) => (
    <Select {...args} />
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      import: 'import { Select, Options } from \'@iziui/react/Select\'',
      description:
        'TODO: Select description',
      tag: (
        <Chip
          label="Fields"
          color="info"
          icon={<Icon name="chevron-down" />}
        />
      ),
    },
  },
  args: {
    name: 'select',
    label: 'Label',
    helperText: '',
    error: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      type: 'string',
      description: 'Label text displayed above the select.',
      table: {
        type: { summary: 'string' },
      },
    },
    error: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, displays the error state.',
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
      description: 'If `true`, the select is disabled.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
