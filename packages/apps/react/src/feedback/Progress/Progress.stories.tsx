import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';

import Progress, { type ProgressProps } from './Progress';

export const Default: StoryObj<typeof Progress> = {
  render: () => (
    <div style={{ width: 500 }}>
      <Progress percent={40} />
    </div>
  ),
};

export const Colors: StoryObj<typeof Progress> = {
  render: () => (
    <Stack style={{ width: 500 }}>
      <Progress percent={10} />
      <Progress percent={20} color="secondary" />
      <Progress percent={30} color="grey" />
      <Progress percent={40} color="success" />
      <Progress percent={50} color="error" />
      <Progress percent={60} color="warning" />
      <Progress percent={70} color="info" />
    </Stack>
  ),
};

export const Playground: StoryObj<typeof Progress> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: (args: ProgressProps) => {
    return (
      <div style={{ width: 500 }}>
        <Progress {...args} />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Progress component.',
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
    color: 'primary',
    percent: 40
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
  }
};

export default meta;
