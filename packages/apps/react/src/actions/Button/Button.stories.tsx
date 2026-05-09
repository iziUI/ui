import type { Meta, StoryObj } from '@storybook/react';

import { colors } from '@iziui/tokens/web/js';

import Loading from '@/feedback/Loading';
import Chip from '@/display/Chip';

import Icon from '../../display/Icon';
import Stack from '../../layout/Stack';
import Button from './Button';

export const Colors: StoryObj<typeof Button> = {
  render: () => {
    return (
      <Stack flexDirection="row" flexWrap="wrap">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
        <Button color="error">Error</Button>
      </Stack>
    );
  },
};

export const Variants: StoryObj<typeof Button> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
      </Stack>
    );
  },
};

export const WithIcons: StoryObj<typeof Button> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Button startIcon={<Icon name="star" />}>Contained</Button>

        <Button endIcon={<Icon name="star" />}>Contained</Button>
      </Stack>
    );
  },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => {
    return (
      <>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </>
    );
  },
};

export const Disabled: StoryObj<typeof Button> = {
  render: () => {
    return (
      <Button disabled startIcon={<Icon name="star" />}>
        Disabled
      </Button>
    );
  },
};

export const _Loading: StoryObj<typeof Button> = {
  render: () => {
    return (
      <>
        <Button size="small" loading={<Loading />}>
          loading text
        </Button>
        <Button loading={<Loading />}>loading text</Button>
        <Button size="large" loading={<Loading />}>
          loading text
        </Button>
      </>
    );
  },
};

export const FullWidth: StoryObj<typeof Button> = {
  render: () => {
    return (
      <div style={{ width: 500 }}>
        <Button fullWidth>
          fullWidth
        </Button>
      </div>
    );
  },
};

export const Playground: StoryObj<typeof Button> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Button> = {
  title: 'actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Buttons allow users to perform actions, confirm choices, and initiate flows within the interface.',
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
    children: 'Some text here',
    size: 'medium',
    color: 'primary',
    variant: 'contained',
    disabled: false,
  },
  argTypes: {
    size: {
      control: 'select',
      type: 'string',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      type: 'boolean',
      description: 'If `true`, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'select',
      type: 'string',
      options: colors,
      description:
        'The components color. Supports standard and custom theme colors.',
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
    startIcon: {
      control: false,
      type: 'symbol',
      description: 'Element placed before the children.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    endIcon: {
      control: false,
      type: 'symbol',
      description: 'Element placed after children.',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    loading: {
      control: false,
      description:
        'If true, the charging indicator becomes visible and the button is disabled.',
      table: {
        type: { summary: 'boolean | ReactElement' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      type: 'symbol',
      description: 'Component content',
    },
  },
};

export default meta;
