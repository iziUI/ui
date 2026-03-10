import { cloneElement, type ButtonHTMLAttributes, type PropsWithChildren, type ReactElement } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors, Size } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';
import { convertPathToColor } from '@iziui/core/utils/convertPathToColor';

import type { IconProps } from '@/display/Icon';
import { useTheme } from '@/theme';
import Ripple from '@/components/Ripple';
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
    const aa: IconProps = {
      size,
      ...icon.props,
      style: { color: 'currentColor' }
    };

    console.log('>>> aa', aa);
    return cloneElement(icon, aa);
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