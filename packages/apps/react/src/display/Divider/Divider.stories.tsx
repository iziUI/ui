import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';

import Divider from './Divider';
import Chip from '../Chip';
import Icon from '../Icon';

export const Playground: StoryObj<typeof Divider> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Divider> = {
  title: 'display/Divider',
  component: () => (
    <Stack style={{ width: 500 }}>
      <Divider />
    </Stack>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Avatars are found throughout material design with uses in everything from tables to dialog menus.',
      tag: (
        <Chip
          label="Display"
          icon={<Icon name="monitor" />}
          color="primary"
        />
      )
    }
  },
};

export default meta;