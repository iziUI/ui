import { useMemo, useRef, type HTMLAttributes, type KeyboardEvent } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import Ripple from '../../actions/Ripple';
import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Card.scss';

export type CardProps = HTMLAttributes<HTMLDivElement>;

function Card({
  children,
  role,
  tabIndex,
  onClick,
  onKeyDown,
  onKeyUp,
  ...props
}: CardProps) {
  const clickable = Boolean(onClick);
  const ignoreSpaceKeyUp = useRef(false);
  const cls = joinClass(
    `${prefix}-card`,
    clickable && `${prefix}-card--clickable`,
    props.className
  );

  const [_role, _tabIndex] = useMemo(() => {
    if (!clickable) { return [role, tabIndex]; }

    return [
      'button',
      tabIndex ?? 0
    ];
  }, [clickable, role, tabIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) { onKeyDown(event); }

    if (!clickable) { return; }

    if (event.key === ' ') {
      ignoreSpaceKeyUp.current = event.defaultPrevented;

      if (event.defaultPrevented) { return; }

      event.preventDefault();
    }

    if (event.defaultPrevented) { return; }

    if (event.key !== 'Enter') { return; }

    event.preventDefault();
    event.currentTarget.click();
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onKeyUp) { onKeyUp(event); }

    if (!clickable || event.key !== ' ') { return; }

    const shouldIgnore = ignoreSpaceKeyUp.current;
    ignoreSpaceKeyUp.current = false;

    if (shouldIgnore || event.defaultPrevented) { return; }

    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <div
      {...props}
      role={_role}
      tabIndex={_tabIndex}
      className={cls}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {children}
      {clickable && <Ripple />}
    </div>
  );
}

export default createComponent(Card);
