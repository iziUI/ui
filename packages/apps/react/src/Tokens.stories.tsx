import type { CSSProperties, PropsWithChildren } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  animation,
  boxShadowLarge,
  boxShadowRegular,
  boxShadowSmall,
  columns,
  colors,
  font_sizes,
  gap,
  icon_sizes,
  lg,
  md,
  prefix,
  proportionBase,
  proportionSmall,
  radius,
  rows,
  sizes,
  sm,
  spacing,
  xl,
  xs,
} from '@iziui/tokens/web/js';

import { getContrastColor } from '@iziui/core/utils';
import type { Colors } from '@iziui/core/theme';
import type { CustomOptions } from '@iziui/core/options';

import { capitalize } from '@iziui/toolkit/string';

import Box from './layout/Box';
import Stack from './layout/Stack';
import useTheme from './theme/useTheme';
import Typography from './display/Typography';
import { Grid, GridItem } from './layout/Grid';
import { Card, CardContent } from './display/Card';

const shadows = [
  ['boxShadowSmall', boxShadowSmall, 'sm'],
  ['boxShadowRegular', boxShadowRegular, 'md'],
  ['boxShadowLarge', boxShadowLarge, 'lg'],
] as const;

const breakpoints = [
  ['xl', xl],
  ['lg', lg],
  ['md', md],
  ['sm', sm],
  ['xs', xs],
] as const;

const colorVariations = ['dark', 'main', 'light', 'opacity'] as const;
const textColors = ['primary', 'secondary', 'disabled'] as const;
const backgroundColors = ['default', 'paper', 'muted'] as const;

const panelStyle: CSSProperties = {
  borderStyle: 'solid',
  borderWidth: 1,
};

function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <Stack tag="section" gap={12}>
      <Typography variant="h3">{title}</Typography>
      {children}
    </Stack>
  );
}

function Panel({ children, sx, style }: PropsWithChildren<{ sx?: CustomOptions; style?: CSSProperties }>) {
  return (
    <Card
      sx={{
        borderColor: ({ divider }) => divider,
        borderRadius: 1,
        p: 2,
        ...sx,
      }}
      style={{ ...panelStyle, ...style }}
    >
      <CardContent>
        <Stack gap={12}>{children}</Stack>
      </CardContent>
    </Card>
  );
}

type ColorCardProps = {
  name: string;
  value: string;
  contrast: string;
};

function ColorCard({ name, value, contrast }: ColorCardProps) {
  return (
    <Card
      sx={{
        background: () => value,
        color: () => contrast,
      }}
    >
      <CardContent>
        <Stack>
          <Typography
            weight="bold"
            variant="body2"
            style={{ color: contrast }}
          >
            {name}
          </Typography>
          <code>{value}</code>
        </Stack>
      </CardContent>
    </Card>
  );
}

function SemanticColors() {
  const { theme: { palette } } = useTheme();

  return (
    <Stack gap={12}>
      <Typography variant="h4">Semantic colors</Typography>
      <Grid xl={6} lg={6} md={12} sm={12} xs={12} gap={16}>
        {colors.map((color) => {
          const swatch = palette[color as Colors];

          return (
            <GridItem key={color}>
              <Typography variant="h5" sx={{ mb: 1 }}>{capitalize(color)}</Typography>
              <Grid xl={3} lg={3} md={3} sm={6} xs={12} gap={12}>
                {
                  colorVariations.map((variation) => (
                    <GridItem key={variation}>
                      <ColorCard
                        contrast={getContrastColor(swatch.main)}
                        name={`${color}.${variation}`}
                        value={swatch[variation]}
                      />
                    </GridItem>
                  ))
                }
              </Grid>
            </GridItem>
          );
        })}
      </Grid>
    </Stack>
  );
}

function ThemeColors() {
  const { theme: { palette } } = useTheme();

  return (
    <Stack gap={24}>
      <Stack gap={12}>
        <Typography variant="h4">Text colors</Typography>
        <Grid xl={4} lg={4} md={4} sm={6} xs={12} gap={12}>
          {
            textColors.map((color) => (
              <GridItem key={color}>
                <ColorCard
                  contrast={getContrastColor(palette.text[color])}
                  name={`text.${color}`}
                  value={palette.text[color]}
                />
              </GridItem>
            ))
          }
        </Grid>
      </Stack>
      <Stack gap={12}>
        <Typography variant="h4">Background colors</Typography>
        <Grid xl={4} lg={4} md={4} sm={6} xs={12} gap={12}>
          {
            backgroundColors.map((variation) => (
              <GridItem key={variation}>
                <ColorCard
                  contrast={getContrastColor(palette.background[variation])}
                  name={`background.${variation}`}
                  value={palette.background[variation]}
                />
              </GridItem>
            ))
          }
        </Grid>
      </Stack>
      <Stack gap={12}>
        <Typography variant="h4">Divider color</Typography>
        <Grid xl={4} lg={4} md={4} sm={6} xs={12} gap={12}>
          <GridItem>
            <ColorCard
              name="divider"
              value={palette.divider}
              contrast={getContrastColor(palette.divider)}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
}

function ShapeAndSpacing() {
  return (
    <Grid xl={6} lg={6} md={6} sm={12} xs={12} gap={16}>
      <GridItem>
        <Panel>
          <code>radius: {radius}</code>
          <Box
            aria-label="Radius preview"
            sx={{
              background: ({ primary }) => primary.main,
              borderRadius: 1,
            }}
            style={{ height: 88 }}
          />
        </Panel>
      </GridItem>
      <GridItem>
        <Panel>
          <code>spacing: {spacing}</code>
          <Stack alignItems="center" flexDirection="row" gap={Number.parseInt(spacing, 10)}>
            {[0, 1, 2].map((item) => (
              <Box
                aria-label={`Spacing preview ${item + 1}`}
                key={item}
                sx={{
                  background: ({ secondary }) => secondary.main,
                  borderRadius: 0.5,
                }}
                style={{ height: 32, width: 32 }}
              />
            ))}
          </Stack>
        </Panel>
      </GridItem>
    </Grid>
  );
}

function GridAndMotion() {
  return (
    <Grid xl={6} lg={6} md={6} sm={12} xs={12} gap={16}>
      <GridItem>
        <Panel>
          <code>gap: {gap}</code>
          <code>columns: {columns}</code>
          <code>rows: {rows}</code>
          <Grid xl={1} lg={1} md={1} sm={1} xs={1} gap={Number(gap)} aria-label="Grid preview">
            {Array.from({ length: Number(columns) }, (_, index) => (
              <GridItem key={index}>
                <Box sx={{ background: ({ secondary }) => secondary.main }} style={{ height: 24 }} />
              </GridItem>
            ))}
          </Grid>
        </Panel>
      </GridItem>
      <GridItem>
        <Panel>
          <Typography variant="body2" weight="bold">animation</Typography>
          <code>{animation}</code>
          <code>proportionBase: {proportionBase}</code>
          <code>proportionSmall: {proportionSmall}</code>
          <code>prefix: {prefix}</code>
          <code>sizes: {sizes.join(', ')}</code>
        </Panel>
      </GridItem>
    </Grid>
  );
}

function Elevation() {
  return (
    <Grid xl={4} lg={4} md={4} sm={12} xs={12} gap={24}>
      {shadows.map(([name, value, size]) => (
        <GridItem key={name}>
          <Panel sx={{ boxShadow: size }} style={{ minHeight: 120 }}>
            <Typography variant="body2" weight="bold">{name}</Typography>
            <code style={{ fontSize: 12 }}>{value}</code>
          </Panel>
        </GridItem>
      ))}
    </Grid>
  );
}

function TypographyAndIcons() {
  return (
    <Grid xl={6} lg={6} md={6} sm={12} xs={12} gap={16}>
      <GridItem>
        <Panel>
          {Object.entries(font_sizes).map(([name, value]) => (
            <Stack alignItems="baseline" flexDirection="row" gap={12} key={name}>
              <code>{name}: {value}</code>
              <Typography style={{ fontSize: value }} variant="body1">Ag</Typography>
            </Stack>
          ))}
        </Panel>
      </GridItem>
      <GridItem>
        <Panel>
          <Stack flexDirection="row" gap={16}>
            {Object.entries(icon_sizes).map(([name, value]) => (
              <Stack alignItems="center" gap={8} key={name}>
                <Box
                  aria-label={`${name} icon size`}
                  sx={{ background: ({ info }) => info.main }}
                  style={{ borderRadius: '50%', height: value, width: value }}
                />
                <code>{name}: {value}</code>
              </Stack>
            ))}
          </Stack>
        </Panel>
      </GridItem>
    </Grid>
  );
}

function Breakpoints() {
  return (
    <Stack gap={8}>
      {breakpoints.map(([name, value]) => (
        <Stack alignItems="center" flexDirection="row" gap={12} key={name}>
          <code style={{ minWidth: 80 }}>{name}: {value}px</code>
          <Box
            aria-label={`${name} breakpoint`}
            sx={{ background: ({ primary }) => primary.main }}
            style={{
              borderRadius: 999,
              height: 10,
              width: `${(Number(value) / Number(xl)) * 100}%`,
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
}

export function TokensPage() {
  return (
    <Stack gap={40}>
      <Section title="Colors">
        <SemanticColors />
        <ThemeColors />
      </Section>
      <Section title="Shape and spacing">
        <ShapeAndSpacing />
      </Section>
      <Section title="Grid and motion">
        <GridAndMotion />
      </Section>
      <Section title="Elevation">
        <Elevation />
      </Section>
      <Section title="Typography and icons">
        <TypographyAndIcons />
      </Section>
      <Section title="Breakpoints">
        <Breakpoints />
      </Section>
    </Stack>
  );
}

export const Overview: StoryObj = {
  tags: ['!dev'],
};

const meta: Meta = {
  title: 'Tokens',
  component: TokensPage,
  parameters: {
    docs: {
      description: 'Public static tokens and active runtime theme colors.',
      noImport: true,
      noProps: true,
      ref: Overview,
    },
  },
};

export default meta;
