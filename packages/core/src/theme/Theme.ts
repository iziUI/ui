import type { Path } from '@iziui/toolkit/interface';

import { createMappedColors } from './createMappedColors';

export const colors = ['primary', 'secondary', 'error', 'warning', 'success', 'info'] as const;
export const mappedColors = createMappedColors(colors);

export type Mode = 'light' | 'dark'

export type MappedColors = Path<PaletteBuilded>;
export type Colors = typeof colors[number];

export type Size = 'small' | 'medium' | 'large';

export interface Color {
    main: string;
    dark: string;
    light: string;
    opacity: string;
    contrast: string;
}

export interface Palette {
    mode: Mode;
    info: string;
    error: string;
    warning: string;
    success: string;
    primary: string;
    secondary: string;
    grey: string;
    text: {
        primary: string;
        secondary: string;
        disabled: string;
    };
    background: {
        paper: string;
        default: string;
    };
    divider: string;
}

export type Spacing = number;
export type Shape = { radius: number; }
export type Typography = { family: string; url?: string; }

export interface PaletteBuilded extends Pick<Palette, 'mode' | 'text' | 'background' | 'divider'> {
    mode: Mode;
    grey: Color;
    info: Color;
    error: Color;
    warning: Color;
    success: Color;
    primary: Color;
    secondary: Color;
}

export interface Theme {
    shape: Shape;
    palette: Palette;
    spacing: Spacing;
    typography: Typography;
}

export interface ThemeOptions extends Omit<Partial<Theme>, 'palette'> {
    palette?: Partial<Palette>;
}
export interface ThemeBuilded extends Omit<Theme, 'palette'> {
    palette: PaletteBuilded;
}
