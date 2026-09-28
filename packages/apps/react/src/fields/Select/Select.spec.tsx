import { fireEvent, render, screen } from '@testing-library/react';

import Option from './Option';
import Select from './Select';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Select', () => {
  it('displays the text for its selected option', () => {
    render(
      <Select value="monthly" onChange={jest.fn()}>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>
    );

    expect(screen.getByRole('textbox')).toHaveValue('Monthly');
  });

  it('reports enabled option selection', () => {
    const onChange = jest.fn((event) => event.currentTarget.value);

    render(
      <Select value="monthly" onChange={onChange}>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Yearly' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveReturnedWith('yearly');
  });

  it('disables its form control when disabled', () => {
    render(
      <Select disabled value="monthly" onChange={jest.fn()}>
        <Option value="monthly">Monthly</Option>
      </Select>
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
