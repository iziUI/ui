import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import Button from '@/components/Button';
import Typography from '@/display/Typography';

import Fade from './Fade';

const meta: Meta<typeof Fade> = {
  title: 'animations/Fade',
  component: Fade,
};

function Box() {
  return (
    <div style={{
      width: '100px',
      height: '100px',
      borderRadius: '10px',
      backgroundColor: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Typography textAlign="center" color="primary.contrast">
        Content here
      </Typography>
    </div>
  );
}

export const Default: StoryObj<typeof Fade> = {
  render: () => {
    return (
      <Fade enter>
        <div>
          <Box />
        </div>
      </Fade>
    );
  }
};

export const List: StoryObj<typeof Fade> = {
  render: () => {
    const list = Array.from({ length: 10 }, (_, index) => index);
    return (
      <Stack flexDirection="row">
        {list.map((item, index) => (
          <div key={item}>
            <Fade enter delay={(index + 1) * 200}>
              <Box />
            </Fade>
          </div>
        ))}
      </Stack>
    );
  }
};

export const Controlled: StoryObj<typeof Fade> = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <Stack>
        <Button onClick={() => setShow(prev => !prev)}>Toggle visibility</Button>
        <Fade enter={show}>
          <div>
            <Box />
          </div>
        </Fade>
      </Stack>
    );
  }
};

export default meta;
