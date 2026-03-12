import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { generateSupportColors } from '@iziui/core/utils/generateSupportColors';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import Button from '@/actions/Button';
import Typography from '@/display/Typography';

import Slide, { type SlideProps } from './Slide';

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
        Slide
      </Typography>
    </div>
  );
}

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

export const Playground: StoryObj<typeof Slide> = {
  tags: ['!dev']
};

const { opacity, dark } = generateSupportColors('#8d00da');

const meta: Meta<typeof Slide> = {
  title: 'animations/Slide',
  component: (args: SlideProps) => {
    const [animate, setAnimate] = useState(args.enter);

    const handleClick = () => { setAnimate(prev => !prev); };

    return (
      <Stack alignItems="center">
        <div style={{ minHeight: 100 }}>
          <Slide enter={animate} delay={200}>
            <Box />
          </Slide>
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
        Fornece animações leves baseadas em transformação (CSS transform), 
        permitindo aplicar efeitos de deslizamento em elementos da interface. Pode ser utilizado para introduzir ou 
        remover conteúdos de forma suave, indicando mudanças de estado ou transições entre seções da interfa
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
    }
  },
  args: {
    enter: true,
  }
};

export default meta;
