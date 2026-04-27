import { render, screen } from '@testing-library/react';

import DrawerFooter from './DrawerFooter';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('DrawerFooter', () => {
  it('should render children', () => {
    render(<DrawerFooter><button>Confirm</button></DrawerFooter>);
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('should render multiple children', () => {
    render(
      <DrawerFooter>
        <button>Cancel</button>
        <button>Submit</button>
      </DrawerFooter>
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should forward HTML attributes to the container', () => {
    render(
      <DrawerFooter data-testid="footer" aria-label="drawer actions">
        <span>x</span>
      </DrawerFooter>
    );
    const el = screen.getByTestId('footer');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'drawer actions');
  });
});
