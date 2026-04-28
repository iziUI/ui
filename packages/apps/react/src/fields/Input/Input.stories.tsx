import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import ButtonIcon from '@/actions/ButtonIcon';

import Input, { type InputType } from './Input';

export const InputTypes: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Stack>
        <Input placeholder="Text" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Number" type="number" />
        <Input placeholder="Date" type="date" value="2014-02-09" />
      </Stack>
    );
  }
};

export const _Icon: StoryObj<typeof Input> = {
  render: () => {
    const [visible, setVisible] = useState<'show' | 'hide'>('show');

    const MAP = {
      show: { type: 'text', icon: 'eye' },
      hide: { type: 'password', icon: 'eye-slash' },
    };

    const data = MAP[visible];

    return (
      <Stack flexDirection="column">
        <Input type={data.type as InputType} endIcon={
          <ButtonIcon onClick={() => setVisible(prev => prev === 'hide' ? 'show' : 'hide')}>
            <Icon name={data.icon} />
          </ButtonIcon>
        } />
        <Input type="text" startIcon={
          <ButtonIcon>
            <Icon name="search" />
          </ButtonIcon>
        } />
      </Stack>
    );
  }
};

export const Label: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input label="Label here" />
    );
  }
};

export const Validation: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input helperText="Email ou senha inválidos" label="label here" error />
    );
  }
};

export const HelperText: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input helperText="Uma mensagem aqui" />
    );
  }
};

export const State: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Stack>
        <Input placeholder="disabled" disabled startIcon={
          <ButtonIcon>
            <Icon name="search" />
          </ButtonIcon>
        } />
        <Input placeholder="Read only" readOnly />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Input> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Input> = {
  title: 'fields/Input',
  component: Input,
  parameters: {
    docs: {
      ref: Playground,
      description: 'Input permite que os usuários insiram e editem texto ou dados em formulários e interfaces.',
      tag: (
        <Chip
          label="Layout"
          color="info"
          icon={<Icon name="keyboard" />}
        />
      ),
    }
  },
  args: {
    placeholder: 'Digite aqui...',
    type: 'text',
    label: 'Label',
    disabled: false,
    error: false,
    helperText: '',
  },
  argTypes: {
    type: {
      control: 'select',
      type: 'string',
      options: ['text', 'password', 'number', 'date', 'month', 'tel'],
      description: 'Tipo do campo de entrada.',
      table: {
        type: { summary: 'text | password | number | date | month | tel' },
        defaultValue: { summary: 'text' },
      },
    },
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
      description: 'Texto auxiliar exibido abaixo do campo, geralmente para mensagens de validação.',
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
    startIcon: {
      control: false,
      type: 'symbol',
      description: 'Elemento exibido no início do campo.',
      table: {
        type: { summary: 'ReactElement | boolean' },
      },
    },
    endIcon: {
      control: false,
      type: 'symbol',
      description: 'Elemento exibido no final do campo.',
      table: {
        type: { summary: 'ReactElement | boolean' },
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
    placeholder: {
      control: 'text',
      type: 'string',
      description: 'Texto exibido quando o campo está vazio.',
      table: {
        type: { summary: 'string' },
      },
    },
    readOnly: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o campo é somente leitura.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;