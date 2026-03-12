import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Stack from '@/layout/Stack';
import Alert from '@/feedback/Alert';

import Icon from './Icon';

const icon = 'rocket';

export const ExternalLib: StoryObj<typeof Icon> = {
  tags: ['!dev'],
  render: () => {
    return (
      <p>
        Os ícones disponíveis neste componente são baseados na biblioteca {' '}
        <a href="https://iconscout.com/unicons/free-line-icons" target="_blank" rel="noopener noreferrer">
          Unicons Free Line Icons
        </a>.
        Consulte a biblioteca para visualizar os nomes, variações e opções disponíveis antes de utilizar um ícone.
      </p>
    );
  }
};

export const size: StoryObj<typeof Icon> = {
  parameters: { layout: 'centered', },
  render: () => {
    return (
      <Stack flexDirection="row">
        <Icon name={icon} size={16} />
        <Icon name={icon} />
        <Icon name={icon} size={32} />
      </Stack>
    );
  }
};

export const _colors: StoryObj<typeof Icon> = {
  parameters: { layout: 'centered', },
  render: () => {
    return (
      <Stack flexDirection="row">
        <Icon name={icon} color="primary.main" />
        <Icon name={icon} color="secondary.main" />
        <Icon name={icon} color="success.main" />
        <Icon name={icon} color="warning.main" />
        <Icon name={icon} color="error.main" />
        <Icon name={icon} color="info.main" />
      </Stack>
    );
  }
};

const meta: Meta<typeof Icon> = {
  title: 'display/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: 'Orientações e sugestões para usar ícones.',
      alert: (
        <Alert
          color="warning"
          icon={<Icon name="info-circle" />}
        >
          <p style={{ margin: 0, color: 'currentColor' }}>
            Os ícones disponíveis neste componente são baseados na biblioteca {' '}
            <a href="https://iconscout.com/unicons/free-line-icons" target="_blank" rel="noopener noreferrer">
              Unicons Free Line Icons
            </a>.
            <br />
            Consulte a biblioteca para visualizar os nomes, variações e opções disponíveis antes de utilizar um ícone.
          </p>
        </Alert>
      )
    },
  },
  argTypes: {
    name: {
      control: 'text',
      type: 'symbol',
      description: 'Elemento colocado antes do children.',
    },
    size: {
      control: 'select',
      type: 'string',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do componente',
      table: {
        defaultValue: { summary: 'medium' }
      }
    },
    color: {
      control: 'select',
      type: 'string',
      options: colors,
      description: 'A cor do componente. Suporta cores de tema padrão e personalizadas.',
      table: {
        type: { summary: colors.join(' | ') },
        defaultValue: { summary: 'primary' }
      }
    },
  }
};

export default meta;