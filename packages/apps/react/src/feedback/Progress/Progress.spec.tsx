import { render, screen } from '@/test/render';

import Progress from './Progress';

describe('Progress', () => {
  it('renders successfully', () => {
    const { container } = render(<Progress percent={50} />);

    expect(container.querySelector('.iziui-progress')).toBeInTheDocument();
  });

  it.each([
    [-1, 0],
    [50, 50],
    [101, 100],
  ])('exposes clamped ARIA value %i for percent %i', (percent, ariaValue) => {
    render(<Progress percent={percent} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemin', '0');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(ariaValue));
  });
});
