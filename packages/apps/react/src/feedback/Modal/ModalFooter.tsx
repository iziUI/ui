
import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';

interface ModalFooterProps { children: React.ReactNode; }

function ModalFooter({ children }: ModalFooterProps) {
  return (
    <Stack flexDirection="row" justifyContent="flex-end" alignItems="center">
      {children}
    </Stack>
  );
}

export default createComponent(ModalFooter);