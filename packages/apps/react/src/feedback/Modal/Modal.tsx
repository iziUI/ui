import { useEffect, useId, useMemo, useRef, useState, type HTMLAttributes, type KeyboardEvent } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import Icon from '@/display/Icon';
import Stack from '@/layout/Stack';
import ButtonIcon from '@/actions/ButtonIcon';
import createComponent from '@/core/createComponent';
import useAccessibleDialog from '@/hooks/useAccessibleDialog';
import { Card, CardContent } from '@/display/Card';

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

function Modal({
  children,
  title,
  subtitle,
  isOpen,
  onClose,
  onKeyDown: onModalKeyDown,
  ...props
}: ModalProps) {
  const [config, setConfig] = useState<Config>({ visible: false, animation: 'hide' });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ANIMATION_DURATION = 300;
  const titleId = useId();
  const { dialogRef, onKeyDown } = useAccessibleDialog({
    open: config.visible,
    onClose,
    restoreAfterClose: !config.visible,
  });
  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];
  const [resolvedAriaLabel, resolvedAriaLabelledBy] = useMemo(() => {
    if (!title || ariaLabelledBy) { return [ariaLabel, ariaLabelledBy]; }

    return [ariaLabel, titleId];
  }, [ariaLabel, ariaLabelledBy, title, titleId]);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onModalKeyDown) { onModalKeyDown(event); }

    onKeyDown(event);
  };

  return (
    config.visible && (
      <div className={backdropClassName} onClick={onClose}>
        <div className={`${prefix}-modal__container`}>
          <Card className={className}>
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={resolvedAriaLabel}
              aria-labelledby={resolvedAriaLabelledBy}
              tabIndex={-1}
              onKeyDown={handleKeyDown}
            >
              <CardContent onClick={(e) => e.stopPropagation()}>
                <Stack
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="space-between"
                  style={{ flexWrap: 'nowrap' }}
                >
                  <div>
                    {title && <div id={titleId}>{title}</div>}
                    {subtitle}
                  </div>
                  <ButtonIcon color="grey" aria-label="Close modal" onClick={onClose}>
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
            </div>
          </Card>
        </div>
      </div>
    )
  );
}

export default createComponent(Modal);
