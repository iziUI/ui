import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { generateSupportColors } from '@iziui/core/utils/generateSupportColors';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import Button from '@/actions/Button';
import Typography from '@/display/Typography';

import Bounce, { type BounceProps } from './Bounce';

function Box() {
  return (
    <div
      style={{
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
        Bounce
      </Typography>
    </div>
  );
}

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

export const Playground: StoryObj<typeof Bounce> = {
  tags: ['!dev'],
};

const { opacity, dark } = generateSupportColors('#8d00da');

const meta: Meta<typeof Bounce> = {
  title: 'animations/Bounce',
  component: (args: BounceProps) => {
    const [animate, setAnimate] = useState(args.enter);

    useEffect(() => {
      if (animate) { return; }

      setAnimate(true);
    }, [animate]);

    const handleClick = () => { setAnimate(false); };

    return (
      <Stack alignItems="center">
        <Bounce enter={animate} direction="right" delay={200}>
          <Box />
        </Bounce>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleClick}
          startIcon={<Icon name="play" />}
        >
          Animate
        </Button>
      </Stack >
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: `
        Fornece animações leves baseadas em transformação (CSS transform), permitindo aplicar efeitos 
        de deslocamento e retorno em elementos da interface. Ele pode ser usado para indicar interações,
        feedback visual ou transições sutis em componentes.
      `,
      tag: (
        <Chip
          label="Animation"
          icon={<Icon name="brush-alt" />}
          variant="outlined"
          style={{
            color: dark,
            background: opacity,
            borderColor: 'transparent'
          }}
        />
      ),
    },
  },
  args: {
    enter: true,
  }
};

export default meta;
