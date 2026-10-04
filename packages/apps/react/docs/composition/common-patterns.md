# Common Composition Patterns

Examples use public `@iziui/react` APIs only. Read the matching component
guide before adapting an example.

## Page Header

Use when a page needs title, supporting context, and primary action. Avoid
using it for a card title; use `h3` in the Card instead.

```tsx
import { Button, Stack, Typography } from '@iziui/react';

<Stack alignItems="center" flexDirection="row" gap={16} justifyContent="space-between" tag="header">
  <Stack gap={8}>
    <Typography variant="h1">Game catalogue</Typography>
    <Typography color="text.secondary" variant="body2">Browse available titles.</Typography>
  </Stack>
  <Button type="button">Add game</Button>
</Stack>
```

## Form

Use when collecting a small, structured set of values. Avoid using `Stack`
only for validation; application code still owns validation state and submit
behavior.

```tsx
import { Button, Input, Option, Select, Stack, Typography } from '@iziui/react';

<Stack gap={16} tag="form">
  <Typography variant="h2">Add game</Typography>
  <Input label="Title" required value={title} onChange={(event) => setTitle(event.target.value)} />
  <Select label="Platform" onValueChange={setPlatform} required value={platform}>
    <Option value="pc">PC</Option>
    <Option value="playstation">PlayStation</Option>
  </Select>
  <Button type="submit">Save game</Button>
</Stack>
```

## Card List Item

Use when each result has content and one or more explicit actions. Avoid a
clickable Card when it contains Button or link controls.

```tsx
import { Button, Card, CardContent, Chip, Stack, Typography } from '@iziui/react';

<Card>
  <CardContent>
    <Stack gap={16}>
      <Stack gap={8}>
        <Typography variant="h3">Hades II</Typography>
        <Chip color="success" label="Available" />
        <Typography color="text.secondary" variant="body2">PC</Typography>
      </Stack>
      <Button type="button" variant="outlined">View details</Button>
    </Stack>
  </CardContent>
</Card>
```

## Responsive Catalogue Grid

Use when repeated cards need responsive columns. Avoid manual child widths or
margin-based wrapping.

```tsx
import { Card, CardContent, Container, Grid, GridItem, Stack, Typography } from '@iziui/react';

<Container tag="main">
  <Stack gap={24}>
    <Typography variant="h2">Featured games</Typography>
    <Grid gap={16} lg={3} md={4} sm={6} xl={3} xs={12}>
      {games.map((game) => (
        <GridItem key={game.id}>
          <Card>
            <CardContent>
              <Typography variant="h3">{game.title}</Typography>
            </CardContent>
          </Card>
        </GridItem>
      ))}
    </Grid>
  </Stack>
</Container>
```

## Filters Toolbar

Use when filters fit in a desktop toolbar and move to a Drawer on narrow
screens. Avoid using a Drawer without an accessible name.

```tsx
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Option,
  Select,
  Stack,
  useDrawer,
} from '@iziui/react';

function Filters() {
  const [open, toggleDrawer] = useDrawer();

  return (
    <>
      <Stack flexDirection="row" gap={12}>
        <Select label="Platform" onValueChange={setPlatform} value={platform}>
          <Option value="pc">PC</Option>
          <Option value="xbox">Xbox</Option>
        </Select>
        <Button onClick={toggleDrawer} type="button" variant="outlined">More filters</Button>
      </Stack>
      <Drawer
        aria-label="More game filters"
        body={(
          <DrawerContent>
            <CheckboxGroup
              label="Status"
              onChange={(items) => setStatuses(
                items.filter((item) => item.checked).map((item) => item.id),
              )}
              values={statuses}
            >
              <Checkbox label="Available" name="available" value="available" />
              <Checkbox label="Coming soon" name="coming-soon" value="coming-soon" />
            </CheckboxGroup>
          </DrawerContent>
        )}
        footer={<DrawerFooter><Button onClick={toggleDrawer} type="button">Apply filters</Button></DrawerFooter>}
        header={<DrawerHeader onClose={toggleDrawer}>More filters</DrawerHeader>}
        onClose={toggleDrawer}
        open={open}
      />
    </>
  );
}
```

## Empty And Error States

Use an empty state when a successful query has no results. Use Alert when a
request fails and users need a recovery path. Avoid using Toast as the only
error record.

```tsx
import { Alert, Button, Stack, Typography } from '@iziui/react';

<Stack alignItems="center" gap={16} tag="section">
  <Typography variant="h2">No games found</Typography>
  <Typography color="text.secondary" variant="body2">Try removing a filter.</Typography>
  <Button type="button" variant="outlined">Clear filters</Button>
</Stack>

<Alert color="error" role="alert">
  Could not load games. <Button type="button" variant="text">Try again</Button>
</Alert>
```

## Confirmation Modal

Use for destructive or irreversible actions. Avoid confirmation for a
reversible action that can use undo feedback instead.

```tsx
import { Button, Modal, ModalFooter, Stack, Typography, useModal } from '@iziui/react';

function ArchiveGame() {
  const [isOpen, toggle] = useModal();

  return (
    <>
      <Button onClick={toggle} type="button" variant="outlined">Archive</Button>
      <Modal
        isOpen={isOpen}
        onClose={toggle}
        title={<Typography variant="h2">Archive this game?</Typography>}
      >
        <Stack gap={16}>
          <Typography>This game will move out of the active catalogue.</Typography>
          <ModalFooter>
            <Button onClick={toggle} type="button" variant="text">Cancel</Button>
            <Button color="warning" type="button">Archive game</Button>
          </ModalFooter>
        </Stack>
      </Modal>
    </>
  );
}
```

## Responsive Page

Use when a catalogue page needs a responsive header, filters, and result grid.
Avoid when content is a short, static list without filtering or page actions.

```tsx
import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Container,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Grid,
  GridItem,
  Option,
  Select,
  Stack,
  Typography,
  useDrawer,
} from '@iziui/react';

type Game = { id: string; platform: string; title: string };

function CataloguePage({ games }: { games: Game[] }) {
  const [platform, setPlatform] = useState('all');
  const [filtersOpen, toggleFilters] = useDrawer();

  return (
    <Container tag="main">
      <Stack gap={32}>
        <Stack alignItems="center" flexDirection="row" justifyContent="space-between" tag="header">
          <Stack gap={8}>
            <Typography variant="h1">Game catalogue</Typography>
            <Typography color="text.secondary" variant="body2">Browse available titles.</Typography>
          </Stack>
          <Button type="button">Add game</Button>
        </Stack>

        <Stack gap={16} tag="section">
          <Stack flexDirection="row" gap={12}>
            <Select label="Platform" onValueChange={setPlatform} value={platform}>
              <Option value="all">All platforms</Option>
              <Option value="pc">PC</Option>
              <Option value="console">Console</Option>
            </Select>
            <Button onClick={toggleFilters} type="button" variant="outlined">More filters</Button>
          </Stack>
          <Drawer
            aria-label="Game filters"
            body={<DrawerContent>Additional filters</DrawerContent>}
            footer={<DrawerFooter><Button onClick={toggleFilters} type="button">Apply filters</Button></DrawerFooter>}
            header={<DrawerHeader onClose={toggleFilters}>Filters</DrawerHeader>}
            onClose={toggleFilters}
            open={filtersOpen}
          />

          <Typography variant="h2">Featured games</Typography>
          <Grid gap={16}>
            {games.map((game) => (
              <GridItem key={game.id} lg={3} md={4} sm={6} xl={3} xs={12}>
                <Card>
                  <CardContent>
                    <Stack gap={8}>
                      <Typography variant="h3">{game.title}</Typography>
                      <Typography color="text.secondary" variant="body2">{game.platform}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Container>
  );
}
```
