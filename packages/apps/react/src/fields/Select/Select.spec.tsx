import { render, screen } from '@testing-library/react';

import Select from './Select';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Select', () => {
  it('renders successfully', () => {
    render(<Select name="test" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    render(<Select name="test" label="Choose one" />);
    expect(screen.getByText('Choose one')).toBeInTheDocument();
  });

  it('associates label with select via htmlFor', () => {
    render(<Select name="test" label="Choose one" />);
    const label = screen.getByText('Choose one');
    expect(label).toHaveAttribute('for', 'test');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Select name="test" disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders helperText when provided', () => {
    render(<Select name="test" helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('renders children options', () => {
    render(
      <Select name="test">
        <option value="a">Option A</option>
      </Select>
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });
});
