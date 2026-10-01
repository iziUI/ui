import { userEvent } from '@storybook/test';

import { act, render, screen } from '@/test/render';
import { Icon } from '@/display';

import Autocomplete from './Autocomplete';
import AutocompleteButton from './AutocompleteButton';

type Option = {
  firstName: string;
  lastName: string;
  age: number;
};

const OPTIONS: Option[] = [
  { firstName: 'Michael', lastName: 'Scott', age: 45, },
  { firstName: 'Jim', lastName: 'Halpert', age: 31, },
  { firstName: 'Pam', lastName: 'Beesly', age: 30, },
  { firstName: 'Dwight', lastName: 'Schrute', age: 38, },
  { firstName: 'Ryan', lastName: 'Howard', age: 27, },
  { firstName: 'Kelly', lastName: 'Kapoor', age: 28, },
  { firstName: 'Angela', lastName: 'Martin', age: 37, },
  { firstName: 'Kevin', lastName: 'Malone', age: 40, },
  { firstName: 'Oscar', lastName: 'Martinez', age: 38, },
  { firstName: 'Stanley', lastName: 'Hudson', age: 52, },
  { firstName: 'Michael', lastName: 'Jordan', age: 64, },
];

describe('Autocomplete', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders successfully', () => {
    render(
      <Autocomplete
        label="Label"
        placeholder="Digite aqui..."
        helperText="helperText"
        startIcon={<Icon name="search" color="grey" />}
        options={OPTIONS}
        value={OPTIONS[1]}
        onChange={() => ''}
        filterOptions={({ age }) => age > 54}
        renderOption={(option) => (
          <AutocompleteButton
            key={option.firstName}
            value={option}
          >
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('relates label, description, and error state to its combobox', () => {
    render(
      <Autocomplete
        id="employee"
        label="Employee"
        helperText="Search by name"
        error
        aria-describedby="external-help external-help"
        options={OPTIONS}
        onChange={() => undefined}
        renderOption={(option) => (
          <AutocompleteButton key={option.firstName} value={option}>
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );

    const input = screen.getByLabelText('Employee');
    const helperText = screen.getByText('Search by name');

    expect(input).toHaveAttribute('id', 'employee');
    expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual([
      'external-help',
      helperText.id,
    ]);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('skips disabled options and closes after keyboard selection', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();
    const options = [
      { firstName: 'Unavailable', lastName: 'Employee', age: 0, disabled: true },
      { firstName: 'Available', lastName: 'Employee', age: 1, disabled: false },
    ];

    render(
      <Autocomplete
        label="Employee"
        options={options}
        onChange={onChange}
        renderOption={(option) => (
          <AutocompleteButton key={option.firstName} value={option} disabled={option.disabled}>
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );

    const input = screen.getByRole('combobox');

    await act(async () => {
      await user.click(input);
      await user.keyboard('{ArrowDown}');
    });

    const availableOption = screen.getByRole('option', { name: 'Available Employee' });
    expect(input).toHaveAttribute('aria-activedescendant', availableOption.id);

    await act(async () => {
      await user.keyboard('{Enter}');
    });

    expect(onChange).toHaveBeenCalledWith(options[1]);
    expect(input).toHaveAttribute('aria-expanded', 'false');

    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('closes on Escape and keeps focus on its input', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Autocomplete
        label="Employee"
        options={OPTIONS}
        onChange={() => undefined}
        renderOption={(option) => (
          <AutocompleteButton key={option.firstName} value={option}>
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );

    const input = screen.getByRole('combobox');

    await act(async () => {
      await user.click(input);
    });
    expect(input).toHaveAttribute('aria-expanded', 'true');

    await act(async () => {
      await user.keyboard('{Escape}');
    });

    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveFocus();

    act(() => {
      jest.runOnlyPendingTimers();
    });
  });
});
