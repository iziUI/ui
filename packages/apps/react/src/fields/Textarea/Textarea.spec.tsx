import { userEvent } from '@storybook/test';

import { fireEvent, render, screen } from '@/test/render';

import Textarea from './Textarea';

describe('Textarea', () => {
  it('accepts text and reports changes', () => {
    const onChange = jest.fn();

    render(<Textarea label="Message" placeholder="Write a message" onChange={onChange} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });

    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(textarea).toHaveValue('Hello world');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('prevents input when disabled', () => {
    render(<Textarea disabled placeholder="Write a message" />);

    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('relates label, description, and error state to its control', async () => {
    const user = userEvent.setup();

    render(
      <Textarea
        id="message"
        label="Message"
        helperText="Describe your request"
        error
        aria-describedby="external-help external-help"
      />
    );

    const textarea = screen.getByLabelText('Message');
    const helperText = screen.getByText('Describe your request');

    await user.click(screen.getByText('Message'));

    expect(textarea).toHaveFocus();
    expect(textarea).toHaveAttribute('id', 'message');
    expect(helperText).toHaveAttribute('id');
    expect(textarea.getAttribute('aria-describedby')?.split(' ')).toEqual([
      'external-help',
      helperText.id,
    ]);
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps generated field relationships after rerender', () => {
    const { rerender } = render(
      <Textarea label="Message" helperText="Describe your request" aria-describedby="external-help" />
    );

    const textarea = screen.getByLabelText('Message');
    const helperText = screen.getByText('Describe your request');
    const generatedId = textarea.id;

    expect(generatedId).not.toBe('');
    expect(textarea).toHaveAttribute('aria-describedby', `external-help ${helperText.id}`);

    rerender(<Textarea label="Message" helperText="Describe your request" aria-describedby="external-help" />);

    const rerenderedTextarea = screen.getByLabelText('Message');
    const rerenderedHelperText = screen.getByText('Describe your request');

    expect(rerenderedTextarea).toHaveAttribute('id', generatedId);
    expect(rerenderedTextarea).toHaveAttribute(
      'aria-describedby',
      `external-help ${rerenderedHelperText.id}`
    );
  });

  it('preserves consumer aria-invalid when error is false', () => {
    render(<Textarea label="Message" aria-invalid="grammar" />);

    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'grammar');
  });
});
