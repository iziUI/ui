import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Skeleton from './Skeleton';

export const Variants: StoryObj<typeof Skeleton> = {
  render: () => {
    return (
      <Stack>
        <Skeleton variant="rounded" width={100} height={100} />
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="rectangular" width={100} height={100} />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Skeleton> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Skeleton> = {
  title: 'feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Skeleton exibe um placeholder animado enquanto o conteúdo real ainda está sendo carregado.',
      tag: (
        <Chip
          label="Feedback"
          color="success"
          icon={<Icon name="feedback" />}
        />
      )
    },
  },
  args: {
    variant: 'rounded',
    width: 100,
    height: 100,
  },
  argTypes: {
    variant: {
      control: 'select',
      type: 'string',
      options: ['rounded', 'rectangular', 'circular'],
      description: 'A forma visual do skeleton.',
      table: {
        type: { summary: 'rounded | rectangular | circular' },
        defaultValue: { summary: 'rounded' },
      },
    },
    width: {
      control: 'text',
      type: 'string',
      description: 'Largura do skeleton. Aceita qualquer valor válido de CSS.',
      table: {
        type: { summary: 'CSSProperties[\'width\']' },
      },
    },
    height: {
      control: 'text',
      type: 'string',
      description: 'Altura do skeleton. Aceita qualquer valor válido de CSS.',
      table: {
        type: { summary: 'CSSProperties[\'height\']' },
      },
    },
  },
};

export default meta;