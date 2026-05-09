import { useEffect, useState, type HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import Stack from '@/layout/Stack';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Drawer.scss';

type Direction = 'right' | 'left' | 'bottom';
type AnimationClass = 'show' | 'hide';
type Config = { animation: AnimationClass; visible: boolean };

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  direction?: Direction;
  body: React.JSX.Element;
  header?: React.JSX.Element;
  footer?: React.JSX.Element;
  onClose: () => void;
};

function Drawer({
  open,
  header,
  body,
  footer,
  direction = 'right',
  onClose,
  ...props
}: DrawerProps) {
  const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });

  const ANIMATION_DURATION = 300;

  const cls = joinClass(
    `${prefix}-drawer`,
    props.className
  );

  const contentCls = joinClass(
    `${prefix}-drawer__content`,
    `${prefix}-drawer__content--${direction}`,
    `${prefix}-drawer__content--${direction}--${config.animation}`,
  );

  const overlayCls = joinClass(
    `${prefix}-drawer__overlay`,
    `${prefix}-drawer__overlay--${config.animation}`,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      timer = handleOpen();
      return;
    }

    timer = handleClose();

    return () => {
      clearTimeout(timer);
    };
  }, [open]);

  const handleOpen = () => {
    setConfig(prev => ({ ...prev, visible: true }));

    return setTimeout(() => {
      setConfig(prev => ({ ...prev, animation: 'show' }));
      document.body.style.overflow = 'hidden';
    }, 100);
  };

  const handleClose = () => {
    setConfig(prev => ({ ...prev, animation: 'hide' }));

    return setTimeout(() => {
      setConfig(prev => ({ ...prev, visible: false }));
      document.body.style.overflow = '';
    }, ANIMATION_DURATION);
  };

  return (
    config.visible && (
      <div {...props} className={cls}>
        <Stack className={contentCls}>
          {header}
          {body}
          {footer}
        </Stack>
        <div
          data-testid="drawer-overlay"
          className={overlayCls}
          onClick={onClose}
        />
      </div>
    )
  );
}

export default createComponent(Drawer);
