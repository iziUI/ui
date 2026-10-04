# Navigation And Overlays

```tsx
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Menu,
  MenuButton,
  TabButton,
  TabContent,
  Tabs,
  useDrawer,
  useMenu,
  useTabs,
} from '@iziui/react';
```

## Drawer

Use controlled `Drawer` for secondary navigation, filters, or a focused
form. It requires `open`, `body`, and `onClose`. `direction` is `right`
(default), `left`, or `bottom`.

```tsx
function GameFilters() {
  const [open, toggleDrawer] = useDrawer();

  return (
    <>
      <Button onClick={toggleDrawer} type="button">Filters</Button>
      <Drawer
        aria-label="Game filters"
        body={<DrawerContent><FilterFields /></DrawerContent>}
        footer={<DrawerFooter><Button type="button">Apply filters</Button></DrawerFooter>}
        header={<DrawerHeader onClose={toggleDrawer}>Filters</DrawerHeader>}
        onClose={toggleDrawer}
        open={open}
      />
    </>
  );
}
```

Drawer is a modal dialog. Always give it `aria-label` or wire `aria-labelledby`
to a heading ID. `DrawerHeader` displays content but does not label the dialog.
It traps focus, restores focus on close, and closes with Escape or backdrop
interaction.

## Menu And MenuButton

Use `Menu` for a short list of actions anchored to a trigger. It requires
`open`, `anchorEl`, and `onClose`. Compose only `MenuButton` children.

```tsx
function GameMenu() {
  const [open, anchorEl, toggle] = useMenu();

  return (
    <>
      <Button onClick={toggle} type="button">Actions</Button>
      <Menu anchorEl={anchorEl} onClose={toggle} open={open}>
        <MenuButton label="Edit" onClick={editGame} />
        <MenuButton label="Archive" onClick={archiveGame} />
      </Menu>
    </>
  );
}
```

`MenuButton` requires `label`; it may also have `icon` and semantic `color`.
Menu supports arrow keys, Home, End, Enter, Space, and Escape for its button
children. Do not use arbitrary elements as Menu children. Do not use Menu as
a dialog or as a persistent navigation panel.

## Tabs, TabButton, And TabContent

Use `Tabs` for simple visual content switching. Compose `TabButton` children
and pair with explicit `TabContent` panels.

```tsx
function GameDetails() {
  const [setTab, current] = useTabs(0);

  return (
    <>
      <Tabs current={current} onChange={setTab}>
        <TabButton label="Overview" />
        <TabButton label="Reviews" />
      </Tabs>
      <TabContent current={current} value={0}><Overview /></TabContent>
      <TabContent current={current} value={1}><Reviews /></TabContent>
    </>
  );
}
```

`Tabs.current` defaults to `0`. `TabContent` renders only when its `value`
matches `current`. This family does not provide complete ARIA tabs semantics
or keyboard tab navigation. Do not present it as an accessible tabs pattern
without validating and supplying required application behavior.
