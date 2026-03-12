import type { Meta, StoryObj } from '@storybook/react';

import Box from '@/layout/Box';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Ripple from './Ripple';

export const Playground: StoryObj<typeof Ripple> = {
  tags: ['!dev'],
  render: () => {
    return (
      <Box
        sx={{
          background: ({ primary }) => primary.main,
          borderRadius: 2
        }}
        style={{
          width: 100,
          height: 100,
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <Ripple />
      </Box>
    );
  }
};

const meta: Meta<typeof Ripple> = {
  title: 'actions/Ripple',
  component: Ripple,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      tag: (
        <Chip
          label="Actions"
          icon={<Icon name="crosshair-alt" />}
          color="error"
        />
      ),
    }
  }
};

export default meta;