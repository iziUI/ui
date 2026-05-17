export { default as Modal } from './Modal';
export { default as ModalFooter } from './ModalFooter';
export { default as useModal } from './useModal';

export * from './Modal';
export * from './ModalFooter';
export * from './useModal';

export type HelperModalProps<T = unknown> = {
  isOpen: boolean;
  onToggle: () => void;
} & T;