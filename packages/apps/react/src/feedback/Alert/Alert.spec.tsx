import { render, screen } from '@/test/render';

import Alert from './Alert';

describe('Alert', () => {
  it('uses status role by default', () => {
    render(<Alert>Saved changes</Alert>);

    expect(screen.getByRole('status')).toHaveTextContent('Saved changes');
  });

  it('preserves caller role and names close control', () => {
    render(<Alert role="alert" onClose={jest.fn()}>Connection lost</Alert>);

    expect(screen.getByRole('alert')).toHaveTextContent('Connection lost');
    expect(screen.getByRole('button', { name: 'Close alert' })).toBeInTheDocument();
  });
});
