import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Typography from '@/display/Typography';

import Container from './Container';
import Box from '../Box';

export const Variant: StoryObj<typeof Container> = {
  render: () => {
    return (
      <div style={{ width: 1280 }}>
        <Container>
          <Box sx={{
            p: 2,
            borderRadius: 1,
            background: ({ primary }) => primary.main,
            color: ({ primary }) => primary.contrast
          }}>
            <Typography>Some text here</Typography>
          </Box>
        </Container>
      </div>
    );
  },
};

export const Playground: StoryObj<typeof Container> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Container> = {
  title: 'layout/Container',
  component: (args) => (
    <Container {...args}>
      {args.children}
    </Container>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Todo: Container description',
      tag: (
        <Chip
          label="Layout"
          icon={<Icon name="web-grid-alt" />}
        />
      ),
    },
  },
  args: {
    children: 'Container content',
    tag: 'div',
  },
  argTypes: {
    children: {
      control: 'text',
      type: 'symbol',
      description: 'Conteúdo do componente',
    },
    tag: {
      control: 'text',
      type: 'string',
      description: 'Tag html',
      table: {
        type: { summary: 'React.ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
  },
};

export default meta;
