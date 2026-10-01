import { Meta, StoryObj } from '@storybook/react';

import Alert from '@/feedback/Alert';
import Box from '@/layout/Box';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Typography from '@/display/Typography';

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

function GridGuidance() {
  return (
    <Alert color="info" icon={<Icon name="info-circle" />}>
      <Typography variant="body2" weight="bold" style={{ margin: 0 }}>Grid usa 12 colunas.</Typography>
      <Typography variant="body2" style={{ margin: 0 }}>
        `xs`, `sm`, `md`, `lg` e `xl` definem quantas colunas cada GridItem ocupa.
      </Typography>
      <Typography variant="body2" style={{ margin: 0 }}>
        Props de Grid definem valores padrão dos filhos. Props de GridItem sobrescrevem somente seu filho.
      </Typography>
      <Typography variant="body2" style={{ margin: 0 }}>
        Spans ausentes usam fallback de `xl` até `xs`; `xl` usa 1 por padrão. Defina todos os spans quando
        layout não deve usar fallback.
      </Typography>
      <Typography variant="body2" style={{ margin: 0 }}>
        Breakpoints: xs até 599px, sm 600-899px, md 900-1199px, lg 1200-1535px, xl a partir de 1536px.
      </Typography>
    </Alert>
  );
}

export const SameGrid: StoryObj<typeof Grid> = {
  render: () => {
    return (
      <Grid xl={3} lg={4} md={6} sm={12} xs={12}>
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
      <Grid xl={3} lg={4} md={6} sm={12} xs={12}>
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
      description:
        'Layout responsivo de 12 colunas. Use Grid para spans compartilhados e GridItem para sobrescritas individuais.',
      import: 'import { GridItem } from \'@iziui/react\';\nimport Grid from \'@iziui/react/Grid\';',
      alert: <GridGuidance />,
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
    xs: 12,
    gap: 15,
  },
  argTypes: {
    xl: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Span padrão de cada filho a partir de 1536px (1-12).',
    },
    lg: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Span padrão de cada filho entre 1200px e 1535px (1-12).',
    },
    md: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Span padrão de cada filho entre 900px e 1199px (1-12).',
    },
    sm: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Span padrão de cada filho entre 600px e 899px (1-12).',
    },
    xs: {
      control: { type: 'range', min: 1, max: 12, },
      description: 'Span padrão de cada filho até 599px (1-12).',
    },
    gap: {
      control: { type: 'number', min: 0 },
      description: 'Espaço em pixels entre linhas e colunas. Padrão: 15.',
      table: {
        defaultValue: { summary: '15' },
      },
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
