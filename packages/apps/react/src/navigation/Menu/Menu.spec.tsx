import { act, fireEvent, render, screen } from '@/test/render';

import Menu from './Menu';

describe('Menu', () => {
  afterEach(() => {
    jest.useRealTimers();
    document.body.style.overflow = '';
  });

  it('renders menu actions when open', () => {
    const anchor = document.createElement('button');

    render(
      <Menu open anchorEl={anchor} onClose={jest.fn()}>
        <button type="button">Account settings</button>
      </Menu>
    );

    expect(screen.getByRole('button', { name: 'Account settings' })).toBeInTheDocument();
  });

  it('runs selected actions and closes automatically', () => {
    jest.useFakeTimers();
    const anchor = document.createElement('button');
    const onClose = jest.fn();
    const onSelect = jest.fn();

    render(
      <Menu open autoClose anchorEl={anchor} onClose={onClose}>
        <button type="button" onClick={onSelect}>Sign out</button>
      </Menu>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(onSelect).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
