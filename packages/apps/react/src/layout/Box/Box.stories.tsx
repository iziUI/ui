import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Box from './Box';

export const Playground: StoryObj<typeof Box> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Box> = {
  title: 'layout/Box',
  component: (args) => (
    <Box {...args}>
      {args.children}
    </Box>
  ),
  parameters: {
    docs: {
      ref: Playground,
      // eslint-disable-next-line
      description: 'O componente Box é um contêiner genérico, compatível com temas, com acesso a utilitários CSS do sistema MUI.',
      tag: (
        <Chip
          label="Layout"
          icon={<Icon name="web-grid-alt" />}
        />
      ),
    },
  },
  args: {
    children: 'Some text',
    sx: {
      p: 2,
      borderRadius: 2,
      color: ({ primary }) => primary.contrast,
      background: ({ primary }) => primary.main,
    }
  },
  argTypes: {
    children: {
      control: 'text',
      type: 'symbol',
      description: 'Conteúdo do componente',
    },
    sx: {
      control: 'object',
      type: 'symbol',
      description: 'Utilitário do <a href="#">sistema de design</a> iziUI',
    },
  }
};

export default meta;