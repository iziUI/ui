import { useState, type HtmlHTMLAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import Box from '@/layout/Box';

import ColorPicker, { type ColorPickerProps } from './ColorPicker';

function ContainerBox({ ...props }: HtmlHTMLAttributes<HTMLDataElement>) {
  return (
    <Box
      style={{
        ...props.style,
        height: 100,
        width: '100%'
      }}
      sx={{ borderRadius: 2 }}
    />
  );
}

export const Default: StoryObj<typeof ColorPicker> = {
  render: () => {
    const [value, setValue] = useState<string>('#6200EE');
    return (
      <Stack>
        <ColorPicker
          fullWidth
          label="Pick a color"
          value={value}
          onInput={(e: any) => setValue(e.target.value)}
        />
        <ContainerBox style={{ background: value }} />
      </Stack>
    );
  },
};

export const Validation: StoryObj<typeof ColorPicker> = {
  render: () => {
    const [value, setValue] = useState<string>('#6200EE');

    return (
      <ColorPicker
        error
        value={value}
        label="Color"
        helperText="Color is required"
        onInput={(e: any) => setValue(e.target.value)}
      />
    );
  },
};

export const State: StoryObj<typeof ColorPicker> = {
  render: () => {
    const [value, setValue] = useState<string>('#6200EE');
    return (
      <Stack>
        <ColorPicker
          disabled
          label="Disabled"
          value={value}
          onInput={(e: any) => setValue(e.target.value)}
        />
      </Stack>
    );
  },
};

export const AutoClose: StoryObj<typeof ColorPicker> = {
  render: () => {
    const [value, setValue] = useState<string>('#6200EE');
    return (
      <Stack>
        <ColorPicker
          disabled
          autoClose
          label="Disabled"
          value={value}
          onInput={(e: any) => setValue(e.target.value)}
        />
      </Stack>
    );
  },
};

export const Playground: StoryObj<typeof ColorPicker> = {
  tags: ['!dev'],
};

const meta: Meta<typeof ColorPicker> = {
  title: 'fields/ColorPicker',
  component: (args: ColorPickerProps) => {
    const [value, setValue] = useState<string>(args.value);
    return (
      <div style={{ minHeight: 350 }}>
        <ColorPicker
          {...args}
          value={value}
          onInput={(e: any) => setValue(e.target.value)}
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'ColorPicker permite que os usuários selecionem uma cor a partir de uma paleta.',
      tag: (
        <Chip
          label="Fields"
          color="info"
          icon={<Icon name="palette" />}
        />
      ),
    },
  },
  args: {
    label: 'Label',
    defaultValue: '#6200ee',
    disabled: false,
    error: false,
    helperText: '',
    width: '100%',
  },
  argTypes: {
    error: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, exibe o campo em estado de erro.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      type: 'string',
      description: 'Rótulo exibido acima do campo.',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      type: 'string',
      description: 'Texto auxiliar exibido abaixo do campo.',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      type: 'string',
      description: 'Largura do campo. Aceita qualquer valor CSS válido.',
      table: {
        type: { summary: 'CSSProperties[\'width\']' },
        defaultValue: { summary: '100%' },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o campo fica desativado.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
