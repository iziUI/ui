import { render, screen, fireEvent } from '@testing-library/react';

import Checkbox from '../Checkbox/Checkbox';
import CheckboxGroup from './CheckboxGroup';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

jest.mock('@iziui/toolkit/uuid', () => ({
  uuid: () => 'test-uuid',
}));

describe('CheckboxGroup', () => {
  it('renders successfully', () => {
    render(
      <CheckboxGroup>
        <Checkbox name="opt1" label="Option 1" />
        <Checkbox name="opt2" label="Option 2" />
      </CheckboxGroup>
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('renders children labels', () => {
    render(
      <CheckboxGroup>
        <Checkbox name="opt1" label="Option 1" />
        <Checkbox name="opt2" label="Option 2" />
      </CheckboxGroup>
    );
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('marks initial checked values', () => {
    render(
      <CheckboxGroup values={['opt1']}>
        <Checkbox name="opt1" label="Option 1" />
        <Checkbox name="opt2" label="Option 2" />
      </CheckboxGroup>
    );
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('calls onChange when a checkbox is toggled', () => {
    const onChange = jest.fn();
    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox name="opt1" label="Option 1" />
        <Checkbox name="opt2" label="Option 2" />
      </CheckboxGroup>
    );
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
