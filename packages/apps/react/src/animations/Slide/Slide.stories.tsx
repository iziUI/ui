import { Meta, StoryObj } from '@storybook/react';

import Stack from '@/components/Stack';
import Typography from '@/components/Typography';

import Slide from './Slide';

const meta: Meta<typeof Slide> = {
  title: 'animations/Slide',
  component: Slide,
};

function Box() {
  return (
    <div style={{
      width: '100px',
      height: '100px',
      borderRadius: '10px',
      backgroundColor: '#e80537',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Typography>Content here</Typography>
    </div>
  );
}

export const Default: StoryObj<typeof Slide> = {
  render: () => {
    return (
      <Slide enter>
        <div>
          <Box />
        </div>
      </Slide>
    );
  }
};

export const List: StoryObj<typeof Slide> = {
  render: () => {
    const list = Array.from({ length: 10 }, (_, index) => index);
    return (
      <Stack flexDirection="row">
        {
          list.map((item, index) => (
            <div key={item}>
              <Slide enter delay={(index + 1) * 200}>
                <Box />
              </Slide>
            </div>
          ))
        }
      </Stack>
    );
  }
};

export const Directions: StoryObj<typeof Slide> = {
  render: () => {
    return (
      <Stack flexDirection="row">
        <div>
          <Slide enter direction="left">
            <Box />
          </Slide>
        </div>
        <div>
          <Slide enter direction="right" delay={200}>
            <Box />
          </Slide>
        </div>
        <div>
          <Slide enter direction="top" delay={400}>
            <Box />
          </Slide>
        </div>
        <div>
          <Slide enter direction="bottom" delay={600}>
            <Box />
          </Slide>
        </div>
      </Stack>
    );
  }
};

export default meta;
