import { useEffect, useState } from 'react';

import { wait } from '@iziui/toolkit/promise';

type Style = React.HTMLAttributes<HTMLDivElement>['style'];

export interface FadeProps extends React.HTMLAttributes<HTMLDivElement> {
  enter: boolean;
  delay?: number;
  timeout?: number;
  children: React.ReactNode;
}

export default function Fade({ children, enter, delay = 10, timeout = .5, ...props }: Readonly<FadeProps>) {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<Style>({ opacity: 0 });

  useEffect(() => {
    setTimeout(() => {
      if (enter) {
        show();
        return;
      }

      hide();
    }, delay);
  }, [enter]);

  const show = () => {
    setIsVisible(true);

    wait(() => {
      setStyle({ opacity: 1, });
    }, delay);
  };

  const hide = async () => {
    setStyle({ opacity: 0 });

    await wait(() => {
      setIsVisible(false);
    }, timeout * 1000);
  };

  return (
    isVisible && (
      <div
        {...props}
        style={{
          ...style,
          width: '100%',
          transition: `all ${timeout}s cubic-bezier(0.25, 0.1, 0.25, 1)`,
          ...props.style
        }}
      >
        {children}
      </div>
    )
  );
}
