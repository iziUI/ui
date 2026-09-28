import { render } from '@testing-library/react';

import Progress from './Progress';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Component: unknown) => Component,
}));

describe('Progress', () => {
  it('renders successfully', () => {
    const { container } = render(<Progress />);

    expect(container.querySelector('.iziui-progress')).toBeInTheDocument();
  });
});
