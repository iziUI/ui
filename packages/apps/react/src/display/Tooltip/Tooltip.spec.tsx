import React from 'react';

import { render, screen } from '@testing-library/react';

import Tooltip from './Tooltip';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Tooltip', () => {
  it('should render successfully', () => {
    render(<Tooltip data-testid="tooltip" />);
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
  });

  it('should apply base class', () => {
    render(<Tooltip data-testid="tooltip" />);
    expect(screen.getByTestId('tooltip')).toHaveClass('iziui-tooltip');
  });

  it('should apply additional className', () => {
    render(<Tooltip data-testid="tooltip" className="custom" />);
    expect(screen.getByTestId('tooltip')).toHaveClass('custom');
  });

  it('should render content text', () => {
    render(<Tooltip data-testid="tooltip" content="Tooltip text" />);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <Tooltip data-testid="tooltip">
        <span>trigger</span>
      </Tooltip>
    );
    expect(screen.getByText('trigger')).toBeInTheDocument();
  });
});
