import type { HtmlHTMLAttributes } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import Button from '@/actions/Button';
import Box from '@/layout/Box';
import ButtonIcon from '@/actions/ButtonIcon';

import Chip from '../Chip';
import Icon from '../Icon';
import Tooltip, { type TooltipProps } from './Tooltip';
import Typography from '../Typography';

function ContainerBox({ ...props }: HtmlHTMLAttributes<HTMLDataElement>) {
  return (
    <Box
      style={props.style}
      sx={{
        background: ({ primary }) => primary.main,
        borderRadius: 2
      }}
    />
  );
}

export const horizontal: StoryObj<typeof Tooltip> = {
  render: () => {
    return (
      <Stack flexDirection="row" gap={32}>
        <Stack flexDirection="row" alignItems="center">
          <Tooltip label="Top" direction="right">
            <ContainerBox style={{ height: 12, width: 50 }} />
          </Tooltip>
          <Tooltip label="Right" direction="right">
            <ContainerBox style={{ height: 25, width: 50 }} />
          </Tooltip>
          <Tooltip label="Bottom" direction="right">
            <ContainerBox style={{ height: 50, width: 50 }} />
          </Tooltip>
          <Tooltip label="Left" direction="right">
            <ContainerBox style={{ height: 150, width: 50 }} />
          </Tooltip>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <Tooltip label="Top" direction="left">
            <ContainerBox style={{ height: 12, width: 50 }} />
          </Tooltip>
          <Tooltip label="Right" direction="left">
            <ContainerBox style={{ height: 25, width: 50 }} />
          </Tooltip>
          <Tooltip label="Bottom" direction="left">
            <ContainerBox style={{ height: 50, width: 50 }} />
          </Tooltip>
          <Tooltip label="Left" direction="left">
            <ContainerBox style={{ height: 150, width: 50 }} />
          </Tooltip>
        </Stack>
      </Stack>
    );
  }
};

export const vertical: StoryObj<typeof Tooltip> = {
  render: () => {
    return (
      <>
        <Stack flexDirection="row" alignItems="center">
          <Tooltip label="Top" direction="bottom">
            <ContainerBox style={{ height: 50, width: 12 }} />
          </Tooltip>
          <Tooltip label="Right" direction="bottom">
            <ContainerBox style={{ height: 50, width: 25 }} />
          </Tooltip>
          <Tooltip label="Bottom" direction="bottom">
            <ContainerBox style={{ height: 50, width: 50 }} />
          </Tooltip>
          <Tooltip label="Left" direction="bottom">
            <ContainerBox style={{ height: 50, width: 150 }} />
          </Tooltip>
        </Stack>
        <Stack flexDirection="row" style={{ height: 350 }} alignItems="center">
          <Tooltip label="Top" direction="top">
            <ContainerBox style={{ height: 50, width: 12 }} />
          </Tooltip>
          <Tooltip label="Right" direction="top">
            <ContainerBox style={{ height: 50, width: 25 }} />
          </Tooltip>
          <Tooltip label="Bottom" direction="top">
            <ContainerBox style={{ height: 50, width: 50 }} />
          </Tooltip>
          <Tooltip label="Left" direction="top">
            <ContainerBox style={{ height: 50, width: 150 }} />
          </Tooltip>
        </Stack>
      </>
    );
  }
};

export const template: StoryObj<typeof Tooltip> = {
  render: () => {
    return (
      <Tooltip label={
        <Stack alignItems="center">
          <Typography variant="body2" color="primary.contrast">
            To see a magic trick:
          </Typography>
          <ButtonIcon onClick={() => alert('shazam!')}>
            <Icon name="bolt" />
          </ButtonIcon>
        </Stack>
      } direction="top">
        <Button size="large">
          Hover me
        </Button>
      </Tooltip>
    );
  }
};

export const Playground: StoryObj<typeof Tooltip> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Tooltip> = {
  title: 'display/Tooltip',
  component: (args: TooltipProps) => {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: 200 }}
      >
        <Tooltip {...args}>
          <Button>Hover me</Button>
        </Tooltip>
      </Stack>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'TODO: Tooltip description',
      tag: (
        <Chip
          color="primary"
          label="Display"
          icon={<Icon name="monitor" />}
        />
      ),
    },
  },
  args: {
    direction: 'top',
    label: 'Tooltip text',
  },
  argTypes: {
    content: {
      control: 'text',
      type: 'string',
      description: 'Texto exibido no tooltip.',
    },
  },
};

export default meta;
