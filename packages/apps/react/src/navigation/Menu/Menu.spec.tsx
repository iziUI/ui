import { userEvent } from '@storybook/test';

import { act, fireEvent, render, screen } from '@/test/render';

import Menu from './Menu';
import MenuButton from './MenuButton';

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

  it('navigates enabled menu items and restores anchor focus on Escape', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const anchor = document.createElement('button');
    const onClose = jest.fn();
    const onFirst = jest.fn();
    const onLast = jest.fn();

    document.body.append(anchor);

    render(
      <Menu open anchorEl={anchor} onClose={onClose}>
        <MenuButton label="First action" onClick={onFirst} />
        <MenuButton label="Disabled action" disabled />
        <MenuButton label="Last action" onClick={onLast} />
      </Menu>
    );

    const menu = screen.getByRole('menu');
    const firstAction = screen.getByRole('menuitem', { name: 'First action' });
    const lastAction = screen.getByRole('menuitem', { name: 'Last action' });

    expect(menu).toBeInTheDocument();

    firstAction.focus();

    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });
    expect(lastAction).toHaveFocus();

    await act(async () => {
      await user.keyboard('{Home}');
      await user.keyboard('{Enter}');
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(onFirst).toHaveBeenCalledTimes(1);

    await act(async () => {
      await user.keyboard('{End}');
      await user.keyboard(' ');
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(onLast).toHaveBeenCalledTimes(1);

    await act(async () => {
      await user.keyboard('{Escape}');
    });
    act(() => {
      jest.advanceTimersByTime(150);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(anchor).toHaveFocus();

    anchor.remove();
  });

  it('preserves an explicit popup role', () => {
    const anchor = document.createElement('button');

    render(
      <Menu open role="listbox" anchorEl={anchor} onClose={jest.fn()}>
        <button type="button">Option</button>
      </Menu>
    );

    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });
});
