import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';

import Typography from './Typography';

export const size: StoryObj<typeof Typography> = {
  render: () => {
    return (
      <>
        <Typography style={{ margin: 0 }} variant="h1">H1</Typography>
        <Typography style={{ margin: 0 }} variant="h2">H2</Typography>
        <Typography style={{ margin: 0 }} variant="h3">H3</Typography>
        <Typography style={{ margin: 0 }} variant="h4">H4</Typography>
        <Typography style={{ margin: 0 }} variant="h5">H5</Typography>
        <Typography style={{ margin: 0 }} variant="h6">H6</Typography>
        <hr />
        <Typography style={{ margin: 0 }} variant="subtitle1">Subtitle1</Typography>
        <Typography style={{ margin: 0 }} variant="subtitle2">Subtitle2</Typography>
        <hr />
        <Typography style={{ margin: 0 }} variant="body1">body1</Typography>
        <Typography style={{ margin: 0 }} variant="body2">body2</Typography>
      </>
    );
  }
};

export const colors: StoryObj<typeof Typography> = {
  render: () => {
    return (
      <Stack flexDirection="column">
        <Typography style={{ margin: 0 }} variant="h5" color="primary">primary</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="primary.dark">primary.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="primary.light">primary.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="secondary">secondary</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="secondary.dark">secondary.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="secondary.light">secondary.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="error">error</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="error.dark">error.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="error.light">error.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="warning">warning</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="warning.dark">warning.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="warning.light">warning.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="info">info</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="info.dark">info.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="info.light">info.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="success">success</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="success.dark">success.dark</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="success.light">success.light</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="text">text</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="text.primary">text.primary</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="text.secondary">text.secondary</Typography>
        <Typography style={{ margin: 0 }} variant="h5" color="text.disabled">text.disabled</Typography>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Typography> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Typography> = {
  title: 'display/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Use typography to present your design and content as clearly and efficiently as possible.',
    },
  },
  args: {
    variant: 'body1',
    weight: 'bold',
    textAlign: 'left',
    color: 'text.primary',
    children: 'Some text here'
  },
  argTypes: {
    variant: {
      control: 'select',
      type: 'string',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do componente',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    }
  }
};

export default meta;