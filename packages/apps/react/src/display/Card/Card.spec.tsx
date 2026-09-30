import { createEvent, fireEvent, render, screen } from '@/test/render';

import Card from './Card';

describe('Card', () => {
  it('exposes a clickable card as a keyboard-focusable button', () => {
    render(<Card onClick={() => {}}>Account summary</Card>);

    const card = screen.getByRole('button', { name: 'Account summary' });

    expect(card).toHaveAttribute('tabindex', '0');
    card.focus();
    expect(card).toHaveFocus();
  });

  it('calls onClick when a clickable card is clicked', () => {
    const onClick = jest.fn();

    render(<Card onClick={onClick}>Account summary</Card>);

    fireEvent.click(screen.getByRole('button', { name: 'Account summary' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter activates a clickable card', () => {
    const onClick = jest.fn();

    render(<Card onClick={onClick}>Account summary</Card>);

    fireEvent.keyDown(screen.getByRole('button', { name: 'Account summary' }), { key: 'Enter' });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space activates a clickable card', () => {
    const onClick = jest.fn();

    render(<Card onClick={onClick}>Account summary</Card>);

    const card = screen.getByRole('button', { name: 'Account summary' });
    const keyDown = createEvent.keyDown(card, { key: ' ' });

    fireEvent(card, keyDown);
    fireEvent.keyUp(card, { key: ' ' });

    expect(keyDown.defaultPrevented).toBe(true);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not activate when consumer keyboard handler prevents default', () => {
    const onClick = jest.fn();

    render(
      <Card onClick={onClick} onKeyDown={(event) => event.preventDefault()}>
        Account summary
      </Card>
    );

    fireEvent.keyDown(screen.getByRole('button', { name: 'Account summary' }), { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not activate Space when consumer keyboard handler prevents default', () => {
    const onClick = jest.fn();

    render(
      <Card onClick={onClick} onKeyDown={(event) => event.preventDefault()}>
        Account summary
      </Card>
    );

    const card = screen.getByRole('button', { name: 'Account summary' });

    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.keyUp(card, { key: ' ' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not activate Space when keyup handler prevents default', () => {
    const onClick = jest.fn();

    render(
      <Card onClick={onClick} onKeyUp={(event) => event.preventDefault()}>
        Account summary
      </Card>
    );

    const card = screen.getByRole('button', { name: 'Account summary' });

    fireEvent.keyDown(card, { key: ' ' });
    fireEvent.keyUp(card, { key: ' ' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps a static card out of keyboard navigation', () => {
    render(<Card>Account summary</Card>);

    expect(screen.queryByRole('button', { name: 'Account summary' })).not.toBeInTheDocument();
    expect(screen.getByText('Account summary')).not.toHaveAttribute('tabindex');
  });

  it('updates static role after rerender', () => {
    const { rerender } = render(
      <Card role="region" aria-label="Account summary">
        Account summary
      </Card>
    );

    rerender(
      <Card role="article" aria-label="Account summary">
        Account summary
      </Card>
    );

    expect(screen.getByRole('article', { name: 'Account summary' })).toBeInTheDocument();
  });

  it('updates clickable tabIndex after rerender', () => {
    const onClick = jest.fn();
    const { rerender } = render(
      <Card onClick={onClick} tabIndex={-1}>
        Account summary
      </Card>
    );

    rerender(
      <Card onClick={onClick} tabIndex={0}>
        Account summary
      </Card>
    );

    expect(screen.getByRole('button', { name: 'Account summary' })).toHaveAttribute('tabindex', '0');
  });
});
