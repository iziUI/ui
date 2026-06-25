import { render, screen } from '@testing-library/react';

import Textarea from './Textarea';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Textarea', () => {
  it('should render successfully', () => {
    render(<Textarea data-testid="textarea" />);

    const el = screen.getByTestId('textarea');
    expect(el).toBeInTheDocument();
  });

  it('should apply base class and additional className', () => {
    render(<Textarea data-testid="textarea" className="custom-class" />);

    const el = screen.getByTestId('textarea');
    expect(el).toHaveClass('iziui-textarea');
    expect(el).toHaveClass('custom-class');
  });
});
