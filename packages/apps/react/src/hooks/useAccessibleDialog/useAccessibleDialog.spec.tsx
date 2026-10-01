import { fireEvent, render, screen } from '@/test/render';

import useAccessibleDialog from './useAccessibleDialog';

function Dialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { dialogRef, onKeyDown } = useAccessibleDialog({
    open,
    onClose,
    restoreAfterClose: !open,
  });

  if (!open) { return null; }

  return (
    <div ref={dialogRef} role="dialog" tabIndex={-1} onKeyDown={onKeyDown}>
      <button type="button">Confirm</button>
    </div>
  );
}

describe('useAccessibleDialog', () => {
  it('focuses dialog content, traps Tab, closes with Escape, and restores focus', () => {
    const trigger = document.createElement('button');
    const onClose = jest.fn();

    document.body.append(trigger);
    trigger.focus();

    const { rerender } = render(<Dialog open onClose={onClose} />);

    const dialog = screen.getByRole('dialog');
    const confirm = screen.getByRole('button', { name: 'Confirm' });

    expect(confirm).toHaveFocus();

    fireEvent.keyDown(confirm, { key: 'Tab' });
    expect(confirm).toHaveFocus();

    fireEvent.keyDown(confirm, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<Dialog open={false} onClose={onClose} />);

    expect(dialog).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    trigger.remove();
  });
});
