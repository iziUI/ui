import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Button from '@/actions/Button';

import Toast from './Toast';
import ToastProvider from './ToastProvider';
import useToast from './useToast';

function Child() {
  const { addToast } = useToast();
  const [count, setCount] = useState(0);

  const handleAddToast = () => {
    setCount(count + 1);
    addToast({
      color: 'primary',
      message: `${count + 1} - Lorem Ipsum is simply dummy text of the printing and typesetting`,
      icon: <Icon name="fire" />,
      delay: 2000,
    });
  };

  return (
    <Button type="button" onClick={handleAddToast}>Adicionar toast</Button>
  );
};

export const Example: StoryObj<typeof ToastProvider> = {
  render: () => {
    return (
      <ToastProvider>
        <Child />
      </ToastProvider>
    );
  }
};

export const Playground: StoryObj<typeof Toast> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Toasts exibem mensagens curtas e temporárias para informar o usuário sobre o resultado de uma ação.',
      tag: (
        <Chip
          label="Feedback"
          color="success"
          icon={<Icon name="feedback" />}
        />
      ),
    },
  },
  args: {
    color: 'primary',
    message: 'Some text here',
    delay: 2000,
  },
  argTypes: {
    id: {
      control: 'text',
      type: 'string',
      description: 'Identificador único do toast, utilizado para removê-lo da fila.',
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      control: 'select',
      type: 'string',
      options: colors,
      description: 'A cor do componente. Suporta cores de tema padrão e personalizadas.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    message: {
      control: 'text',
      type: 'symbol',
      description: 'Conteúdo da mensagem exibida no toast.',
      table: {
        type: { summary: 'ReactElement | string' },
      },
    },
    icon: {
      control: false,
      type: 'symbol',
      description: 'Elemento colocado antes da mensagem.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    delay: {
      control: 'number',
      type: 'number',
      description: 'Tempo em milissegundos até o toast ser removido automaticamente.',
      table: {
        type: { summary: 'number' },
      },
    },
    visible: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o toast está visível.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    onRemove: {
      control: false,
      description: 'Função chamada quando o toast for removido, recebendo o `id` como argumento.',
      table: {
        type: { summary: '(id: string) => void' },
      },
    },
  },
};

export default meta;
