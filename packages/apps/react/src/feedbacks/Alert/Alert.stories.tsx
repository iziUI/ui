import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';

import Alert from './Alert';

export const Colors: StoryObj<typeof Alert> = {
  render: () => {
    return (
      <Stack>
        <Alert>Uma mensagem aleatória</Alert>
        <Alert color="secondary">Uma mensagem aleatória</Alert>
        <Alert color="success">Uma mensagem aleatória</Alert>
        <Alert color="error">Uma mensagem aleatória</Alert>
        <Alert color="warning">Uma mensagem aleatória</Alert>
        <Alert color="info">Uma mensagem aleatória</Alert>
      </Stack>
    );
  }
};

export const WithClose: StoryObj<typeof Alert> = {
  render: () => {
    return (
      <Stack>
        <Alert onClose={() => ''}>Uma mensagem aleatória</Alert>
      </Stack>
    );
  }
};

export const WithIcon: StoryObj<typeof Alert> = {
  render: () => {
    return (
      <Stack>
        <Alert
          color="success"
          icon={<Icon name="check" />}
          onClose={() => ''}
        >
          Uma mensagem aleatória
        </Alert>
        <Alert
          color="error"
          icon={<Icon name="check" />}
          onClose={() => ''}
        >
          Uma mensagem aleatória
        </Alert>
        <Alert
          color="warning"
          icon={<Icon name="check" />}
          onClose={() => ''}
        >
          Uma mensagem aleatória
        </Alert>
        <Alert
          color="info"
          icon={<Icon name="check" />}
          onClose={() => ''}
        >
          Uma mensagem aleatória
        </Alert>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Alert> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Alerts display brief messages for the user without interrupting their use of the app.',
    },
  },
  args: {
    color: 'primary',
    children: 'Some text here',
    icon: <Icon name="fire" />,
    onClose: () => { }
  },
  argTypes: {
    color: {
      control: 'select',
      type: 'string',
      options: colors,
      description:
        'A cor do componente. Suporta cores de tema padrão e personalizadas.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    icon: {
      control: false,
      type: 'symbol',
      description: 'Elemento colocado antes do children.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    children: {
      control: 'text',
      type: 'symbol',
      description: 'Conteúdo do componente',
    },
    onClose: {
      control: false,
      description: 'Função chamada quando o icone de fechamento for acionado',
    }
  }
};

export default meta;
