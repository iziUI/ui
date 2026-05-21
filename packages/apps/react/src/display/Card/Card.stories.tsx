import type { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import CardContent from './CardContent';
import Chip from '../Chip';
import Icon from '../Icon';
import Typography from '../Typography';

const style: CSSProperties = { minWidth: 300 };

export const WithOutContent: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card style={style}>
        <Typography>Some content here</Typography>
      </Card>
    );
  }
};

export const WithContent: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card style={style}>
        <CardContent>
          <Typography>Some content here</Typography>
        </CardContent>
      </Card>
    );
  }
};

export const Clickable: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card style={style} onClick={() => alert('hello!')}>
        <CardContent>
          <Typography>Click me!</Typography>
        </CardContent>
      </Card>
    );
  }
};

export const Playground: StoryObj<typeof Card> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Card> = {
  title: 'display/Card',
  component: () => (
    <Card style={style}>
      <CardContent>
        <Typography>Some text here</Typography>
      </CardContent>
    </Card>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Cards contain content and actions about a single subject.',
      tag: (
        <Chip
          label="Display"
          icon={<Icon name="monitor" />}
          color="primary"
        />
      )
    },
  },
  args: {
    onClick: () => { }
  },
  argTypes: {
    onClick: {
      control: false,
      type: 'function',
      description: 'Transforma o card em um elemento clicavel e adiciona uma função de callback',
    }
  }
};

export default meta;