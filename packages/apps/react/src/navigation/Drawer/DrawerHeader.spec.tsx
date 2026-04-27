import { fireEvent, render, screen } from '@testing-library/react';

import DrawerHeader from './DrawerHeader';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('DrawerHeader', () => {
  it('should render children', () => {
    render(<DrawerHeader onClose={jest.fn()}><h2>Drawer title</h2></DrawerHeader>);
    expect(screen.getByRole('heading', { name: 'Drawer title' })).toBeInTheDocument();
  });

  it('should render a close button', () => {
    render(<DrawerHeader onClose={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<DrawerHeader onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose more than once per click', () => {
    const onClose = jest.fn();
    render(<DrawerHeader onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Fechar' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('should forward HTML attributes to the container', () => {
    render(<DrawerHeader onClose={jest.fn()} data-testid="header" aria-label="drawer header" />);
    const el = screen.getByTestId('header');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-label', 'drawer header');
  });
});
