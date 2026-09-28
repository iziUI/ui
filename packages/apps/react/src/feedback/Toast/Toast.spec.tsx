import { render } from '@testing-library/react';

import Toast from './Toast';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Toast', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Toast color="success" message="message here" onRemove={() => ''} />
    );
    expect(container.querySelector('.iziui-toast')).toBeInTheDocument();
  });
});
