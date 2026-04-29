import { render, screen } from '@testing-library/react';

import Menu from './Menu';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Menu', () => {
  it('should render successfully', () => {
    render(<Menu data-testid="menu" />);
    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('should apply base class', () => {
    render(<Menu data-testid="menu" />);
    expect(screen.getByTestId('menu')).toHaveClass('iziui-menu');
  });

  it('should merge additional className', () => {
    render(<Menu data-testid="menu" className="custom" />);
    const el = screen.getByTestId('menu');
    expect(el).toHaveClass('iziui-menu');
    expect(el).toHaveClass('custom');
  });

  it('should render children', () => {
    render(
      <Menu>
        <li data-testid="menu-item">Item</li>
      </Menu>
    );
    expect(screen.getByTestId('menu-item')).toBeInTheDocument();
  });
});
