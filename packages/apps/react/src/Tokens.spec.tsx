import { colors } from '@iziui/tokens/web/js';

import { render, screen } from '@/test/render';

import { TokensPage } from './Tokens.stories';

function expectResponsiveSpan(element: HTMLElement, spans: Record<string, number>) {
  const item = element.closest('.iziui-grid__item');

  expect(item).not.toBeNull();
  expect(item).toHaveClass(
    ...Object.entries(spans).map(([breakpoint, span]) => `iziui-grid__item--${breakpoint}-${span}`),
  );
}

describe('TokensPage', () => {
  it('presents public tokens and active theme colors', () => {
    render(<TokensPage />);

    expect(screen.getByRole('heading', { name: 'Colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Shape and spacing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Grid and motion' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Elevation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Typography and icons' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Breakpoints' })).toBeInTheDocument();
    expect(screen.getByText('primary.main')).toBeInTheDocument();
    expect(screen.getByText('animation')).toBeInTheDocument();
    expect(screen.getByText('prefix: iziui')).toBeInTheDocument();
    expect(screen.getByText('boxShadowRegular')).toBeInTheDocument();
    expect(screen.getByText('md: 1199px')).toBeInTheDocument();
  });

  it('uses explicit spans at every breakpoint', () => {
    render(<TokensPage />);

    expectResponsiveSpan(screen.getByLabelText('Radius preview'), { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 });
    expectResponsiveSpan(screen.getByLabelText('Spacing preview 1'), { xl: 6, lg: 6, md: 6, sm: 12, xs: 12 });

    const iconItem = screen.getAllByLabelText(/icon size/)[0].closest('.iziui-grid__item');

    expect(iconItem).not.toBeNull();
    expect(iconItem).toHaveClass(
      'iziui-grid__item--xl-6',
      'iziui-grid__item--lg-6',
      'iziui-grid__item--md-6',
      'iziui-grid__item--sm-12',
      'iziui-grid__item--xs-12',
    );
  });

  it('uses progressive spans for color and elevation cards', () => {
    render(<TokensPage />);

    expectResponsiveSpan(screen.getByText('primary.main'), { xl: 3, lg: 3, md: 3, sm: 6, xs: 12 });
    expectResponsiveSpan(screen.getByText('boxShadowRegular'), { xl: 4, lg: 4, md: 4, sm: 12, xs: 12 });
  });

  it('groups active theme colors and shows semantic variations', () => {
    render(<TokensPage />);

    expect(screen.getByRole('heading', { name: 'Semantic colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Text colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Background colors' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Divider color' })).toBeInTheDocument();

    colors.forEach((color) => {
      expect(screen.getByText(`${color}.dark`)).toBeInTheDocument();
      expect(screen.getByText(`${color}.main`)).toBeInTheDocument();
      expect(screen.getByText(`${color}.light`)).toBeInTheDocument();
      expect(screen.getByText(`${color}.opacity`)).toBeInTheDocument();
    });

    expect(screen.getByText('text.primary')).toBeInTheDocument();
    expect(screen.getByText('background.default')).toBeInTheDocument();
    expect(screen.getByText('divider')).toBeInTheDocument();
  });
});
