import { render, screen } from '@testing-library/react';

import DrawerContent from './DrawerContent';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('DrawerContent', () => {
  it('should render children', () => {
    render(<DrawerContent><p>body content</p></DrawerContent>);
    expect(screen.getByText('body content')).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <DrawerContent>
        <p>first</p>
        <p>second</p>
      </DrawerContent>
    );
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();
  });

  it('should forward HTML attributes to the container', () => {
    render(
      <DrawerContent data-testid="content" aria-label="drawer content">
        <span>x</span>
      </DrawerContent>
    );
    const el = screen.getByTestId('content');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'drawer content');
  });
});
