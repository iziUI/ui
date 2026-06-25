import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import ButtonIcon from '@/actions/ButtonIcon';

import Textarea from './Textarea';

export const Default: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Textarea placeholder="Digite aqui..." />
    );
  },
};

export const WithIcon: StoryObj<typeof Textarea> = {
  render: () => {
    const [visible, setVisible] = useState<'show' | 'hide'>('show');

    const MAP = {
      show: { type: 'text', icon: 'eye' },
      hide: { type: 'password', icon: 'eye-slash' },
    };

    const data = MAP[visible];

    return (
      <Stack flexDirection="column">
        <Textarea endIcon={
          <ButtonIcon onClick={() => setVisible(prev => prev === 'hide' ? 'show' : 'hide')}>
            <Icon name={data.icon} />
          </ButtonIcon>
        } />
        <Textarea startIcon={
          <ButtonIcon>
            <Icon name="search" />
          </ButtonIcon>
        } />
        <Textarea startIcon={
          <Icon name="fire" size={20} />
        } />
      </Stack>
    );
  }
};

export const Label: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Textarea label="Label here" />
    );
  }
};

export const Validation: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Textarea helperText="Email ou senha inválidos" label="label here" error />
    );
  }
};

export const HelperText: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Textarea helperText="Uma mensagem aqui" />
    );
  }
};

export const Rows: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Textarea placeholder="Multiple rows" rows={4} />
    );
  }
};

export const State: StoryObj<typeof Textarea> = {
  render: () => {
    return (
      <Stack>
        <Textarea placeholder="disabled" disabled startIcon={
          <ButtonIcon>
            <Icon name="search" />
          </ButtonIcon>
        } />
        <Textarea placeholder="Read only" readOnly />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Textarea> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Textarea> = {
  title: 'fields/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      // TODO: write a proper Textarea description
      description: 'Todo: Textarea description',
      tag: (
        <Chip
          label="Fields"
          color="info"
          icon={<Icon name="check-square" />}
        />
      ),
    },
  },
  args: {
    placeholder: 'Digite aqui...',
  },
};

export default meta;
