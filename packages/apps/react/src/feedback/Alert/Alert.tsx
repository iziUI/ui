import { cloneElement, type HtmlHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import type { Colors } from '@iziui/core/theme';
import { joinClass } from '@iziui/core/utils/joinClass';

import { useTheme } from '@/theme';
import Stack from '@/layout/Stack';
import Typography from '@/display/Typography';
import ButtonIcon from '@/actions/ButtonIcon';
import createComponent from '@/core/createComponent';
import Icon, { type IconProps } from '@/display/Icon';

import '@iziui/styles/components/Alert.scss';

export interface AlertProps extends HtmlHTMLAttributes<HTMLDivElement> {
  color?: Colors;
  icon?: React.JSX.Element;
  children: React.ReactNode;
  onClose?: () => void;
}

function Alert({
  children,
  icon,
  color = 'primary',
  onClose,
  ...props
}: AlertProps) {
  const { theme: { mode } } = useTheme();

  const className = joinClass(
    `${prefix}-alert`,
    `${prefix}-alert--${mode}`,
    `${prefix}-alert--${color}`,
    props.className
  );

  const classNameAction = joinClass(
    `${prefix}-alert__button`,
    `${prefix}-alert__button--${color}`,
  );

  const renderMessage = () => {
    if (typeof children === 'string') {
      return (
        <Typography variant="body1" style={{ color: 'currentcolor' }}>
          {children}
        </Typography>
      );
    }

    return children;
  };

  const renderIcon = (icon: React.JSX.Element) => {
    return cloneElement<IconProps>(icon, {
      color: `${color}.dark`
    });
  };

  return (
    <Stack
      fullWidth
      gap={0}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...props}
      className={className}
    >
      <Stack
        fullWidth
        gap={8}
        flexDirection="row"
        alignItems="center"
        className={`${prefix}-alert__content`}
      >
        {icon && renderIcon(icon)}
        {renderMessage()}
      </Stack>
      {
        onClose && (
          <div>
            <ButtonIcon
              className={classNameAction}
              onClick={onClose}
              color={color}
              style={{ color: 'currentColor' }}
            >
              <Icon name="times" />
            </ButtonIcon>
          </div>)
      }
    </Stack>
  );
}

export default createComponent(Alert);