import { HtmlHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import Stack from '@/layout/Stack';
import ButtonIcon from '@/actions/ButtonIcon';
import Icon from '@/display/Icon';

import createComponent from '../../core/createComponent';

interface DrawerHeaderProps extends HtmlHTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

function DrawerHeader({ children, onClose, ...props }: DrawerHeaderProps) {
  const cls = joinClass(
    `${prefix}-drawer__header`,
    props.className
  );

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      {...props}
      className={cls}
    >
      {children}
      {
        onClose && (
          <ButtonIcon
            onClick={onClose}
            color="primary"
            aria-label="Fechar"
            data-testid="drawer-close-button"
          >
            <Icon name="times" />
          </ButtonIcon>
        )
      }
    </Stack>
  );
}

export default createComponent(DrawerHeader);