import assert from 'node:assert/strict';
import test from 'node:test';

import markdownReferenceFormatter from './markdownReferenceFormatter';

test('renders token values and public exports as a Markdown reference', () => {
  const formatter = markdownReferenceFormatter();
  const markdown = formatter.format({
    dictionary: {
      allTokens: [
        { path: ['shape', 'radius'], value: '8px' },
        { path: ['media-query', 'md'], value: '1199' },
        { path: ['behaviors', 'box-shadow', 'regular'], value: '0 3px 6px rgba(0, 0, 0, 0.16)' },
      ],
    },
  } as never);

  assert.match(markdown, /## Shape[\s\S]*\| `radius` \| `radius` \| `\$radius` \| `8px` \|/);
  assert.match(markdown, /## Breakpoints[\s\S]*\| `md` \| `md` \| `\$md` \| `1199` \|/);
  assert.match(markdown, /## Visual Behavior[\s\S]*\| `boxShadowRegular` \|/);
  assert.match(markdown, /## Collections and Constants[\s\S]*`colors`/);
});
