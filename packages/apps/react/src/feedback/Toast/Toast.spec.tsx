import { act, fireEvent, render, screen } from '@/test/render';

import Toast from './Toast';

describe('Toast', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders successfully', () => {
    const { container } = render(
      <Toast color="success" message="message here" onRemove={() => ''} />
    );
    expect(container.querySelector('.iziui-toast')).toBeInTheDocument();
  });

  it.each([
    ['success', 'status'],
    ['error', 'alert'],
  ] as const)('uses %s announcement priority for %s toasts', (color, role) => {
    render(<Toast color={color} message="Toast message" onRemove={jest.fn()} />);

    expect(screen.getByRole(role)).toHaveTextContent('Toast message');
  });

  it('pauses automatic removal while focused and resumes after blur', () => {
    jest.useFakeTimers();

    const onRemove = jest.fn();
    render(<Toast id="toast-id" color="success" delay={100} message="Toast message" onRemove={onRemove} />);

    const toast = screen.getByRole('status');

    fireEvent.focus(toast);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onRemove).not.toHaveBeenCalled();

    fireEvent.blur(toast);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onRemove).toHaveBeenCalledTimes(1);

  });

  it('resumes automatic removal only after pointer and focus both leave', () => {
    jest.useFakeTimers();

    const onRemove = jest.fn();
    render(<Toast id="toast-id" color="success" delay={100} message="Toast message" onRemove={onRemove} />);

    const toast = screen.getByRole('status');

    fireEvent.mouseEnter(toast);
    fireEvent.focus(toast);
    fireEvent.blur(toast);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onRemove).not.toHaveBeenCalled();

    fireEvent.mouseLeave(toast);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
