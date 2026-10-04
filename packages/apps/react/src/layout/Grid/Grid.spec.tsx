import { GridItem } from '../';

import type { GridProps } from './Grid';

const validGridProps = {
  children: <GridItem>Card</GridItem>,
  xs: 12,
} satisfies GridProps;

const invalidGridProps = {
  children: <GridItem>Card</GridItem>,
  // @ts-expect-error Grid spans start at 1 because the generated CSS has no span-0 class.
  xs: 0,
} satisfies GridProps;

void validGridProps;
void invalidGridProps;

describe('Grid type contract', () => {
  it('accepts a 12-column span', () => {
    expect(validGridProps.xs).toBe(12);
  });
});
