import { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';

import ColorPicker from './ColorPicker';

export const Default: StoryObj<typeof ColorPicker> = {
  render: () => {
    return (
      <Stack>
        <ColorPicker label="Pick a color" value="#1abc9c" />
      </Stack>
    );
  },
};

export const Validation: StoryObj<typeof ColorPicker> = {
  render: () => {
    return (
      <ColorPicker label="Color" error helperText="Color is required" />
    );
  },
};

export const State: StoryObj<typeof ColorPicker> = {
  render: () => {
    return (
      <Stack>
        <ColorPicker
          label="Disabled"
          value="#6200ee"
          disabled
        />
      </Stack>
    );
  },
};

export const ExtendsMenuProps: StoryObj<typeof ColorPicker> = {
  render: () => {
    return (
      <Stack>
        <ColorPicker
          disabled
          label="Disabled"
          value="#6200ee"
          MenuProps={{
            direction: 'left'
          }}
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
  component: ColorPicker,
  parameters: {
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
