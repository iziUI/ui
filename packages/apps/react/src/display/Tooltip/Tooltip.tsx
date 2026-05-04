import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  type CSSProperties,
  type HTMLAttributes,
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core/createComponent';
import { useTheme } from '@/theme';

import '@iziui/styles/components/Tooltip.scss';

type TooltipCoordinate = { top: number; left: number; };
type Direction = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps extends HTMLAttributes<HTMLElement> {
  direction?: Direction;
  width?: CSSProperties['width'];
  children: React.JSX.Element;
  label: string | React.JSX.Element;
}

function Tooltip({
  children,
  label,
  width = 'max-content',
  direction = 'bottom',
  ...props
}: TooltipProps) {
  const { theme: { spacing } } = useTheme();
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [coordinate, setCoordinate] = useState<TooltipCoordinate | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure and position synchronously before the browser paints — no setTimeout hack needed.
  useLayoutEffect(() => {
    if (!open || !containerRef.current || !tooltipRef.current) return;

    const { offsetHeight, offsetWidth } = containerRef.current;
    const { offsetHeight: tooltipH, offsetWidth: tooltipW } = tooltipRef.current;

    let top: number;
    let left: number;

    if (direction === 'top') {
      top = -(tooltipH + spacing);
      left = -(tooltipW - offsetWidth) / 2;
    } else if (direction === 'bottom') {
      top = offsetHeight + spacing;
      left = -(tooltipW - offsetWidth) / 2;
    } else if (direction === 'right') {
      top = (offsetHeight - tooltipH) / 2;
      left = offsetWidth + spacing;
    } else {
      top = (offsetHeight - tooltipH) / 2;
      left = -(tooltipW + spacing);
    }

    setCoordinate({ top, left });
  }, [open, direction, spacing]);

  // Trigger the CSS transition one frame after position is committed.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => () => {
    if (!leaveTimer.current) { return; }

    clearTimeout(leaveTimer.current);
  }, []);

  const handleEnter = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);

      leaveTimer.current = null;
      setAnimate(true);

      return;
    }
    setOpen(true);
  };

  const handleLeave = () => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }

    setAnimate(false);

    leaveTimer.current = setTimeout(() => {
      setOpen(false);
      setCoordinate(null);
      leaveTimer.current = null;
    }, 300);
  };

  const className = joinClass(
    `${prefix}-tooltip`,
    animate && `${prefix}-tooltip--visible`,
  );

  return (
    <div
      ref={containerRef}
      {...props}
      style={{ position: 'relative', ...props.style }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <span
        ref={tooltipRef}
        className={className}
        style={{
          ...coordinate,
          width,
          display: open ? 'block' : 'none',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default createComponent(Tooltip);
