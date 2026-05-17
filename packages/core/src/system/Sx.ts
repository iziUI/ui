import type { CustomOptions } from '../options';

export type Sx<T> = T & {
    sx?: CustomOptions;
    fullWidth?: boolean;
} 