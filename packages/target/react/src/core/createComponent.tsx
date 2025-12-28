import type { ComponentType, FC } from 'react';

import type { Sx } from '@iziui/core/options';
import type { Plugin } from '@iziui/core/plugin';
import createOptions from '@iziui/core/options';
import * as colorsPlugin from '@iziui/core/plugin';

import { useTheme } from '@/theme';

function extract(module: { [key: string]: Plugin }) {
  return Object.values(module).map((fn) => fn);
}

export default function createComponent<P>(WrappedComponent: ComponentType<P>) {
  const EnhancedComponent: FC<Sx<P>> = ({ sx, ...props }) => {

    const { theme } = useTheme();

    const options = sx && createOptions({ theme, sx },
      ...extract(colorsPlugin),
    );

    return (
      <WrappedComponent
        {...(props as P)}
        style={{
          ...props['style'],
          ...options,
        }}
      />
    );
  };

  return EnhancedComponent;
}