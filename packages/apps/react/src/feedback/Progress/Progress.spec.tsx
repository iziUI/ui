import { render } from '@/test/render';

import Progress from './Progress';

describe('Progress', () => {
  it('renders successfully', () => {
    const { container } = render(<Progress percent={50} />);

    expect(container.querySelector('.iziui-progress')).toBeInTheDocument();
  });
});
