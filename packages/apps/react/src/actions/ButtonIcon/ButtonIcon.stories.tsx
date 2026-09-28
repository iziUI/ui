import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import Chip from '@/display/Chip';

import ButtonIcon from './ButtonIcon';

export const Disabled: StoryObj<typeof ButtonIcon> = {
  render: () => {
    return (
      <ButtonIcon disabled>
        <Icon name="star" />
      </ButtonIcon>
    );
  }
};

export const Variants: StoryObj<typeof ButtonIcon> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <ButtonIcon variant="contained">
          <Icon name="star" />
        </ButtonIcon>
        <ButtonIcon variant="outlined">
          <Icon name="star" />
        </ButtonIcon>
        <ButtonIcon variant="text">
          <Icon name="star" />
        </ButtonIcon>
      </Stack>
    );
  },
};

export const Colors: StoryObj<typeof ButtonIcon> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <ButtonIcon>
          <Icon name="star" />
        </ButtonIcon>
        <ButtonIcon color="secondary">
          <Icon name="star" />
        </ButtonIcon>
        <ButtonIcon color="info">
          <Icon name="star" />
        </ButtonIcon>
        <ButtonIcon color="error">
          <Icon name="star" />
        </ButtonIcon>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof ButtonIcon> = {
  tags: ['!dev'],
};

const meta: Meta<typeof ButtonIcon> = {
  title: 'actions/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Buttons permitem que os usuários realizem ações, confirmem escolhas e iniciem fluxos dentro da interface.',
      tag: (
        <Chip
          label="Actions"
          icon={<Icon name="crosshair-alt" />}
          color="error"
        />
      ),
    },
  },
  args: {
    children: <Icon name="heart" />,
    size: 40,
    disabled: false,
    variant: 'outlined',
  },
  argTypes: {
    size: {
      control: 'select',
      type: 'string',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o componente está desativado.',
      table: {
        defaultValue: { summary: 'false' },
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
    variant: {
      control: 'select',
      type: 'string',
      options: ['contained', 'outlined', 'text'],
      description: 'The variant to be used.',
      table: {
        type: { summary: 'contained | outlined | text' },
        defaultValue: { summary: 'contained' },
      },
    },
    children: {
      control: false,
      type: 'symbol',
      description: 'Conteúdo do componente',
    },
  }
};

export default meta;