import { useContext } from 'react';

import { ToastContext } from './ToastProvider';

export default function useToast() {
  const { add } = useContext(ToastContext);

  return { addToast: add };
}