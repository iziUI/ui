import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import Button from '@/actions/Button';
import Typography from '@/display/Typography';
import Box from '@/layout/Box';

import useMenu from './useMenu';
import Menu, { type MenuProps } from './Menu';
import MenuButton from './MenuButton';

export const Left: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle</Button>
        <Menu
          direction="left"
          width="fit-content"
          open={open}
          anchorEl={el}
          onClose={toggle}
        >
          <MenuButton label="Option 1" />
          <MenuButton label="Option 2" />
          <MenuButton label="Option 3" />
        </Menu>
      </Stack>
    );
  }
};

export const Right: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle</Button>
        <Menu direction="right" anchorEl={el} open={open} onClose={toggle} width="fit-content">
          <MenuButton label="Option 1" />
          <MenuButton label="Option 2" />
          <MenuButton label="Option 3" />
        </Menu>
      </Stack>
    );
  }
};

export const Center: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle</Button>
        <Menu direction="center" anchorEl={el} open={open} onClose={toggle} width="fit-content">
          <MenuButton label="Option 1" />
          <MenuButton label="Option 2" />
          <MenuButton label="Option 3" />
        </Menu>
      </Stack>
    );
  }
};

export const SameWidthTheTarget: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle Menu</Button>
        <Menu direction="center" anchorEl={el} open={open} onClose={toggle}>
          <MenuButton label="Option 1" />
          <MenuButton label="Option 2" />
          <MenuButton label="Option 3" />
        </Menu>
      </Stack>
    );
  }
};

export const WithIcon: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle Menu</Button>
        <Menu width="fit-content" direction="left" anchorEl={el} open={open} onClose={toggle}>
          <MenuButton label="My option 1" icon={<Icon name="rocket" />} />
          <MenuButton label="My option 2" icon={<Icon name="rocket" />} />
          <MenuButton label="My option 3" icon={<Icon name="rocket" />} />
        </Menu>
      </Stack>
    );
  }
};

export const AutoClose: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle Menu</Button>
        <Menu autoClose direction="center" anchorEl={el} open={open} onClose={toggle}>
          <MenuButton label="Option 1" />
          <MenuButton label="Option 2" />
          <MenuButton label="Option 3" />
        </Menu>
      </Stack>
    );
  }
};

export const CustomWidth: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle Menu</Button>
        <Menu width="fit-content" direction="left" anchorEl={el} open={open} onClose={toggle}>
          <MenuButton label="Some big text question" />
          <MenuButton label="Some big text question" />
          <MenuButton label="Some big text question" />
        </Menu>
      </Stack>
    );
  }
};

export const CustomContent: StoryObj<typeof Menu> = {
  render: () => {
    const [open, el, toggle] = useMenu();

    return (
      <Stack alignItems="center">
        <Button onClick={toggle}>Toggle Menu</Button>
        <Menu direction="center" anchorEl={el} open={open} onClose={toggle}>
          <Box sx={{ p: 2 }}>
            <Typography>Hello world</Typography>
          </Box>
        </Menu>
      </Stack>
    );
  }
};

export const Playground: StoryObj<typeof Menu> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Menu> = {
  title: 'navigation/Menu',
  component: (args: MenuProps) => {
    return (
      <div style={{ minHeight: 125 }}>
        <Menu {...args}>
          <MenuButton label="Option 1" icon={<Icon name="user" />} />
          <MenuButton label="Option 2" icon={<Icon name="user" />} />
          <MenuButton label="Option 3" icon={<Icon name="user" />} />
        </Menu>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Menu exibe opções flutuantes ancoradas em um elemento, usado para ações contextuais e dropdowns.',
      tag: (
        <Chip
          label="Navigation"
          icon={<Icon name="map" />}
          color="info"
        />
      ),
    },
  },
  args: {
    open: true,
    direction: 'left',
    autoClose: false,
  },
  argTypes: {
    open: {
      control: 'boolean',
      type: 'boolean',
      description: 'Controla se o menu está aberto ou fechado.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    direction: {
      control: 'select',
      type: 'string',
      options: ['left', 'right', 'center'],
      description: 'Direção de alinhamento do menu em relação ao elemento âncora.',
      table: {
        type: { summary: 'left | right | center' },
        defaultValue: { summary: 'left' },
      },
    },
    autoClose: {
      control: 'boolean',
      type: 'boolean',
      description: 'Se `true`, o menu fecha automaticamente ao clicar em um item.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: 'text',
      type: 'string',
      description: 'Largura do menu. Por padrão, herda a largura do elemento âncora.',
      table: {
        type: { summary: 'CSSProperties[\'width\']' },
      },
    },
    maxHeight: {
      control: 'text',
      type: 'string',
      description: 'Altura máxima do conteúdo do menu; ativa scroll quando excedida.',
      table: {
        type: { summary: 'CSSProperties[\'maxHeight\']' },
      },
    },
    anchorEl: {
      control: false,
      type: 'symbol',
      description: 'Elemento HTML usado como referência para posicionamento do menu.',
      table: {
        type: { summary: 'HTMLElement | null' },
      },
    },
    onClose: {
      control: false,
      type: 'symbol',
      description: 'Callback chamado quando o menu deve ser fechado.',
      table: {
        type: { summary: '(e?: MouseEvent) => void' },
      },
    },
    children: {
      control: false,
      type: 'symbol',
      description: 'Itens do menu, normalmente componentes MenuButton.',
      table: {
        type: { summary: 'ReactElement | ReactElement[]' },
      },
    },
  },
};

export default meta;
