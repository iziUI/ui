import { HTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';
import type { Colors } from '@iziui/core/theme';

import { getInitials } from '@iziui/toolkit/string';

import Ripple from '@/actions/Ripple';
import createComponent from '@/core/createComponent';

import Icon from '../Icon';
import Typography from '../Typography';

import '@iziui/styles/components/Avatar.scss';

interface AvatarProps extends HTMLAttributes<HTMLElement> {
  alt?: string;
  src?: string;
  name?: string;
  size?: number;
  color?: Colors;
  variant?: 'rounded' | 'circular';
  icon?: React.JSX.Element;
}
function Avatar({
  src,
  alt,
  name,
  size = 40,
  variant = 'circular',
  color = 'primary',
  icon,
  ...props
}: AvatarProps) {
  const className = joinClass(
    `${prefix}-avatar`,
    `${prefix}-avatar--${variant}`,
    `${prefix}-avatar--${color}`,
    src && `${prefix}-avatar--image`,
    name && `${prefix}-avatar--name`,
    (!src && !name) || icon && `${prefix}-avatar--icon`,
    props.onClick && `${prefix}-avatar--clickable`,
    props.className
  );

  const content = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          sizes="100vw"
          loading="lazy"
          style={{ width: '100%', height: 'auto' }}
        />
      );
    }
    if (name) {
      return (
        <Typography
          style={{
            fontSize: size / 2,
            color: 'currentColor'
          }}
        >
          {getInitials(name)}
        </Typography>
      );
    }

    if (icon) { return icon; }

    return (
      <Icon name="user" size={size / 1.6} style={{ color: 'currentColor' }} />
    );
  };

  return (
    <div {...props} style={{ width: size, height: size, ...props.style }} className={className}>
      {content()}
      {props.children}
      {props.onClick && <Ripple />}
    </div>
  );
}

export default createComponent(Avatar);