import { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';

import Divider from '../Divider';
import Chip from './Chip';

export const variants: StoryObj<typeof Chip> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Chip label="contained" variant="contained" />
        <Chip label="outlined" variant="outlined" />
      </Stack>
    );
  }
};

export const _colors: StoryObj<typeof Chip> = {
  render: () => {
    return (
      <Stack>
        <Stack flexDirection="row">
          <Chip label="primary" color="primary" variant="contained" />
          <Chip label="secondary" color="secondary" variant="contained" />
          <Chip label="success" color="success" variant="contained" />
          <Chip label="error" color="error" variant="contained" />
          <Chip label="warning" color="warning" variant="contained" />
          <Chip label="info" color="info" variant="contained" />
          <Chip label="grey" color="grey" variant="contained" />
        </Stack>
        <Divider />
        <Stack flexDirection="row">
          <Chip label="primary" color="primary" variant="outlined" />
          <Chip label="secondary" color="secondary" variant="outlined" />
          <Chip label="success" color="success" variant="outlined" />
          <Chip label="error" color="error" variant="outlined" />
          <Chip label="warning" color="warning" variant="outlined" />
          <Chip label="info" color="info" variant="outlined" />
          <Chip label="grey" color="grey" variant="outlined" />
        </Stack>
      </Stack>
    );
  }
};

export const WithIcon: StoryObj<typeof Chip> = {
  render: () => {
    return (
      <Stack>
        <Stack flexDirection="row">
          <Chip icon={<Icon name="user" />} label="primary" color="primary" variant="contained" />
          <Chip icon={<Icon name="user" />} label="secondary" color="secondary" variant="contained" />
          <Chip icon={<Icon name="user" />} label="success" color="success" variant="contained" />
          <Chip icon={<Icon name="user" />} label="error" color="error" variant="contained" />
          <Chip icon={<Icon name="user" />} label="warning" color="warning" variant="contained" />
          <Chip icon={<Icon name="user" />} label="info" color="info" variant="contained" />
        </Stack>
        {/* <Divider /> */}
        <Stack flexDirection="row">
          <Chip icon={<Icon name="user" />} label="primary" color="primary" variant="outlined" />
          <Chip icon={<Icon name="user" />} label="secondary" color="secondary" variant="outlined" />
          <Chip icon={<Icon name="user" />} label="success" color="success" variant="outlined" />
          <Chip icon={<Icon name="user" />} label="error" color="error" variant="outlined" />
          <Chip icon={<Icon name="user" />} label="warning" color="warning" variant="outlined" />
          <Chip icon={<Icon name="user" />} label="info" color="info" variant="outlined" />
        </Stack>
      </Stack>
    );
  }
};

export const Size: StoryObj<typeof Chip> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Chip label="small" variant="contained" size="small" />
        <Chip label="medium" variant="contained" />
        <Chip label="large" variant="contained" size="large" />
      </Stack>
    );
  }
};

export const clickabel: StoryObj<typeof Chip> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Chip onClick={() => ''} label="contained" variant="contained" />
      </Stack>
    );
  }
};

export const WithClose: StoryObj<typeof Chip> = {
  render: () => {
    const handleLog = () => console.debug('close');
    return (
      <Stack flexDirection="column">
        <Stack flexDirection="row">
          <Chip onDelete={handleLog} label="primary" color="primary" variant="contained" />
          <Chip onDelete={handleLog} label="secondary" color="secondary" variant="contained" />
          <Chip onDelete={handleLog} label="success" color="success" variant="contained" />
          <Chip onDelete={handleLog} label="error" color="error" variant="contained" />
          <Chip onDelete={handleLog} label="warning" color="warning" variant="contained" />
          <Chip onDelete={handleLog} label="info" color="info" variant="contained" />
        </Stack>
        {/* <Divider /> */}
        <Stack flexDirection="row">
          <Chip onDelete={handleLog} label="primary" color="primary" variant="outlined" />
          <Chip onDelete={handleLog} label="secondary" color="secondary" variant="outlined" />
          <Chip onDelete={handleLog} label="success" color="success" variant="outlined" />
          <Chip onDelete={handleLog} label="error" color="error" variant="outlined" />
          <Chip onDelete={handleLog} label="warning" color="warning" variant="outlined" />
          <Chip onDelete={handleLog} label="info" color="info" variant="outlined" />
        </Stack>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Chip> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Chip> = {
  title: 'display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Os chips são elementos compactos que representam uma entrada, um atributo ou uma ação.',
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
    label: 'Some label',
    size: 'medium',
    color: 'default',
    variant: 'contained'
  },
  argTypes: {
    label: {
      control: 'text',
      type: 'string',
      description: 'O conteúdo do componente.',
    },
    icon: {
      description: 'Elemento de ícone',
      type: 'symbol'
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
      options: [...colors, 'default'],
      description: 'A cor do componente. Suporta cores de tema padrão e personalizadas.',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    variant: {
      control: 'select',
      type: 'string',
      options: ['contained', 'outlined'],
      description: 'A variante a ser usada.',
      table: {
        defaultValue: { summary: 'contained' }
      }
    }
  },
};

export default meta;