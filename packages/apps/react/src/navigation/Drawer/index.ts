export { default } from './Drawer';
export type { DrawerDirection, DrawerProps } from './Drawer';
export type { DrawerContentProps } from './DrawerContent';
export type { DrawerFooterProps } from './DrawerFooter';
export type { DrawerHeaderProps } from './DrawerHeader';

export type HelperDrawerProps<T = unknown> = {
  isOpen: boolean;
  onToggle: () => void;
} & T;
