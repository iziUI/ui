import { render, screen } from '@/test/render';

import Table from './Table';

describe('Table', () => {
  it('should render successfully', () => {
    render(<Table data-testid="table" />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('should apply base class', () => {
    render(<Table data-testid="table" />);
    expect(screen.getByTestId('table')).toHaveClass('iziui-table');
  });

  it('should apply additional className', () => {
    render(<Table data-testid="table" className="custom" />);
    expect(screen.getByTestId('table')).toHaveClass('custom');
  });

  it('applies wrapper layout props without forwarding them to the DOM', () => {
    render(<Table data-testid="table" fullWidth />);

    const table = screen.getByTestId('table');
    expect(table).toHaveStyle({ width: '100%' });
    expect(table).not.toHaveAttribute('fullWidth');
  });
});
