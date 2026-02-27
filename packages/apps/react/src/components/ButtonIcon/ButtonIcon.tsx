import { cloneElement, type ButtonHTMLAttributes, type PropsWithChildren, type ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { MappedColors, Size } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';
import { convertPathToColor } from '@iziui/core/utils/convertPathToColor';

import type { IconProps } from '@/components/Icon';
import { useTheme } from '@/theme';
import Ripple from '@/components/Ripple';
import createComponent from '@/core/createComponent';

import '@iziui/styles/components/ButtonIcon.scss';

export interface ButtonIconProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  color?: MappedColors;
  size?: Size;
  children: ReactElement<IconProps>;
};
function ButtonIcon({ children, size = 'medium', color = 'primary.main', ...props }: ButtonIconProps) {
  const { theme: { palette } } = useTheme();

  const classess = joinClass(
    `${prefix}-button-icon`,
    color && `${prefix}-button-icon--${color.split('.')[0]}`,
    props.className
  );

  const c = convertPathToColor(color, palette);

  const renderIcon = (icon: ReactElement<IconProps>) => {
    return cloneElement(icon, {
      color: color || icon.props.color,
      size,
    });
  };

  return (
    <button
      {...props}
      className={classess}
      style={{ ...props.style, color: c }}
    >
      {renderIcon(children)}
      <Ripple />
    </button>
  );
}

export default createComponent(ButtonIcon);