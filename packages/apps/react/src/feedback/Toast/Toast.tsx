import { useEffect, useMemo, useRef, type FocusEvent, type HTMLAttributes, type MouseEvent } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';
import { Colors } from '@iziui/core/theme';

import createComponent from '@/core/createComponent';
import { useTheme } from '@/theme';

import Alert from '../Alert';

import '@iziui/styles/components/Toast.scss';

type Icon = React.JSX.Element;
type Message = React.JSX.Element | string;

export type PickedToast = Pick<ToastProps,
  | 'id'
  | 'icon'
  | 'color'
  | 'message'
  | 'delay'
  | 'visible'
>

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  icon?: Icon;
  color: Colors;
  message: Message;
  delay?: number;
  visible?: boolean;
  onRemove: (id: string) => void;
};

function Toast({
  id,
  color,
  message,
  icon,
  delay = 2500,
  onRemove,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ToastProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFocusedRef = useRef(false);
  const isHoveredRef = useRef(false);

  const { theme: { mode } } = useTheme();

  const className = joinClass(
    `${prefix}-toast`,
    props.className
  );
  const announcementRole = useMemo(() => {
    if (color === 'error') { return 'alert'; }

    return 'status';
  }, [color]);

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, []);

  const handleRemove = () => {
    if (!id) { return; }
    onRemove(id);
  };

  const startTimer = () => {
    if (timeoutRef.current) { return; }

    timeoutRef.current = setTimeout(() => { handleRemove(); }, delay);
  };

  const clearTimer = () => {
    if (!timeoutRef.current) { return; }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  const resumeTimer = () => {
    if (isFocusedRef.current || isHoveredRef.current) { return; }
    startTimer();
  };

  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (onFocus) { onFocus(event); }
    if (event.currentTarget.contains(event.relatedTarget as Node)) { return; }

    isFocusedRef.current = true;
    clearTimer();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (onBlur) { onBlur(event); }
    if (event.currentTarget.contains(event.relatedTarget as Node)) { return; }

    isFocusedRef.current = false;
    resumeTimer();
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (onMouseEnter) { onMouseEnter(event); }

    isHoveredRef.current = true;
    clearTimer();
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (onMouseLeave) { onMouseLeave(event); }

    isHoveredRef.current = false;
    resumeTimer();
  };

  return (
    <Alert
      {...props}
      role={announcementRole}
      className={className}
      icon={icon}
      sx={{
        backgroundColor: ({ text }) => text.primary,
        color: (palette) => palette[color][mode]
      }}
      onClose={handleRemove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {message}
    </Alert>
  );
}

export default createComponent(Toast);
