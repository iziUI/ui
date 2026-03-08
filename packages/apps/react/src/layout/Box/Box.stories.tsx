import type { Meta, StoryObj } from '@storybook/react';

import Box from './Box';

const meta: Meta<typeof Box> = {
  title: 'layout/Box',
  component: Box,
  parameters: {
    docs: {
      // eslint-disable-next-line
      description: 'O componente Box é um contêiner genérico, compatível com temas, com acesso a utilitários CSS do sistema MUI.'
    }
  }
};

export const Default: StoryObj<typeof Box> = {
  render: () => {
    return (
      <Box>

      </Box>
    );
  }
};

export default meta;