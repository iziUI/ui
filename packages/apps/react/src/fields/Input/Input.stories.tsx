import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import IconComponent from '@/display/Icon';
import ButtonIcon from '@/components/ButtonIcon';

import Input, { type InputType } from './Input';

const meta: Meta<typeof Input> = {
  title: 'fields/Input',
  component: Input,
  parameters: {
    docs: {
      description: 'Os inputs permitem que os usuários insiram e editem texto.'
    }
  }
};

export const InputTypes: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Stack>
        <Input placeholder="Text" />
        <Input placeholder="Password" type="password" />
        <Input placeholder="Number" type="number" />
        <Input placeholder="Date" type="date" value="2014-02-09" />
      </Stack>
    );
  }
};

export const Icon: StoryObj<typeof Input> = {
  render: () => {
    const [visible, setVisible] = useState<'show' | 'hide'>('show');

    const MAP = {
      show: { type: 'text', icon: 'eye' },
      hide: { type: 'password', icon: 'eye-slash' },
    };

    const data = MAP[visible];

    return (
      <Stack flexDirection="column">
        <Input type={data.type as InputType} endIcon={
          <ButtonIcon onClick={() => setVisible(prev => prev === 'hide' ? 'show' : 'hide')}>
            <IconComponent name={data.icon} />
          </ButtonIcon>
        } />
        <Input type="text" startIcon={
          <ButtonIcon>
            <IconComponent name="search" />
          </ButtonIcon>
        } />
      </Stack>
    );
  }
};

export const Label: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input label="Label here" />
    );
  }
};

export const Validation: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input helperText="Email ou senha inválidos" label="label here" error />
    );
  }
};

export const HelperText: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Input helperText="Uma mensagem aqui" />
    );
  }
};

export const State: StoryObj<typeof Input> = {
  render: () => {
    return (
      <Stack>
        <Input placeholder="disabled" disabled startIcon={
          <ButtonIcon>
            <IconComponent name="search" />
          </ButtonIcon>
        } />
        <Input placeholder="Read only" readOnly />
      </Stack>
    );
  }
};

export default meta;