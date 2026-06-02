import {
  useMemo,
  useState,
  useEffect,
  Children,
  forwardRef,
  type ReactElement,
  type CSSProperties,
  type HTMLAttributes,
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

type Direction = 'left' | 'right' | 'center';
type Position = 'top' | 'bottom';
type AnimationClass = 'open' | 'close';
type State = 'visible' | 'invisible';
type Coordinates = { top?: number; right?: number; bottom?: number; left?: number; };
type Config = { animation: AnimationClass, state: State; width: CSSProperties['width'] };

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  autoClose?: boolean;
  maxHeight?: CSSProperties['maxHeight'];
  direction?: Direction;
  position?: Position;
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
  ...props
}: MenuProps, ref) {
  const [coordinate, setCoordinate] = useState<Coordinates>();
  const [config, setConfig] = useState<Config>({ state: 'invisible', animation: 'close', width: 'auto' });

  const GAP = 16;
  const ANIMATION_DURATION = 150;

  const arrayChildren = Children.toArray(children) as ReactElement<any>[];

  const id = useMemo(() => uuid(), []);

  const classes = joinClass(
    `${prefix}-menu`,
    `${prefix}-menu--${config?.animation}`,
    `${prefix}-menu--${position}`,
    props.className
  );

  useListenerResized(() => changePosition(), [anchorEl]);

  useEffect(() => { changePosition(); }, [anchorEl]);

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => { open ? handleOpen() : handleClose(); }, [open]);

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

  const renderChildren = () => {
    return arrayChildren.map((child, index) => {
      return cloneElement(child, {
        'tabIndex': index + 1,
        key: `button-${index}`,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          debounce.delay(() => {

            if (autoClose) { handleClose(); }

            if (child.props.onClick) { child.props.onClick(e); }
          }, 0);
        },
      });
    });
  };

  return (
    <>
      <div
        id={id}
        ref={ref}
        {...props}
        style={{
          width: width || config.width,
          top: coordinate?.top,
          left: coordinate?.left,
          display: config?.state === 'visible' ? 'block' : 'none',
          transition: `all ${ANIMATION_DURATION}ms ease-in`,
          zIndex: 50,
          ...props.style
        }}
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
