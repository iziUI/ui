import type { ComponentType, FC } from 'react';

import type { Sx } from '@iziui/core/options';
import type { Plugin } from '@iziui/core/plugin';
import createOptions from '@iziui/core/options';
import * as plugins from '@iziui/core/plugin';

import { useTheme } from '@/theme';

function extract(module: { [key: string]: Plugin }) {
  return Object.values(module).map((fn) => fn);
}

export default function createComponent<P>(WrappedComponent: ComponentType<P>) {
  WrappedComponent.displayName = WrappedComponent.name;

  const EnhancedComponent: FC<Sx<P>> = ({ sx, fullWidth, ...props }) => {
    const { theme } = useTheme();

    const options = sx && createOptions({ theme, sx },
      ...extract(plugins),
    );

    return (
      <WrappedComponent
        {...(props as P)}
        style={{
          ...props['style'],
          ...options,
          ...(fullWidth ? { width: '100%' } : {}),
        }}
      />
    );
  };

  return EnhancedComponent;
}