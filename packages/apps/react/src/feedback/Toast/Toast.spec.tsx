import { render } from '@testing-library/react';

import Toast from './Toast';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Toast', () => {
  it('renders successfully', () => {
    const { container } = render(<Toast />);
    expect(container.querySelector('.iziui-toast')).toBeInTheDocument();
  });
});
