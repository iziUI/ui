import { cloneElement, forwardRef, HTMLAttributes, MouseEvent } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors, Size } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import type { IconProps } from '@/display/Icon';
import Ripple from '@/components/Ripple';
import createComponent from '@/core/createComponent';

import './Chip.scss';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  label: string;
  size?: Size;
  color?: Colors | 'default';
  variant?: 'contained' | 'outlined';
  icon?: React.JSX.Element;
  onDelete?: () => void;
};
const Chip = forwardRef<HTMLElement, ChipProps>(({
  label,
  icon,
  size = 'medium',
  color = 'default',
  variant = 'contained',
  onDelete,
  ...props
}: ChipProps) => {
  const clss = joinClass(
    `${prefix}-chip`,
    `${prefix}-chip--${color}`,
    `${prefix}-chip--${color}--${variant}`,
    `${prefix}-chip--${size}`,
    onDelete && `${prefix}-chip--deletable`,
    props.onClick && `${prefix}-chip--clickable`,
    props.className
  );

  const renderIcon = (icon: React.JSX.Element) => {
    return cloneElement<IconProps>(icon, {
      size: 'small',
      className: joinClass(
        icon.props.className,
        `${prefix}-chip__icon`,
        label && `${prefix}-chip__icon--margin`,
      ),
    });
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    if (onDelete) { onDelete(); }
  };

  return (
    <div {...props} className={clss} style={{ ...props.style }}>
      {icon && renderIcon(icon)}
      <span>{label}</span>
      {props.onClick && <Ripple />}
      {
        onDelete && (
          <button className={`${prefix}-chip__delete-icon`} onClick={handleDelete}>
            <i className="uil uil-times-circle"></i>
            <Ripple />
          </button>
        )
      }
    </div>
  );
});

export default createComponent(Chip);
