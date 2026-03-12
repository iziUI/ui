import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { generateSupportColors } from '@iziui/core/utils/generateSupportColors';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import Button from '@/actions/Button';
import Typography from '@/display/Typography';

import Fade, { type FadeProps } from './Fade';

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
        Fade
      </Typography>
    </div>
  );
}

export const List: StoryObj<typeof Fade> = {
  render: () => {
    const list = Array.from({ length: 5 }, (_, index) => index);
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
      <Stack alignItems="center">
        <div style={{ minHeight: 100 }}>
          <Fade enter={show}>
            <Box />
          </Fade>
        </div>
        <Button onClick={() => setShow(prev => !prev)}>Toggle visibility</Button>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Fade> = {
  tags: ['!dev']
};

const { opacity, dark } = generateSupportColors('#8d00da');

const meta: Meta<typeof Fade> = {
  title: 'animations/Fade',
  component: (args: FadeProps) => {
    const [animate, setAnimate] = useState(args.enter);

    const handleClick = () => { setAnimate(prev => !prev); };

    return (
      <Stack alignItems="center">
        <div style={{ minHeight: 100 }}>
          <Fade enter={animate} delay={200}>
            <Box />
          </Fade>
        </div>

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
