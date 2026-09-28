import { fireEvent, render, screen } from '@testing-library/react';

import Textarea from './Textarea';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

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
});
