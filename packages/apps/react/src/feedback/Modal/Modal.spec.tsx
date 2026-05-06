import { render } from '@testing-library/react';

import Modal from './Modal';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Modal', () => {
  it('renders successfully', () => {
    const { container } = render(<Modal />);
    expect(container.querySelector('.iziui-modal')).toBeInTheDocument();
  });
});
