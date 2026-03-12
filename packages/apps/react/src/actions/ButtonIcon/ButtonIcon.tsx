import { cloneElement, type ButtonHTMLAttributes, type PropsWithChildren, type ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors, Size } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';
import { convertPathToColor } from '@iziui/core/utils/convertPathToColor';

import type { IconProps } from '@/display/Icon';
import { useTheme } from '@/theme';
import Ripple from '@/actions/Ripple';
import createComponent from '@/core/createComponent';

import '@iziui/styles/components/ButtonIcon.scss';

export interface ButtonIconProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  color?: Colors;
  size?: Size;
  children: ReactElement<IconProps>;
};
function ButtonIcon({ children, size = 'medium', color = 'primary', ...props }: ButtonIconProps) {
  const { theme: { palette } } = useTheme();

  const classess = joinClass(
    `${prefix}-button-icon`,
    size && `${prefix}-button-icon--${size}`,
    color && `${prefix}-button-icon--${color}`,
    props.className
  );

  const c = convertPathToColor(color, palette);

  const renderIcon = (icon: ReactElement<IconProps>) => {
    return cloneElement(icon, {
      size,
      ...icon.props,
      style: { color: 'currentColor' }
    });
  };

  return (
    <button
      {...props}
      className={classess}
      style={{ color: c, ...props.style, }}
    >
      {renderIcon(children)}
      <Ripple />
    </button>
  );
}

export default createComponent(ButtonIcon);