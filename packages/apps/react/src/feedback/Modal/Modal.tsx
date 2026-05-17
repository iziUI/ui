import { useEffect, useRef, useState, type HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core/createComponent';
import { Card, CardContent } from '@/display/Card';
import Stack from '@/layout/Stack';
import ButtonIcon from '@/actions/ButtonIcon';
import Icon from '@/display/Icon';

import '@iziui/styles/components/Modal.scss';

type AnimationClass = 'show' | 'hide';
type Config = { animation: AnimationClass, visible: boolean };

export interface ModalProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.JSX.Element;
  subtitle?: React.JSX.Element;
}

function Modal({ children, title, subtitle, isOpen, onClose, ...props }: ModalProps) {
  const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ANIMATION_DURATION = 300;

  const className = joinClass(
    `${prefix}-modal`,
    `${prefix}-modal--${config.animation}`
  );
  const classNameContent = joinClass(
    `${prefix}-modal__content`,
    props.className
  );
  const backdropClassName = joinClass(
    `${prefix}-modal__backdrop`,
    `${prefix}-modal__backdrop--${config.animation}`
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
    } else {
      handleClose();
    }

    return () => {
      if (!timeoutRef.current) { return; }
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [isOpen]);

  const handleOpen = () => {
    setConfig(prev => ({ ...prev, visible: true }));
    timeoutRef.current = setTimeout(() => {
      setConfig(prev => ({ ...prev, animation: 'show' }));
      document.body.style.overflow = 'hidden';
    }, 100);
  };

  const handleClose = () => {
    setConfig(prev => ({ ...prev, animation: 'hide' }));
    timeoutRef.current = setTimeout(() => {
      setConfig(prev => ({ ...prev, visible: false }));
      document.body.style.overflow = '';
    }, ANIMATION_DURATION);
  };

  return (
    config.visible && (
      <div className={backdropClassName} onClick={onClose}>
        <div className={`${prefix}-modal__container`}>
          <Card className={className}>
            <CardContent onClick={(e) => e.stopPropagation()}>
              <Stack
                alignItems="center"
                flexDirection="row"
                justifyContent="space-between"
                style={{ flexWrap: 'nowrap' }}
              >
                <div>
                  {title}
                  {subtitle}
                </div>
                <ButtonIcon color="grey" onClick={onClose}>
                  <Icon name="times" />
                </ButtonIcon>
              </Stack>
              <div
                {...props}
                className={classNameContent}
              >
                {children}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}

export default createComponent(Modal);
