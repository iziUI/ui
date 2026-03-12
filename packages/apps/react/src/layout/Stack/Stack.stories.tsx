import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import { Card, CardContent } from '@/display/Card';

import Stack from './Stack';

const selfPosition = ['center', 'end', 'flex-end', 'flex-start', 'self-end', 'self-start', 'start'];
const globals = ['-moz-initial', 'inherit', 'initial', 'revert', 'revert-layer', 'unset'];

function Item() {
  return (
    <Card fullWidth>
      <CardContent>
        <span>Item</span>
      </CardContent>
    </Card>
  );
}

export const _Row: StoryObj<typeof Stack> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <Item />
        <Item />
        <Item />
      </Stack>
    );
  }
};

export const _Column: StoryObj<typeof Stack> = {
  render: () => {
    return (
      <Stack flexDirection="column">
        <Item />
        <Item />
        <Item />
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Stack> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Stack> = {
  title: 'layout/Stack',
  component: (args) => (
    <Stack {...args} alignItems="">
      <Item />
      <Item />
      <Item />
    </Stack>
  ),
  parameters: {
    docs: {
      ref: Playground,
      description: 'Stack is a container component for arranging elements vertically or horizontally.',
      tag: (
        <Chip
          label="Layout"
          icon={<Icon name="web-grid-alt" />}
        />
      ),
    }
  },
  args: {
    gap: 16,
    tag: 'div',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'auto',
  },
  argTypes: {
    gap: {
      control: 'range',
      type: 'number',
      description: 'Espaçamento dos elementos',
      table: {
        defaultValue: { summary: '16px' },
      },
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
    flexWrap: {
      control: 'text',
      type: 'string',
      description: 'flex-wrap',
      table: {
        type: { summary: 'CSSProperties[\'flexWrap\']' },
        defaultValue: { summary: 'nowrap' },
      },
    },
    alignItems: {
      control: 'select',
      options: ['anchor-center', 'baseline', 'normal', 'stretch', ...selfPosition],
      description: 'align-items',
      table: {
        type: { summary: 'CSSProperties[\'alignItems\']' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    flexDirection: {
      control: 'select',
      options: ['column', 'column-reverse', 'row', 'row-reverse', ...globals],
      description: 'flex-direction',
      table: {
        type: { summary: 'CSSProperties[\'flexDirection\']' },
        defaultValue: { summary: 'column' },
      },
    },
    justifyContent: {
      control: 'select',
      options: [
        'space-around',
        'space-between',
        'space-evenly',
        'stretch',
        'center',
        'end',
        'flex-end',
        'flex-start', 'start',
        'left',
        'normal',
        'right',
        ...globals
      ],
      description: 'justify-content',
      table: {
        type: { summary: 'CSSProperties[\'justifyContent\']' },
        defaultValue: { summary: 'flex-start' },
      },
    },
    alignSelf: {
      control: 'text',
      type: 'string',
      description: 'Tag html',
      table: {
        type: { summary: 'CSSProperties[\'alignSelf\']' },
      },
    }
  }
};

export default meta;