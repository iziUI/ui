import type { Meta, StoryObj } from '@storybook/react';

import { generateSupportColors } from '@iziui/core/utils/generateSupportColors';

import Stack from '@/layout/Stack';

import Avatar from './Avatar';
import Icon from '../Icon';
import Chip from '../Chip';

export const Variants: StoryObj<typeof Avatar> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Avatar
          src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Sarah"
        />
        <Avatar name="Saul Goodman" />
        <Avatar />
        <Avatar icon={<Icon name="anchor" />} />
      </Stack>
    );
  }
};

export const CustomColor: StoryObj<typeof Avatar> = {
  render: () => {
    const { main, contrast } = generateSupportColors('#0173e7');

    return (
      <Stack gap={8} flexDirection="row">
        <Avatar />
        <Avatar color="secondary" />
        <Avatar color="success" />
        <Avatar color="warning" />
        <Avatar color="error" />
        <Avatar color="info" />
        <Avatar style={{ background: main, color: contrast }} />
      </Stack>
    );
  }
};

export const clickable: StoryObj<typeof Avatar> = {
  render: () => {
    return (
      <Avatar onClick={() => alert('Hello!')} />
    );
  }
};

export const Playground: StoryObj<typeof Avatar> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Avatar> = {
  title: 'display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Avatars are found throughout material design with uses in everything from tables to dialog menus.',
      tag: (
        <Chip
          label="Display"
          icon={<Icon name="monitor" />}
          color="primary"
        />
      )
    }
  },
  args: {
    alt: '',
    src: '',
    name: '',
    size: 40,
    variant: 'circular',
  },
  argTypes: {
    alt: {
      control: 'text',
      type: 'string',
      description: 'Alternative text',
    },
    src: {
      control: 'text',
      type: 'string',
      description: 'Define a URL ou o caminho do arquivo de um recurso externo',
    },
    name: {
      control: 'text',
      type: 'string',
      description: 'Nome de onde serão capturadas as iniciais',
    },
    size: {
      control: 'range',
      type: 'string',
      description: 'Tamanho do componente',
    },
    variant: {
      control: 'select',
      options: ['rounded', 'circular'],
      type: 'string',
      description: 'A variante a ser usada.',
    }
  }
};

export default meta;