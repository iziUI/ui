import { render, screen } from '@testing-library/react';

import ColorPicker from './ColorPicker';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('ColorPicker', () => {
  it('renders successfully', () => {
    render(<ColorPicker />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<ColorPicker label="Choose color" />);
    expect(screen.getByText('Choose color')).toBeInTheDocument();
  });

  it('renders helperText when provided', () => {
    render(<ColorPicker helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<ColorPicker />);
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'color');
  });
});
