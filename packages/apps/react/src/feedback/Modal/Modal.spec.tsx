import { render } from '@/test/render';
import Button from '@/actions/Button';
import { Typography } from '@/display';

import Modal from './Modal';
import ModalFooter from './ModalFooter';

describe('Modal', () => {
  it('renders successfully', () => {
    const { container } = render(
      <Modal
        isOpen
        title={<Typography variant="h6">Title</Typography>}
        subtitle={<Typography variant="subtitle2" weight="normal">Subtitle</Typography>}
        onClose={() => ''}
      >
        <ModalFooter>
          <Button variant="text" color="primary">
            Cancel
          </Button>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
    expect(container.querySelector('.iziui-modal')).toBeInTheDocument();
  });
});
