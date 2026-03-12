import type { CSSProperties } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Card from './Card';
import CardContent from './CardContent';

const style: CSSProperties = { minWidth: 300 };

export const WithOutContent: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card style={style}>
        <span>Some content here</span>
      </Card>
    );
  }
};

export const WithContent: StoryObj<typeof Card> = {
  render: () => {
    return (
      <Card style={style}>
        <CardContent>
          <span>Some content here</span>
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
          <span>Click me!</span>
        </CardContent>
      </Card>
    );
  }
};

export const Playground: StoryObj<typeof Card> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Card> = {
  title: 'components/Card',
  component: () => (
    <Card style={style}>
      <CardContent>
        Some text here
      </CardContent>
    </Card>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Cards contain content and actions about a single subject.',
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