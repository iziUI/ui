import { useRef, useEffect, useState, type MouseEvent } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import '@iziui/styles/components/Ripple.scss';

export default function Ripple() {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number, size: number }>>([]);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  const addRipple = (event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const rect = rippleContainerRef.current!.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRipples([...ripples, { x, y, size }]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => setRipples([]), 700);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <div className={`${prefix}-ripple-container`} ref={rippleContainerRef} onMouseUp={addRipple}>
      {
        ripples.map((ripple, index) => (
          <span
            key={index}
            className={`${prefix}-ripple`}
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))
      }
    </div>
  );
}