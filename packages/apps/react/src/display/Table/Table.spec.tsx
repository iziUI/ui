import React from 'react';

import { render, screen } from '@testing-library/react';

import Table from './Table';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

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
});
