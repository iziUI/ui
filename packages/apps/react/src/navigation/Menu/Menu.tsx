import {
  useMemo,
  useState,
  useEffect,
  Children,
  forwardRef,
  type ReactElement,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  cloneElement
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';

import { uuid } from '@iziui/toolkit/uuid';
import { debounce } from '@iziui/toolkit/debounce';

import useListenerResized from '@/hooks/useListenerResized';
import { Card, CardContent } from '@/display/Card';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Menu.scss';

export type MenuDirection = 'left' | 'right' | 'center';
export type MenuPosition = 'top' | 'bottom';
type AnimationClass = 'open' | 'close';
type State = 'visible' | 'invisible';
type Coordinates = { top?: number; right?: number; bottom?: number; left?: number; };
type Config = { animation: AnimationClass, state: State; width: CSSProperties['width'] };

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  autoClose?: boolean;
  maxHeight?: CSSProperties['maxHeight'];
  direction?: MenuDirection;
  position?: MenuPosition;
  anchorEl: HTMLElement | null;
  width?: CSSProperties['width'];
  onClose: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({
  open,
  width,
  children,
  anchorEl,
  direction = 'left',
  position = 'bottom',
  maxHeight = 150,
  autoClose,
  onClose,
  id: providedId,
  role,
  onKeyDown,
  ...props
}: MenuProps, ref) {
  const [coordinate, setCoordinate] = useState<Coordinates>();
  const [config, setConfig] = useState<Config>({ state: 'invisible', animation: 'close', width: 'auto' });

  const GAP = 16;
  const ANIMATION_DURATION = 150;

  const arrayChildren = Children.toArray(children) as ReactElement<any>[];

  const generatedId = useMemo(() => uuid(), []);
  const id = providedId ?? generatedId;

  const classes = joinClass(
    `${prefix}-menu`,
    `${prefix}-menu--${config?.animation}`,
    `${prefix}-menu--${position}`,
    props.className
  );
  const [resolvedRole, menuStyle] = useMemo(() => {
    const display = config.state === 'visible' ? 'block' : 'none';

    return [
      role ?? 'menu',
      {
        width: width || config.width,
        top: coordinate?.top,
        left: coordinate?.left,
        display,
        transition: `all ${ANIMATION_DURATION}ms ease-in`,
        zIndex: 50,
        ...props.style,
      },
    ];
  }, [config.state, config.width, coordinate, props.style, role, width]);

  useListenerResized(() => changePosition(), [anchorEl]);

  useEffect(() => { changePosition(); }, [anchorEl]);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => { open ? handleOpen() : handleClose(); }, [open]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = 'auto';
      return;
    }

    document.body.style.overflow = 'hidden';
  }, [open]);

  const changePosition = () => {
    if (!anchorEl) { return; }

    setTimeout(() => {
      let coordinates: Coordinates = {};

      const { width: anchorWidth, height: anchorHeight, left, top: anchorTop } = anchorEl.getBoundingClientRect();

      setConfig(prev => ({ ...prev, width: anchorWidth }));

      const el = document.getElementById(id) as HTMLElement;

      const top = position === 'bottom'
        ? anchorTop + anchorHeight + (GAP / 2)
        : anchorTop - el.offsetHeight - (GAP / 2);

      if (direction === 'center') { coordinates = { top, right: anchorWidth }; }

      if (direction === 'left') { coordinates = { top, left }; }

      if (direction === 'right') { coordinates = { top, left: left - (el.offsetWidth - anchorWidth) }; }

      setCoordinate(coordinates);
    }, 0);
  };

  const handleOpen = () => {
    setConfig(prev => ({ ...prev, state: 'visible' }));

    changePosition();

    setTimeout(() => { setConfig(prev => ({ ...prev, animation: 'open' })); }, 10);
  };

  const handleClose = () => {
    setConfig(prev => ({ ...prev, animation: 'close' }));

    setTimeout(() => {
      setConfig(prev => ({ ...prev, state: 'invisible' }));
      onClose();
    }, ANIMATION_DURATION);
  };

  const getEnabledButtons = () => {
    const menu = document.getElementById(id);

    return Array.from(menu?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
  };

  const focusButton = (button: HTMLButtonElement) => {
    getEnabledButtons().forEach((item) => {
      item.tabIndex = item === button ? 0 : -1;
    });
    button.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) { onKeyDown(event); }

    if (event.defaultPrevented || !open) { return; }

    const buttons = getEnabledButtons();
    const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === 'Escape') {
      event.preventDefault();
      handleClose();
      if (anchorEl) { anchorEl.focus(); }
      return;
    }

    if (!buttons.length) { return; }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
      event.preventDefault();

      if (event.key === 'Home') {
        focusButton(buttons[0]);
        return;
      }

      if (event.key === 'End') {
        focusButton(buttons.at(-1)!);
        return;
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = activeIndex < 0
        ? (direction === 1 ? 0 : buttons.length - 1)
        : (activeIndex + direction + buttons.length) % buttons.length;

      focusButton(buttons[nextIndex]);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      const activeButton = activeIndex < 0 ? buttons[0] : buttons[activeIndex];

      event.preventDefault();
      activeButton.click();
    }
  };

  const getMenuButtonTabIndex = (child: ReactElement<any>, index: number, firstEnabledIndex: number) => {
    if (child.props.disabled || index !== firstEnabledIndex) { return -1; }

    return 0;
  };

  const handleChildFocus = (child: ReactElement<any>, event: React.FocusEvent<HTMLButtonElement>) => {
    if (child.props.onFocus) { child.props.onFocus(event); }

    focusButton(event.currentTarget);
  };

  const handleChildClick = (child: ReactElement<any>, event: React.MouseEvent<HTMLButtonElement>) => {
    debounce.delay(() => {
      if (autoClose) { handleClose(); }

      if (child.props.onClick) { child.props.onClick(event); }
    }, 0);
  };

  const renderChildren = () => {
    const firstEnabledIndex = arrayChildren.findIndex((child) => !child.props.disabled);

    return arrayChildren.map((child, index) => {
      return cloneElement(child, {
        'tabIndex': getMenuButtonTabIndex(child, index, firstEnabledIndex),
        key: `button-${index}`,
        onFocus: (event: React.FocusEvent<HTMLButtonElement>) => handleChildFocus(child, event),
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => handleChildClick(child, event),
      });
    });
  };

  return (
    <>
      <div
        id={id}
        ref={ref}
        {...props}
        role={resolvedRole}
        onKeyDown={handleKeyDown}
        style={menuStyle}
        className={classes}
      >
        {
          open && (
            <Card className={`${prefix}-menu__card`}>
              <CardContent
                className={`${prefix}-menu__card__content`}
                sx={{ py: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight
                }}
              >
                {renderChildren()}
              </CardContent>
            </Card>
          )
        }
      </div>
      {open && <div className={`${prefix}-menu__overlay`} onClick={handleClose} />}
    </>
  );
});

export default createComponent(Menu);
