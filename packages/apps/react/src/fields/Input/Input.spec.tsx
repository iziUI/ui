import { userEvent } from '@storybook/test';

import { render, screen } from '@/test/render';

import Input from './Input';

describe('Input', () => {
  it('relates label, description, and error state to its control', async () => {
    const user = userEvent.setup();

    render(
      <Input
        id="email"
        label="Email"
        helperText="Enter your email address"
        error
        aria-describedby="external-help external-help"
      />
    );

    const input = screen.getByLabelText('Email');
    const helperText = screen.getByText('Enter your email address');

    await user.click(screen.getByText('Email'));

    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('id', 'email');
    expect(helperText).toHaveAttribute('id');
    expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual([
      'external-help',
      helperText.id,
    ]);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps generated field relationships after rerender', () => {
    const { rerender } = render(
      <Input label="Email" helperText="Enter your email address" aria-describedby="external-help" />
    );

    const input = screen.getByLabelText('Email');
    const helperText = screen.getByText('Enter your email address');
    const generatedId = input.id;

    expect(generatedId).not.toBe('');
    expect(input).toHaveAttribute('aria-describedby', `external-help ${helperText.id}`);

    rerender(<Input label="Email" helperText="Enter your email address" aria-describedby="external-help" />);

    const rerenderedInput = screen.getByLabelText('Email');
    const rerenderedHelperText = screen.getByText('Enter your email address');

    expect(rerenderedInput).toHaveAttribute('id', generatedId);
    expect(rerenderedInput).toHaveAttribute('aria-describedby', `external-help ${rerenderedHelperText.id}`);
  });

  it('preserves consumer aria-invalid when error is false', () => {
    render(<Input label="Email" aria-invalid="grammar" />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'grammar');
  });
});
