import { render, screen } from '@testing-library/react';

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

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Autocomplete', () => {
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
});
