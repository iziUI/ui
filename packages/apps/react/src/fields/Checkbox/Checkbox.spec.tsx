import { userEvent } from '@storybook/test';

import { render, screen, fireEvent } from '@/test/render';

import Checkbox from './Checkbox';

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

  it('uses name as its identifier without consumer ID', () => {
    render(
      <Checkbox
        checked={false}
        name="terms"
        label="Accept terms"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toHaveAttribute('id', 'terms');
  });

  it('relates custom identifier, description, and error state to its control', () => {
    render(
      <Checkbox
        id="accept-terms"
        checked={false}
        name="terms"
        label="Accept terms"
        helperText="Required to continue"
        error
        onChange={jest.fn()}
      />
    );

    const checkbox = screen.getByLabelText('Accept terms');
    const helperText = screen.getByText('Required to continue');

    expect(checkbox).toHaveAttribute('id', 'accept-terms');
    expect(helperText).toHaveAttribute('id');
    expect(checkbox).toHaveAttribute('aria-describedby', helperText.id);
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
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

  it('receives focus with Tab and reports Space selection', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<Checkbox name="terms" label="Accept terms" onChange={onChange} />);

    await user.tab();
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toHaveFocus();

    await user.keyboard(' ');
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
