import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Button from '@/actions/Button';
import Typography from '@/display/Typography';

import Modal from './Modal';
import useModal from './useModal';
import ModalFooter from './ModalFooter';

export const Template: StoryObj<typeof Modal> = {
  render: () => {
    const [isOpen, toggleModal] = useModal();

    return (
      <>
        <Button onClick={toggleModal}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          title={<Typography variant="h6">Title</Typography>}
          subtitle={<Typography variant="subtitle2" weight="normal">Subtitle</Typography>}
          onClose={toggleModal}
        >
          <ModalFooter>
            <Button variant="text" color="primary" onClick={toggleModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
};

export const Playground: StoryObj<typeof Modal> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Todo: Modal description',
      tag: (
        <Chip
          label="Feedback"
          color="success"
          icon={<Icon name="feedback" />}
        />
      ),
    },
  },
};

export default meta;
