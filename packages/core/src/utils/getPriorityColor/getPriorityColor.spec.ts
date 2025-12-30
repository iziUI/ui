import { getPriorityColor } from './getPriorityColor';
import { convertPathToColor } from '../convertPathToColor';

jest.mock('../convertPathToColor', () => ({
  convertPathToColor: jest.fn(),
}));

describe('getPriorityColor', () => {
  const palette = {
    primary: { 500: '#111111' },
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call convertPathToColor when color contains a dot', () => {
    (convertPathToColor as jest.Mock).mockReturnValue('#111111');

    const result = getPriorityColor('primary.500', palette);

    expect(convertPathToColor).toHaveBeenCalledTimes(1);
    expect(convertPathToColor).toHaveBeenCalledWith('primary.500', palette);
    expect(result).toBe('#111111');
  });

  it('should return the input color when it does not contain a dot', () => {
    const result = getPriorityColor('#ff0000', palette);

    expect(convertPathToColor).not.toHaveBeenCalled();
    expect(result).toBe('#ff0000');
  });

  it('should return the input color even if it is not a hex (no dot)', () => {
    const result = getPriorityColor('transparent', palette);

    expect(convertPathToColor).not.toHaveBeenCalled();
    expect(result).toBe('transparent');
  });
});
