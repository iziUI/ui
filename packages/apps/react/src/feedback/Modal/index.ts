export { default } from './Modal';
export type { ModalProps } from './Modal';
export type { ModalFooterProps } from './ModalFooter';

export type HelperModalProps<T = unknown> = {
  isOpen: boolean;
  onToggle: () => void;
} & T;
