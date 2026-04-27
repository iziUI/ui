import type { Meta, StoryObj } from '@storybook/react';

import Chip from '@/display/Chip';
import Icon from '@/display/Icon';
import Button from '@/actions/Button/Button';
import Stack from '@/layout/Stack';
import Typography from '@/display/Typography';

import Drawer from './Drawer';
import DrawerContent from './DrawerContent';
import useDrawer from './useDrawer';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';

function Content() {
  return (
    <Stack>
      <Stack gap={8}>
        <Typography variant="h5">
          Lorem Ipsum
        </Typography>
        <Typography variant="body2">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
          when an unknown printer took
        </Typography>
      </Stack>
      <Stack gap={8}>
        <Typography variant="h5">
          Lorem Ipsum
        </Typography>
        <Typography variant="body2">
          Curabitur quis bibendum enim. Aenean tempus elit eu tortor eleifend ultrices.
          Vivamus pretium suscipit purus in fermentum. Pellentesque laoreet lacus ac placerat aliquam.
          Quisque interdum aliquet quam, ultricies ultricies augue semper in.
          Mauris egestas sem ipsum, sed venenatis enim rutrum nec. Etiam dolor risus, lacinia sit amet viverra ut,
        </Typography>
      </Stack>
    </Stack>
  );
}

export const Right: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, toggle] = useDrawer();

    return (
      <div>
        <Button
          onClick={toggle}
          endIcon={<Icon name="arrow-right" />}
        >
          Toggle Drawer
        </Button>
        <Drawer
          open={open}
          onClose={toggle}
          direction="right"
          body={
            <DrawerContent>
              <Content />
            </DrawerContent>
          }
        />
      </div>
    );
  }
};

export const Left: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, toggle] = useDrawer();

    return (
      <div>
        <Button
          onClick={toggle}
          endIcon={<Icon name="arrow-left" />}
        >
          Toggle Drawer
        </Button>
        <Drawer
          open={open}
          onClose={toggle}
          direction="left"
          header={
            <DrawerHeader
              onClose={toggle}
            >
              <Typography>My title</Typography>
            </DrawerHeader>
          }
          body={
            <DrawerContent>
              <Content />
            </DrawerContent>
          }
          footer={
            <DrawerFooter>
              <Stack flexDirection="row" justifyContent="flex-end">
                <Button variant="outlined" onClick={toggle}>
                  Outlined
                </Button>
                <Button variant="contained" onClick={toggle}>
                  Contained
                </Button>
              </Stack>
            </DrawerFooter>
          }
        />
      </div>
    );
  }
};

export const Bottom: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, toggle] = useDrawer();

    return (
      <div>
        <Button
          onClick={toggle}
          endIcon={<Icon name="arrow-down" />}
        >
          Toggle Drawer
        </Button>
        <Drawer
          open={open}
          onClose={toggle}
          direction="bottom"
          body={
            <DrawerContent>
              <Content />
            </DrawerContent>
          }
        />
      </div>
    );
  }
};

export const Footer: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, toggle] = useDrawer();

    return (
      <div>
        <Button onClick={toggle}>
          Toggle Drawer
        </Button>
        <Drawer
          open={open}
          onClose={toggle}
          direction="right"
          body={
            <DrawerContent>
              <Content />
            </DrawerContent>
          }
          footer={
            <DrawerFooter>
              <Stack flexDirection="row" justifyContent="flex-end">
                <Button variant="outlined" onClick={toggle}>
                  Outlined
                </Button>
                <Button variant="contained" onClick={toggle}>
                  Contained
                </Button>
              </Stack>
            </DrawerFooter>
          }
        />
      </div>
    );
  }
};

export const Header: StoryObj<typeof Drawer> = {
  render: () => {
    const [open, toggle] = useDrawer();

    return (
      <div>
        <Button onClick={toggle}>
          Toggle Drawer
        </Button>
        <Drawer
          open={open}
          onClose={toggle}
          direction="right"
          header={
            <DrawerHeader
              onClose={toggle}
            >
              <Typography>My title</Typography>
            </DrawerHeader>
          }
          body={
            <DrawerContent>
              <Content />
            </DrawerContent>
          }
        />
      </div>
    );
  }
};

export const Playground: StoryObj<typeof Drawer> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Drawer> = {
  title: 'navigation/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'TODO: Drawer description',
      tag: (
        <Chip
          label="Navigation"
          icon={<Icon name="map" />}
          color="info"
        />
      ),
    },
  },
};

export default meta;
