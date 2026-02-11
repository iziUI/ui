import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent } from '@/components/Card';

import Stack from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'components/Stack',
  component: Stack,
};

function Item() {
  return (
    <Card fullWidth>
      <CardContent>
        Item
      </CardContent>
    </Card>
  );
}

export const OrientationRow: StoryObj<typeof Stack> = {
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

export const OrientationColumn: StoryObj<typeof Stack> = {
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

export default meta;