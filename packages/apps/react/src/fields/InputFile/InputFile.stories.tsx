import { Meta, StoryObj } from '@storybook/react';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';

import InputFile from './InputFile';

export const Default: StoryObj<typeof InputFile> = {
  render: () => {
    return (
      <InputFile />
    );
  }
};

export const Playground: StoryObj<typeof InputFile> = {
  tags: ['!dev'],
};

const meta: Meta<typeof InputFile> = {
  title: 'fields/InputFile',
  component: InputFile,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'TODO: InputFile description',
      tag: (
        <Chip
          label="Layout"
          color="info"
          icon={<Icon name="keyboard" />}
        />
      ),
    }
  },
};

export default meta;
