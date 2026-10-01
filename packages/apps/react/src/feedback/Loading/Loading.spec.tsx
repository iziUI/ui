import { render, screen } from '@/test/render';

import Loading from './Loading';

describe('Loading', () => {
  it('uses a named status role by default', () => {
    render(<Loading />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('preserves caller accessible name', () => {
    render(<Loading aria-label="Loading account data" />);

    expect(screen.getByRole('status', { name: 'Loading account data' })).toBeInTheDocument();
  });
});
