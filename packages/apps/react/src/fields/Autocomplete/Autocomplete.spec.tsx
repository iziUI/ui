import { render, screen } from '@testing-library/react';

import Autocomplete from './Autocomplete';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Autocomplete', () => {
  it('renders successfully', () => {
    render(<Autocomplete />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
