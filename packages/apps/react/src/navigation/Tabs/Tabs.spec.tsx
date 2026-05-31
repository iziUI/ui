import { render, screen } from '@testing-library/react';

import Tabs from './Tabs';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Tabs', () => {
  it('should render successfully', () => {
    render(<Tabs data-testid="tabs" />);
    expect(screen.getByTestId('tabs')).toBeInTheDocument();
  });

  it('should apply base class', () => {
    render(<Tabs data-testid="tabs" />);
    expect(screen.getByTestId('tabs')).toHaveClass('iziui-tabs');
  });

  it('should merge additional className', () => {
    render(<Tabs data-testid="tabs" className="custom" />);
    const el = screen.getByTestId('tabs');
    expect(el).toHaveClass('iziui-tabs');
    expect(el).toHaveClass('custom');
  });

  it('should render children', () => {
    render(
      <Tabs>
        <div data-testid="tab-item">Tab 1</div>
      </Tabs>
    );
    expect(screen.getByTestId('tab-item')).toBeInTheDocument();
  });
});
