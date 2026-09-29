import { render } from '@/test/render';

import Toast from './Toast';

describe('Toast', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Toast color="success" message="message here" onRemove={() => ''} />
    );
    expect(container.querySelector('.iziui-toast')).toBeInTheDocument();
  });
});
