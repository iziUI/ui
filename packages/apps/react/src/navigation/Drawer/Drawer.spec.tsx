import { userEvent } from '@storybook/test';

import { act, fireEvent, render, screen } from '@/test/render';

import Drawer from './Drawer';

const defaultProps = {
  'data-testid': 'drawer',
  header: <div data-testid="drawer-header">header</div>,
  body: <div data-testid="drawer-body">body</div>,
  footer: <div data-testid="drawer-footer">footer</div>,
  onClose: jest.fn(),
};

describe('Drawer', () => {
  it('should render successfully', () => {
    render(<Drawer {...defaultProps} open />);
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
  });

  it('should apply base class', () => {
    render(<Drawer {...defaultProps} open />);
    expect(screen.getByTestId('drawer')).toHaveClass('iziui-drawer');
  });

  it('should merge additional className', () => {
    render(<Drawer {...defaultProps} open className="custom" />);
    const el = screen.getByTestId('drawer');
    expect(el).toHaveClass('iziui-drawer');
    expect(el).toHaveClass('custom');
  });

  describe('open/close behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      document.body.style.overflow = '';
    });

    afterEach(() => {
      act(() => { jest.runOnlyPendingTimers(); });
      jest.useRealTimers();
      document.body.style.overflow = '';
    });

    it('should show the drawer when open is true', () => {
      render(<Drawer {...defaultProps} open />);
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
    });

    it('should not render the drawer when open is false', () => {
      render(<Drawer {...defaultProps} open={false} />);
      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

    it('should remove the drawer from DOM after closing animation completes', () => {
      const { rerender } = render(<Drawer {...defaultProps} open />);
      expect(screen.getByTestId('drawer')).toBeInTheDocument();

      rerender(<Drawer {...defaultProps} open={false} />);
      act(() => { jest.advanceTimersByTime(300); });

      expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
    });

    it('should lock body scroll when drawer opens', () => {
      render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when drawer closes', () => {
      const { rerender } = render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Drawer {...defaultProps} open={false} />);
      act(() => { jest.advanceTimersByTime(300); });
      expect(document.body.style.overflow).toBe('');
    });

    it('should call onClose when overlay is clicked', () => {
      const onClose = jest.fn();
      render(<Drawer {...defaultProps} open onClose={onClose} />);
      fireEvent.click(screen.getByTestId('drawer-overlay'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('direction prop', () => {
    it('should apply right direction class by default', () => {
      const { container } = render(<Drawer {...defaultProps} open />);
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--right');
    });

    it('should apply left direction class', () => {
      const { container } = render(<Drawer {...defaultProps} open direction="left" />);
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--left');
    });

    it('should apply bottom direction class', () => {
      const { container } = render(<Drawer {...defaultProps} open direction="bottom" />);
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--bottom');
    });
  });

  describe('animation classes', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      document.body.style.overflow = '';
    });

    afterEach(() => {
      act(() => { jest.runOnlyPendingTimers(); });
      jest.useRealTimers();
      document.body.style.overflow = '';
    });

    it('should start with hide animation class on content before open delay', () => {
      const { container } = render(<Drawer {...defaultProps} open />);
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--right--hide');
    });

    it('should transition content to show animation class after open delay', () => {
      const { container } = render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--right--show');
    });

    it('should start with hide animation class on overlay before open delay', () => {
      render(<Drawer {...defaultProps} open />);
      expect(screen.getByTestId('drawer-overlay')).toHaveClass('iziui-drawer__overlay--hide');
    });

    it('should transition overlay to show animation class after open delay', () => {
      render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });
      expect(screen.getByTestId('drawer-overlay')).toHaveClass('iziui-drawer__overlay--show');
    });

    it('should revert content to hide animation class when closing', () => {
      const { container, rerender } = render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });

      rerender(<Drawer {...defaultProps} open={false} />);
      const content = container.querySelector('.iziui-drawer__content');
      expect(content).toHaveClass('iziui-drawer__content--right--hide');
    });

    it('should revert overlay to hide animation class when closing', () => {
      const { rerender } = render(<Drawer {...defaultProps} open />);
      act(() => { jest.advanceTimersByTime(100); });

      rerender(<Drawer {...defaultProps} open={false} />);
      expect(screen.getByTestId('drawer-overlay')).toHaveClass('iziui-drawer__overlay--hide');
    });
  });

  describe('optional slots', () => {
    it('should render without header', () => {
      render(
        <Drawer
          data-testid="drawer"
          body={<div data-testid="drawer-body">body</div>}
          open
          onClose={jest.fn()}
        />
      );
      expect(screen.queryByTestId('drawer-header')).not.toBeInTheDocument();
      expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
    });

    it('should render without footer', () => {
      render(
        <Drawer
          data-testid="drawer"
          body={<div data-testid="drawer-body">body</div>}
          open
          onClose={jest.fn()}
        />
      );
      expect(screen.queryByTestId('drawer-footer')).not.toBeInTheDocument();
      expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
    });

    it('should render with only body slot', () => {
      render(
        <Drawer
          data-testid="drawer"
          body={<div data-testid="drawer-body">body</div>}
          open
          onClose={jest.fn()}
        />
      );
      expect(screen.getByTestId('drawer')).toBeInTheDocument();
      expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
    });
  });

  describe('accessible dialog behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      act(() => {
        jest.runOnlyPendingTimers();
      });
      jest.useRealTimers();
      document.body.innerHTML = '';
    });

    it('traps focus, closes with Escape, and restores trigger focus after closing', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      const trigger = document.createElement('button');
      const onClose = jest.fn();

      document.body.append(trigger);
      trigger.focus();

      const { rerender } = render(
        <Drawer
          open
          aria-label="Account filters"
          body={<><button type="button">First filter</button><button type="button">Last filter</button></>}
          onClose={onClose}
        />
      );

      const dialog = screen.getByRole('dialog', { name: 'Account filters' });
      const firstFilter = screen.getByRole('button', { name: 'First filter' });
      const lastFilter = screen.getByRole('button', { name: 'Last filter' });

      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(firstFilter).toHaveFocus();

      await act(async () => {
        await user.keyboard('{Tab}{Tab}');
      });
      expect(firstFilter).toHaveFocus();

      await act(async () => {
        await user.keyboard('{Shift>}{Tab}{/Shift}');
      });
      expect(lastFilter).toHaveFocus();

      fireEvent.keyDown(lastFilter, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);

      rerender(
        <Drawer
          open={false}
          aria-label="Account filters"
          body={<><button type="button">First filter</button><button type="button">Last filter</button></>}
          onClose={onClose}
        />
      );
      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(trigger).toHaveFocus();
    });

    it('focuses its dialog container when no focusable content exists', () => {
      const trigger = document.createElement('button');

      document.body.append(trigger);
      trigger.focus();

      render(
        <Drawer
          open
          aria-label="Empty drawer"
          body={<div>Empty content</div>}
          onClose={jest.fn()}
        />
      );

      expect(screen.getByRole('dialog', { name: 'Empty drawer' })).toHaveFocus();
    });

    it('does not restore focus to a trigger removed before close animation ends', () => {
      const trigger = document.createElement('button');

      document.body.append(trigger);
      trigger.focus();

      const { rerender } = render(
        <Drawer
          open
          aria-label="Temporary drawer"
          body={<div>Drawer content</div>}
          onClose={jest.fn()}
        />
      );

      trigger.remove();
      rerender(
        <Drawer
          open={false}
          aria-label="Temporary drawer"
          body={<div>Drawer content</div>}
          onClose={jest.fn()}
        />
      );

      expect(() => {
        act(() => {
          jest.advanceTimersByTime(300);
        });
      }).not.toThrow();
    });
  });
});
