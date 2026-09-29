import { fireEvent, render, screen } from '@/test/render';

import Option from './Option';
import Select from './Select';

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
    const onValueChange = jest.fn();

    render(
      <Select value="monthly" onChange={onChange} onValueChange={onValueChange}>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly">Yearly</Option>
      </Select>
    );

    fireEvent.click(screen.getByRole('textbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Yearly' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveReturnedWith('yearly');
    expect(onValueChange).toHaveBeenCalledWith('yearly');
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
