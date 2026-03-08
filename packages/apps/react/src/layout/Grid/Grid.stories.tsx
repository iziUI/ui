import { Meta, StoryObj } from '@storybook/react';

import Box from '@/layout/Box';

import { Grid } from './Grid';
import { GridItem } from './GridItem';

const meta: Meta<typeof Grid> = {
  title: 'layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      // eslint-disable-next-line
      description: 'A grid de layout responsivo se adapta ao tamanho e à orientação da tela, garantindo consistência em todos os layouts.',
      import: 'import { Grid, GridItem } from \'@iziui/react/Grid\';'
    }
  }
};

function Item() {
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      background: ({ grey }) => grey.dark,
    }}>
      <span>col</span>
    </Box>
  );
}

export const SameGrid: StoryObj<typeof Grid> = {
  render: () => {
    return (
      <Grid xl={3} lg={4} md={6} sm={12}  >
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

export default meta;
