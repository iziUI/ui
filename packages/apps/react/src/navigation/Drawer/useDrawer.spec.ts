import { act, renderHook } from '@testing-library/react';

import useDrawer from './useDrawer';

describe('useDrawer', () => {
  it('should default to false when no argument is provided', () => {
    const { result } = renderHook(() => useDrawer());
    expect(result.current[0]).toBe(false);
  });

  it('should initialize as open when true is passed', () => {
    const { result } = renderHook(() => useDrawer(true));
    expect(result.current[0]).toBe(true);
  });

  it('should initialize as closed when false is passed', () => {
    const { result } = renderHook(() => useDrawer(false));
    expect(result.current[0]).toBe(false);
  });

  it('should toggle from closed to open', () => {
    const { result } = renderHook(() => useDrawer());
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);
  });

  it('should toggle from open to closed', () => {
    const { result } = renderHook(() => useDrawer(true));
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(false);
  });

  it('should toggle multiple times consistently', () => {
    const { result } = renderHook(() => useDrawer());
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(false);
    act(() => { result.current[1](); });
    expect(result.current[0]).toBe(true);
  });
});
