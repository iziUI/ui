import { act, fireEvent, render } from '@testing-library/react';

import Ripple from './Ripple';

jest.mock('@iziui/tokens/web/js', () => ({ prefix: 'iziui' }));

describe('Ripple', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => { jest.runOnlyPendingTimers(); });
    jest.useRealTimers();
  });

  it('should render the container', () => {
    const { container } = render(<Ripple />);
    expect(container.querySelector('.iziui-ripple-container')).toBeInTheDocument();
  });

  it('should render no ripple spans initially', () => {
    const { container } = render(<Ripple />);
    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(0);
  });

  it('should add a ripple span on mouseUp', () => {
    const { container } = render(<Ripple />);
    const rippleContainer = container.querySelector('.iziui-ripple-container')!;

    jest.spyOn(rippleContainer, 'getBoundingClientRect').mockReturnValue({
      width: 200, height: 100, top: 10, left: 20,
      right: 220, bottom: 110, x: 20, y: 10, toJSON: () => ({}),
    });

    fireEvent.mouseUp(rippleContainer, { clientX: 50, clientY: 30 });

    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(1);
  });

  it('should position the ripple based on click coordinates', () => {
    const { container } = render(<Ripple />);
    const rippleContainer = container.querySelector('.iziui-ripple-container')!;

    jest.spyOn(rippleContainer, 'getBoundingClientRect').mockReturnValue({
      width: 200, height: 100, top: 10, left: 20,
      right: 220, bottom: 110, x: 20, y: 10, toJSON: () => ({}),
    });

    fireEvent.mouseUp(rippleContainer, { clientX: 50, clientY: 30 });

    const ripple = container.querySelector('.iziui-ripple') as HTMLElement;
    const size = 200; // Math.max(200, 100)
    expect(ripple.style.left).toBe(`${50 - 20 - size / 2}px`);
    expect(ripple.style.top).toBe(`${30 - 10 - size / 2}px`);
    expect(ripple.style.width).toBe(`${size}px`);
    expect(ripple.style.height).toBe(`${size}px`);
  });

  it('should accumulate ripples on multiple mouseUp events before cleanup', () => {
    const { container } = render(<Ripple />);
    const rippleContainer = container.querySelector('.iziui-ripple-container')!;

    jest.spyOn(rippleContainer, 'getBoundingClientRect').mockReturnValue({
      width: 100, height: 100, top: 0, left: 0,
      right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}),
    });

    fireEvent.mouseUp(rippleContainer, { clientX: 10, clientY: 10 });
    fireEvent.mouseUp(rippleContainer, { clientX: 20, clientY: 20 });

    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(2);
  });

  it('should remove all ripples after 700ms', () => {
    const { container } = render(<Ripple />);
    const rippleContainer = container.querySelector('.iziui-ripple-container')!;

    jest.spyOn(rippleContainer, 'getBoundingClientRect').mockReturnValue({
      width: 100, height: 100, top: 0, left: 0,
      right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}),
    });

    fireEvent.mouseUp(rippleContainer, { clientX: 50, clientY: 50 });
    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(1);

    act(() => { jest.advanceTimersByTime(700); });
    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(0);
  });

  it('should not remove ripples before 700ms have elapsed', () => {
    const { container } = render(<Ripple />);
    const rippleContainer = container.querySelector('.iziui-ripple-container')!;

    jest.spyOn(rippleContainer, 'getBoundingClientRect').mockReturnValue({
      width: 100, height: 100, top: 0, left: 0,
      right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}),
    });

    fireEvent.mouseUp(rippleContainer, { clientX: 50, clientY: 50 });
    act(() => { jest.advanceTimersByTime(699); });

    expect(container.querySelectorAll('.iziui-ripple')).toHaveLength(1);
  });
});
