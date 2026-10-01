import { userEvent } from '@storybook/test';

import { act, fireEvent, render, screen } from '@/test/render';

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

    expect(screen.getByRole('combobox')).toHaveTextContent('Monthly');
  });

  it('displays placeholder when no option is selected', () => {
    render(
      <Select placeholder="Select billing cycle" onChange={jest.fn()}>
        <Option value="monthly">Monthly</Option>
      </Select>
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Select billing cycle');
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

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Yearly' }));

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

    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('uses a combobox button, listbox options, and hidden form value', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Select id="billing-cycle" name="billingCycle" label="Billing cycle" value="monthly" onChange={jest.fn()}>
        <Option value="monthly">Monthly</Option>
        <Option value="yearly" disabled>Yearly</Option>
      </Select>
    );

    const combobox = screen.getByRole('combobox', { name: 'Billing cycle' });

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(document.querySelector('input[type="hidden"]')).toHaveAttribute('name', 'billingCycle');
    expect(document.querySelector('input[type="hidden"]')).toHaveValue('monthly');

    await act(async () => {
      await user.click(combobox);
    });

    const listbox = screen.getByRole('listbox');
    const monthly = screen.getByRole('option', { name: 'Monthly' });
    const yearly = screen.getByRole('option', { name: 'Yearly' });

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).toHaveAttribute('aria-controls', listbox.id);
    expect(monthly).toHaveAttribute('aria-selected', 'true');
    expect(yearly).toHaveAttribute('aria-disabled', 'true');

    act(() => {
      jest.runOnlyPendingTimers();
    });
  });
});
