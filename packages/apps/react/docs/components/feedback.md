# Feedback

```tsx
import {
  Alert,
  Button,
  Loading,
  Modal,
  ModalFooter,
  Progress,
  Skeleton,
  ToastProvider,
  Typography,
  useModal,
  useToast,
} from '@iziui/react';
```

Choose feedback by duration and urgency. Read [Accessibility Navigation](../accessibility.md)
before building asynchronous feedback.

## Alert

Use `Alert` for feedback that remains in page flow until users resolve or
dismiss it. `color` defaults to `primary`; it accepts semantic color names.
The default role is `status`.

```tsx
<Alert color="error" role="alert">
  Could not load games. Check your connection and try again.
</Alert>
```

Use `role="alert"` only for urgent interruptions. Use `onClose` only when
dismissing the message does not hide critical information.

## Loading, Progress, And Skeleton

Use `Loading` for indeterminate waiting. It defaults to `role="status"` and
name `Loading`; supply `aria-label` when operation context matters.

```tsx
<Loading aria-label="Loading game catalogue" />
```

Use `Progress` for a known percentage. Pass values from `0` through `100`.
Use nearby text when users need operation context or remaining work.

Use `Skeleton` for a temporary content-shaped placeholder. It requires
`width` and `height`; `variant` is `rounded` (default), `rectangular`, or
`circular`. Do not use Skeleton as a progress announcement because it does
not forward accessible HTML attributes.

## Modal And ModalFooter

Use controlled `Modal` for a blocking task, confirmation, or focused
decision. Required props are `isOpen`, `onClose`, and `children`. `title` and
`subtitle` accept React elements.

```tsx
function DeleteGame({ gameName }: { gameName: string }) {
  const [isOpen, toggle] = useModal();

  return (
    <>
      <Button onClick={toggle} type="button" variant="outlined">Delete</Button>
      <Modal
        isOpen={isOpen}
        onClose={toggle}
        title={<Typography variant="h2">Delete {gameName}?</Typography>}
      >
        <Typography>This action cannot be undone.</Typography>
        <ModalFooter>
          <Button onClick={toggle} type="button" variant="text">Cancel</Button>
          <Button color="error" type="button">Delete game</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

Modal traps focus, closes with Escape or its backdrop, then restores focus to
the trigger. Provide a visible title when possible. Without one, provide
`aria-label` or `aria-labelledby`. Do not use Modal for transient information
that does not require user action.

## ToastProvider And useToast

Mount one `ToastProvider` near the application root. Call `useToast` only
inside that provider.

```tsx
function App() {
  return (
    <ToastProvider>
      <SaveGameButton />
    </ToastProvider>
  );
}

function SaveGameButton() {
  const { addToast } = useToast();

  return (
    <Button
      onClick={() => addToast({ color: 'success', message: 'Game saved.' })}
      type="button"
    >
      Save game
    </Button>
  );
}
```

Toast uses `status` for informational messages and `alert` for errors. Keep
toast content brief. Never use Toast as the only record of a critical failure,
destructive result, or validation error.
