import { render, screen, fireEvent } from '@testing-library/react';

import Checkbox from './Checkbox';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

jest.mock('@iziui/toolkit/uuid', () => ({
  uuid: () => 'test-uuid',
}));

describe('Checkbox', () => {
  it('renders successfully', () => {
    render(<Checkbox data-testid="checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toHaveClass('iziui-checkbox__input');
  });

  it('renders the label when provided', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Checkbox label="Accept terms" />);
    const input = screen.getByRole('checkbox');
    const label = screen.getByText('Accept terms');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('applies color class', () => {
    render(<Checkbox color="secondary" />);
    expect(screen.getByRole('checkbox')).toHaveClass('iziui-checkbox__input--secondary');
  });

  it('applies default primary color class', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toHaveClass('iziui-checkbox__input--primary');
  });

  it('applies error class when error prop is true', () => {
    render(<Checkbox error />);
    expect(screen.getByRole('checkbox')).toHaveClass('iziui-checkbox__input--error');
  });

  it('renders helperText when provided', () => {
    render(<Checkbox helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('is checked when checked prop is true', () => {
    render(<Checkbox checked onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when clicked', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} disabled />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
