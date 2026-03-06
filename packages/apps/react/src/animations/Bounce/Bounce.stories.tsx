import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

import Bounce from './Bounce';

const meta: Meta<typeof Bounce> = {
  title: 'animations/Bounce',
  component: Bounce,
  tags: ['autodocs'],
};

function Box() {
  return (
    <div
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        backgroundColor: '#e80537',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography>
        Content here
      </Typography>
    </div>
  );
}

export const Default: StoryObj<typeof Bounce> = {
  render: () => {
    return (
      <Bounce enter>
        <Box />
      </Bounce>
    );
  },
};

export const List: StoryObj<typeof Bounce> = {
  render: () => {
    const list = Array.from({ length: 10 }, (_, index) => index);
    return (
      <Stack flexDirection="row">
        {list.map((item, index) => (
          <div key={item}>
            <Bounce enter delay={(index + 1) * 200}>
              <Box />
            </Bounce>
          </div>
        ))}
      </Stack>
    );
  },
};

export const WithDifferentTimings: StoryObj<typeof Bounce> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <div>
          <Bounce enter timeout={0.1}>
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter timeout={0.3} delay={200}>
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter timeout={0.5} delay={400}>
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter timeout={0.8} delay={600}>
            <Box />
          </Bounce>
        </div>
      </Stack>
    );
  },
};

export const Directions: StoryObj<typeof Bounce> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <div>
          <Bounce enter direction="left">
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter direction="right" delay={200}>
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter direction="top" delay={400}>
            <Box />
          </Bounce>
        </div>
        <div>
          <Bounce enter direction="bottom" delay={600}>
            <Box />
          </Bounce>
        </div>
      </Stack>
    );
  },
};

export default meta;
