import type { PropsWithChildren } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { getContrastColor } from '@iziui/core/utils';

import Stack from './layout/Stack';
import Typography from './display/Typography';
import Tooltip from './display/Tooltip';
import useTheme from './theme/useTheme';
import Divider from './display/Divider';

export const Playground: StoryObj = {
  tags: ['!dev'],
};

function Section({ title, children }: PropsWithChildren<{
  title: string;
}>) {
  return (
    <Stack tag="section" gap={8}>
      <Typography variant="h3">{title}</Typography>
      <Divider />
      {children}
    </Stack>
  );
}

function Text() {
  const variants = ['primary', 'secondary', 'disabled'];

  const { theme: { palette } } = useTheme();

  return (
    <Stack flexDirection="row">
      {
        variants.map(variant => (
          <Tooltip
            fullWidth
            key={variant}
            direction="top"
            label={palette.text[variant]}
          >
            <Stack
              fullWidth
              key={variant}
              alignItems="center"
              justifyContent="center"
              sx={{
                boxShadow: 'sm',
                borderRadius: 4,
                background: (palette) => palette.text[variant],
              }}
              style={{ height: 50 }}
            >
              <Typography
                variant="body2"
                style={{ textTransform: 'capitalize' }}
                sx={{ color: (palette) => getContrastColor(palette.text[variant]) }}
              >
                {variant}
              </Typography>
            </Stack>
          </Tooltip>
        ))
      }
    </Stack>
  );
}

function Background() {
  const variants = ['default', 'paper'];

  const { theme: { palette } } = useTheme();

  return (
    <Stack flexDirection="row">
      {
        variants.map(variant => (
          <Tooltip
            fullWidth
            key={variant}
            direction="top"
            label={palette.background[variant]}
          >
            <Stack
              fullWidth
              alignItems="center"
              justifyContent="center"
              sx={{
                boxShadow: 'sm',
                borderRadius: 4,
                background: (palette) => palette.background[variant],
              }}
              style={{ height: 50 }}
            >
              <Typography
                variant="body2"
                style={{ textTransform: 'capitalize' }}
                sx={{ color: (palette) => palette.text.primary }}
              >
                {variant}
              </Typography>
            </Stack>
          </Tooltip>
        ))
      }
    </Stack>
  );
}

function DividerColor() {
  const { theme: { palette } } = useTheme();

  return (
    <Tooltip
      fullWidth
      direction="top"
      label={palette.divider}
    >
      <Stack
        fullWidth
        alignItems="center"
        justifyContent="center"
        sx={{
          boxShadow: 'sm',
          borderRadius: 4,
          background: (palette) => palette.divider,
        }}
        style={{ height: 50 }}
      >
        <Typography
          variant="body2"
          style={{ textTransform: 'capitalize' }}
          sx={{ color: (palette) => palette.text.primary }}
        >
          Divider
        </Typography>
      </Stack>
    </Tooltip>
  );
}

function Colors() {
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info'];

  const { theme: { palette } } = useTheme();

  return (
    colors.map(color => (
      <Stack key={color}>
        <Typography style={{ textTransform: 'capitalize' }}>{color}</Typography>
        <Stack flexDirection="row">
          {
            ['dark', 'main', 'light', 'opacity'].map(variant => (
              <Tooltip
                fullWidth
                key={variant}
                direction="top"
                label={palette[color][variant]}
              >
                <Stack
                  fullWidth
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    boxShadow: 'sm',
                    borderRadius: 4,
                    background: (palette) => palette[color][variant],
                  }}
                  style={{ height: 50 }}
                >
                  <Typography
                    variant="body2"
                    style={{ textTransform: 'capitalize' }}
                    sx={{ color: (palette) => palette[color]['contrast'] }}
                  >
                    {variant}
                  </Typography>
                </Stack>
              </Tooltip>
            ))
          }
        </Stack>
      </Stack>
    ))
  );
}

const meta: Meta = {
  title: 'Theme',
  component: () => {
    return (
      <Stack gap={32}>
        <Section title="Colors">
          <Colors />
        </Section>
        <Section title="Text">
          <Text />
        </Section>
        <Section title="Background">
          <Background />
        </Section>
        <Section title="Divider">
          <DividerColor />
        </Section>
      </Stack>
    );
  },
  parameters: {
    docs: {
      ref: Playground,
      noProps: true,
      noImport: true,
    }
  }
};

export default meta;