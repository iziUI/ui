import { useEffect, useRef, type HTMLAttributes } from 'react';

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

function Toast({ id, color, message, icon, delay = 2500, onRemove, ...props }: ToastProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { theme: { mode } } = useTheme();

  const className = joinClass(
    `${prefix}-toast`,
    props.className
  );

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, []);

  const handleRemove = () => {
    if (!id) { return; }
    onRemove(id);
  };

  const startTimer = () => {
    timeoutRef.current = setTimeout(() => { handleRemove(); }, delay);
  };

  const clearTimer = () => {
    if (!timeoutRef.current) { return; }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  return (
    <Alert
      className={className}
      icon={icon}
      sx={{
        backgroundColor: ({ text }) => text.primary,
        color: (palette) => palette[color][mode]
      }}
      onClose={handleRemove}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
    >
      {message}
    </Alert>
  );
}

export default createComponent(Toast);
