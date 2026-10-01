import { userEvent } from '@storybook/test';

import { act, render, screen, fireEvent } from '@/test/render';

import Checkbox from '../Checkbox/Checkbox';
import CheckboxGroup from './CheckboxGroup';

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

  it('omits legend when no label is provided', () => {
    const { container } = render(
      <CheckboxGroup>
        <Checkbox name="opt1" label="Option 1" />
      </CheckboxGroup>
    );

    expect(container.querySelector('legend')).not.toBeInTheDocument();
  });

  it('relates label, description, error state, names, and selected values to its group', () => {
    const onChange = jest.fn();

    render(
      <CheckboxGroup
        id="notification-settings"
        label="Notification settings"
        helperText="Choose every notification you want"
        error
        onChange={onChange}
      >
        <Checkbox name="email" label="Email" value="email" />
        <Checkbox name="sms" label="SMS" value="sms" />
      </CheckboxGroup>
    );

    const group = screen.getByRole('group', { name: 'Notification settings' });
    const helperText = screen.getByText('Choose every notification you want');
    const email = screen.getByRole('checkbox', { name: 'Email' });
    const sms = screen.getByRole('checkbox', { name: 'SMS' });

    expect(group).toHaveAttribute('id', 'notification-settings');
    expect(helperText).toHaveAttribute('id');
    expect(group).toHaveAttribute('aria-describedby', helperText.id);
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAttribute('name', expect.stringMatching(/^email-\d+$/));
    expect(sms).toHaveAttribute('name', expect.stringMatching(/^sms-\d+$/));

    fireEvent.click(email);

    expect(onChange).toHaveBeenCalledWith([
      { id: 'email', value: 'email', checked: true },
      { id: 'sms', value: 'sms', checked: false },
    ]);
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

  it('moves focus between checkboxes with Tab and changes the focused checkbox with Space', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <CheckboxGroup onChange={onChange}>
        <Checkbox name="opt1" label="Option 1" />
        <Checkbox name="opt2" label="Option 2" />
      </CheckboxGroup>
    );

    const [firstCheckbox, secondCheckbox] = screen.getAllByRole('checkbox');

    await user.tab();
    expect(firstCheckbox).toHaveFocus();

    await act(async () => {
      await user.keyboard(' ');
    });
    expect(onChange).toHaveBeenCalledTimes(1);

    await user.tab();
    expect(secondCheckbox).toHaveFocus();
  });
});
