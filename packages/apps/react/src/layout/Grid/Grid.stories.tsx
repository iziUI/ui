import { Meta, StoryObj } from '@storybook/react';

import Box from '@/layout/Box';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import { Grid } from './Grid';
import { GridItem } from './GridItem';

function Item() {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      background: ({ background }) => background.default,
    }}>
      <span>col</span>
    </Box>
  );
}

export const SameGrid: StoryObj<typeof Grid> = {
  render: () => {
    return (
      <Grid xl={3} lg={4} md={6} sm={12}>
        <GridItem>
          <Item />
        </GridItem>
        <GridItem>
          <Item />
        </GridItem>
        <GridItem>
          <Item />
        </GridItem>
        <GridItem>
          <Item />
        </GridItem>
      </Grid>
    );
  }
};

export const ChildrenWithDifferentGrid: StoryObj<typeof Grid> = {
  render: () => {
    return (
      <Grid xl={3} lg={4} md={6} sm={12}>
        <GridItem xl={12}>
          <Item />
        </GridItem>
        <GridItem lg={5}>
          <Item />
        </GridItem>
        <GridItem lg={3} md={4}>
          <Item />
        </GridItem>
        <GridItem lg={8} md={8} sm={6}>
          <Item />
        </GridItem>
        <GridItem md={12} sm={6}>
          <Item />
        </GridItem>
      </Grid>
    );
  }
};

export const Playground: StoryObj<typeof Box> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Grid> = {
  title: 'layout/Grid',
  component: (args) => (
    <Grid {...args}>
      <GridItem>
        <Item />
      </GridItem>
      <GridItem>
        <Item />
      </GridItem>
      <GridItem>
        <Item />
      </GridItem>
      <GridItem>
        <Item />
      </GridItem>
      <GridItem>
        <Item />
      </GridItem>
    </Grid>
  ),
  parameters: {
    docs: {
      ref: Playground,
      // eslint-disable-next-line
      description: 'A grid de layout responsivo se adapta ao tamanho e à orientação da tela, garantindo consistência em todos os layouts.',
      import: 'import { Grid, GridItem } from \'@iziui/react/Grid\';',
      tag: (
        <Chip
          label="Layout"
          icon={<Icon name="web-grid-alt" />}
        />
      ),
    }
  },
  args: {
    xl: 3,
    lg: 4,
    md: 6,
    sm: 8,
    xs: 12
  },
  argTypes: {
    xl: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Alinhamento de layout para o breakpoint xl',
    },
    lg: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Alinhamento de layout para o breakpoint lg',
    },
    md: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Alinhamento de layout para o breakpoint md',
    },
    sm: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Alinhamento de layout para o breakpoint sm',
    },
    xs: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Alinhamento de layout para o breakpoint xs',
    },
    children: {
      control: false,
      description: 'Conteúdo do componente',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
  }
};

export default meta;
