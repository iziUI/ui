import { userEvent } from '@storybook/test';

import { act, fireEvent, render, screen } from '@/test/render';
import Button from '@/actions/Button';
import { Typography } from '@/display';

import Modal from './Modal';
import ModalFooter from './ModalFooter';

describe('Modal', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Modal
        isOpen
        title={<Typography variant="h6">Title</Typography>}
        subtitle={<Typography variant="subtitle2" weight="normal">Subtitle</Typography>}
        onClose={() => ''}
      >
        <ModalFooter>
          <Button variant="text" color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
    expect(container.querySelector('.iziui-modal')).toBeInTheDocument();
  });

  it('names its dialog, traps focus, and supports Escape and backdrop close', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const trigger = document.createElement('button');
    const onClose = jest.fn();

    document.body.append(trigger);
    trigger.focus();

    const { container, rerender } = render(
      <Modal isOpen title={<Typography variant="h6">Confirm removal</Typography>} onClose={onClose}>
        <Button>Cancel</Button>
      </Modal>
    );

    const dialog = screen.getByRole('dialog', { name: 'Confirm removal' });
    const closeButton = screen.getByRole('button', { name: 'Close modal' });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(document.getElementById(dialog.getAttribute('aria-labelledby') ?? '')).toHaveTextContent('Confirm removal');
    expect(closeButton).toHaveFocus();

    await act(async () => {
      await user.keyboard('{Tab}{Tab}');
    });
    expect(closeButton).toHaveFocus();

    fireEvent.keyDown(closeButton, { key: 'Escape' });
    fireEvent.click(container.querySelector(`.${'iziui-modal__backdrop'}`)!);
    expect(onClose).toHaveBeenCalledTimes(2);

    rerender(
      <Modal isOpen={false} title={<Typography variant="h6">Confirm removal</Typography>} onClose={onClose}>
        <Button>Cancel</Button>
      </Modal>
    );
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(trigger).toHaveFocus();
    jest.useRealTimers();
    trigger.remove();
  });
});
