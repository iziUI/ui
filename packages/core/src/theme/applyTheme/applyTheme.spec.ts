import type { Color, ThemeBuilded } from '../Theme';
import { applyTheme } from './applyTheme';

describe('applyTheme', () => {
  let originalWindow: typeof window | undefined;

  beforeEach(() => {
    // Mock document.documentElement.style.setProperty
    document.documentElement.style.setProperty = jest.fn();
    originalWindow = global.window;
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.window = originalWindow as any;
  });

  const mockColor: Color = {
    main: '#1976d2',
    dark: '#115293',
    light: '#4791db',
    opacity: 'rgba(25, 118, 210, 0.5)',
    contrastText: '#ffffff',
  };

  const mockTheme: ThemeBuilded = {
    palette: {
      mode: 'light',
      primary: mockColor,
      secondary: {
        main: '#dc004e',
        dark: '#9a0036',
        light: '#e33371',
        opacity: 'rgba(220, 0, 78, 0.5)',
        contrastText: '#ffffff',
      },
      error: {
        main: '#f44336',
        dark: '#d32f2f',
        light: '#e57373',
        opacity: 'rgba(244, 67, 54, 0.5)',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#ff9800',
        dark: '#f57c00',
        light: '#ffb74d',
        opacity: 'rgba(255, 152, 0, 0.5)',
        contrastText: '#000000',
      },
      success: {
        main: '#4caf50',
        dark: '#388e3c',
        light: '#81c784',
        opacity: 'rgba(76, 175, 80, 0.5)',
        contrastText: '#ffffff',
      },
      info: {
        main: '#2196f3',
        dark: '#1976d2',
        light: '#64b5f6',
        opacity: 'rgba(33, 150, 243, 0.5)',
        contrastText: '#ffffff',
      },
      grey: {
        main: '#9e9e9e',
        dark: '#616161',
        light: '#e0e0e0',
        opacity: 'rgba(158, 158, 158, 0.5)',
        contrastText: '#000000',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
      },
      background: {
        paper: '#ffffff',
        default: '#fafafa',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    shape: {
      radius: 4,
    },
    spacing: 8,
    font: new FontFace(
      'Poppins',
      // eslint-disable-next-line
      'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap'
    )
  };

  describe('when window is defined', () => {
    it('should set all color properties for primary color', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--primary', mockColor.main);
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--primary-light', mockColor.light);
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--primary-dark', mockColor.dark);
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--primary-contrast',
        mockColor.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--primary-opacity', mockColor.opacity);
    });

    it('should set all color properties for secondary color', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--secondary',
        mockTheme.palette.secondary.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--secondary-light',
        mockTheme.palette.secondary.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--secondary-dark',
        mockTheme.palette.secondary.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--secondary-contrast',
        mockTheme.palette.secondary.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--secondary-opacity',
        mockTheme.palette.secondary.opacity,
      );
    });

    it('should set all semantic color properties (info, error, warning, success)', () => {
      applyTheme(mockTheme);

      // Info
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--info',
        mockTheme.palette.info.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--info-light',
        mockTheme.palette.info.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--info-dark',
        mockTheme.palette.info.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--info-contrast',
        mockTheme.palette.info.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--info-opacity',
        mockTheme.palette.info.opacity,
      );

      // Error
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--error',
        mockTheme.palette.error.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--error-light',
        mockTheme.palette.error.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--error-dark',
        mockTheme.palette.error.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--error-contrast',
        mockTheme.palette.error.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--error-opacity',
        mockTheme.palette.error.opacity,
      );

      // Warning
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--warning',
        mockTheme.palette.warning.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--warning-light',
        mockTheme.palette.warning.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--warning-dark',
        mockTheme.palette.warning.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--warning-contrast',
        mockTheme.palette.warning.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--warning-opacity',
        mockTheme.palette.warning.opacity,
      );

      // Success
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--success',
        mockTheme.palette.success.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--success-light',
        mockTheme.palette.success.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--success-dark',
        mockTheme.palette.success.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--success-contrast',
        mockTheme.palette.success.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--success-opacity',
        mockTheme.palette.success.opacity,
      );
    });

    it('should set grey color properties', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--grey',
        mockTheme.palette.grey.main,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--grey-light',
        mockTheme.palette.grey.light,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--grey-dark',
        mockTheme.palette.grey.dark,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--grey-contrast',
        mockTheme.palette.grey.contrastText,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--grey-opacity',
        mockTheme.palette.grey.opacity,
      );
    });

    it('should set text color properties', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--text-primary',
        mockTheme.palette.text.primary,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--text-secondary',
        mockTheme.palette.text.secondary,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--text-disabled',
        mockTheme.palette.text.disabled,
      );
    });

    it('should set background color properties', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--background-paper',
        mockTheme.palette.background.paper,
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--background-default',
        mockTheme.palette.background.default,
      );
    });

    it('should set divider color property', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--divider', mockTheme.palette.divider);
    });

    it('should set shape radius property with px unit', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--radius', '4px');
    });

    it('should set spacing property with px unit', () => {
      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--spacing', '8px');
    });

    it('should handle different spacing values', () => {
      const themeWithDifferentSpacing: ThemeBuilded = {
        ...mockTheme,
        spacing: 16,
      };

      applyTheme(themeWithDifferentSpacing);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--spacing', '16px');
    });

    it('should handle different shape radius values', () => {
      const themeWithDifferentRadius: ThemeBuilded = {
        ...mockTheme,
        shape: { radius: 8 },
      };

      applyTheme(themeWithDifferentRadius);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--radius', '8px');
    });

    it('should call setProperty correct number of times', () => {
      applyTheme(mockTheme);

      // 7 colors * 5 properties each = 35
      // 3 text properties = 3
      // 2 background properties = 2
      // 1 divider = 1
      // 1 radius = 1
      // 1 spacing = 1
      // Total = 43
      expect(document.documentElement.style.setProperty).toHaveBeenCalledTimes(43);
    });
  });

  describe('when window is undefined (SSR)', () => {
    it('should return early and not set any properties', () => {
      // @ts-expect-error - Simulating server-side rendering
      delete global.window;

      applyTheme(mockTheme);

      expect(document.documentElement.style.setProperty).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle theme with zero spacing', () => {
      const themeWithZeroSpacing: ThemeBuilded = {
        ...mockTheme,
        spacing: 0,
      };

      applyTheme(themeWithZeroSpacing);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--spacing', '0px');
    });

    it('should handle theme with zero radius', () => {
      const themeWithZeroRadius: ThemeBuilded = {
        ...mockTheme,
        shape: { radius: 0 },
      };

      applyTheme(themeWithZeroRadius);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--radius', '0px');
    });

    it('should handle dark mode theme', () => {
      const darkTheme: ThemeBuilded = {
        ...mockTheme,
        palette: {
          ...mockTheme.palette,
          mode: 'dark',
          text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.54)',
            disabled: 'rgba(255, 255, 255, 0.38)',
          },
          background: {
            paper: '#424242',
            default: '#303030',
          },
          divider: 'rgba(255, 255, 255, 0.12)',
        },
      };

      applyTheme(darkTheme);

      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith(
        '--text-primary',
        'rgba(255, 255, 255, 0.87)',
      );
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--background-paper', '#424242');
      expect(document.documentElement.style.setProperty).toHaveBeenCalledWith('--background-default', '#303030');
    });
  });
});
