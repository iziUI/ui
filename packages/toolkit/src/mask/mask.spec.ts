import { mask } from './mask';

const PIN_OPTIONS = {
  mask: '$1-$2',
  regex: /^(\d{2})(\d{2})$/,
  length: 4,
};

describe('mask', () => {
  it('applies regex mask to a numeric string', () => {
    expect(mask('1234', PIN_OPTIONS)).toBe('12-34');
  });

  it('strips non-digit characters before masking', () => {
    expect(mask('ab12cd34', PIN_OPTIONS)).toBe('12-34');
  });

  it('pads with leading zeros when value is shorter than length', () => {
    expect(mask('12', PIN_OPTIONS)).toBe('00-12');
  });

  it('formats a CPF-style value', () => {
    expect(mask('12345678901', {
      mask: '$1.$2.$3-$4',
      regex: /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      length: 11,
    })).toBe('123.456.789-01');
  });

  it('formats a phone number', () => {
    expect(mask('11999998888', {
      mask: '($1) $2-$3',
      regex: /^(\d{2})(\d{5})(\d{4})$/,
      length: 11,
    })).toBe('(11) 99999-8888');
  });
});
