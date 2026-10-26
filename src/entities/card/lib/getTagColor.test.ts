import { getTagColor } from './getTagColor';

describe('getTagColor', () => {
  it('gives mockup tags their mockup colors', () => {
    expect(getTagColor('Design')).toBe('purple');
    expect(getTagColor('Frontend')).toBe('blue');
    expect(getTagColor('Urgent')).toBe('red');
  });

  it('ignores case and surrounding spaces', () => {
    expect(getTagColor('  design ')).toBe('purple');
    expect(getTagColor('FRONTEND')).toBe('blue');
  });

  it('gives the same color to the same unknown tag', () => {
    expect(getTagColor('Backend')).toBe(getTagColor('backend'));
    expect(['purple', 'blue', 'red']).toContain(getTagColor('Backend'));
  });
});
