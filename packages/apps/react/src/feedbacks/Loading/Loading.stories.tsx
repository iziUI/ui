import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Stack from '../../layout/Stack';
import Loading, { type LoadingProps } from './Loading';

export const Colors: StoryObj<typeof Loading> = {
  render: () => {
    return (
      <Stack flexDirection="row" alignItems="baseline">
        <Loading color="primary" />
        <Loading color="secondary" />
        <Loading color="error" />
        <Loading color="warning" />
      </Stack>
    );
  }
};

export const Sizes: StoryObj<typeof Loading> = {
  render: () => {
    return (
      <Stack flexDirection="row" alignItems="baseline">
        <Loading size="1rem" />
        <Loading size="2rem" />
        <Loading size="3rem" />
        <Loading size="4rem" />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Loading> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Loading> = {
  title: 'feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        `Loading indicators commonly known as spinners, ]
        express an unspecified wait time or display the length of a process.`,
    },
  },
  args: {
    color: 'primary',
    size: 50,
  },
  argTypes: {
    size: {
      control: 'range',
      type: 'number',
      description: 'Tamanho do componente',
      table: {
        defaultValue: { summary: '1.5rem' },
      },
    },
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