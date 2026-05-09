import { render, screen } from '@testing-library/react';

import InputFile from './InputFile';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('InputFile', () => {
  it('should render successfully', () => {
    render(<InputFile data-testid="input-file" />);

    const el = screen.getByTestId('input-file');
    expect(el).toBeInTheDocument();
  });

  it('should apply base class and additional className', () => {
    render(<InputFile data-testid="input-file" className="custom-class" />);

    const el = screen.getByTestId('input-file');
    expect(el).toHaveClass('iziui-input-file');
    expect(el).toHaveClass('custom-class');
  });
});
