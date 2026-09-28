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
  it('exposes its label and helper text', () => {
    render(
      <Checkbox
        checked={false}
        name="terms"
        label="Accept terms"
        helperText="Required to continue"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
    expect(screen.getByText('Required to continue')).toBeInTheDocument();
  });

  it('reports changes when users select it', () => {
    const onChange = jest.fn();

    render(
      <Checkbox
        checked={false}
        name="terms"
        label="Accept terms"
        onChange={onChange}
      />
    );

    fireEvent.click(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('exposes its disabled state', () => {
    render(
      <Checkbox
        checked
        disabled
        name="terms"
        label="Accept terms"
        onChange={() => undefined}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });
    expect(checkbox).toBeDisabled();
  });
});
