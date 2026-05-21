import { useEffect } from 'react';

import { xs, sm, md, lg, xl } from '@iziui/tokens/web/js';

export const DeviceBreakpoints = {
  MAX_XS: `(max-width: ${Number(xs)}px)`,
  MIN_SM: `(min-width: ${Number(xs) + 1}px)`,
  MAX_SM: `(max-width: ${Number(sm)}px)`,
  MIN_MD: `(min-width: ${Number(sm) + 1}px)`,
  MAX_MD: `(max-width: ${Number(md)}px)`,
  MIN_LG: `(min-width: ${Number(md) + 1}px)`,
  MAX_LG: `(max-width: ${Number(lg)}px)`,
  MIN_XL: `(min-width: ${Number(xl)}px)`,
};

type Device = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Callback {
  onXs?: () => void;
  onSm?: () => void;
  onMd?: () => void;
  onLg?: () => void;
  onXl?: () => void;
}

const MEDIAS: Record<Device, string> = {
  xs: DeviceBreakpoints.MAX_XS,
  sm: `${DeviceBreakpoints.MIN_SM} and ${DeviceBreakpoints.MAX_SM}`,
  md: `${DeviceBreakpoints.MIN_MD} and ${DeviceBreakpoints.MAX_MD}`,
  lg: `${DeviceBreakpoints.MIN_LG} and ${DeviceBreakpoints.MAX_LG}`,
  xl: DeviceBreakpoints.MIN_XL,
};

export default function useResize({ onXs, onSm, onMd, onLg, onXl }: Callback) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const medias = {
      xs: window.matchMedia(MEDIAS.xs),
      sm: window.matchMedia(MEDIAS.sm),
      md: window.matchMedia(MEDIAS.md),
      lg: window.matchMedia(MEDIAS.lg),
      xl: window.matchMedia(MEDIAS.xl),
    };

    const callbacks: Record<Device, (() => void) | undefined> = {
      xs: onXs,
      sm: onSm,
      md: onMd,
      lg: onLg,
      xl: onXl,
    };

    const runCurrentDevice = () => {
      const currentDevice = Object.keys(medias).find(
        (key) => medias[key as Device].matches
      ) as Device | undefined;

      if (currentDevice && callbacks[currentDevice]) {
        callbacks[currentDevice]();
      }
    };

    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) { return; }

      runCurrentDevice();
    };

    Object.values(medias).forEach((media) => {
      media.addEventListener('change', handleChange);
    });

    runCurrentDevice();

    return () => {
      Object.values(medias).forEach((media) => {
        media.removeEventListener('change', handleChange);
      });
    };
  }, []);
}