import { cardSchema, type CardFormInput } from './cardSchema';

const validInput: CardFormInput = {
  title: 'Redesign landing page header',
  description: 'Update the hero section',
  priority: 'High',
  status: '',
  assignee: '',
  deadline: '',
  tags: ['Design'],
  images: [],
};

const getErrorPaths = (input: CardFormInput) => {
  const result = cardSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((i) => i.path[0]);
};

describe('cardSchema', () => {
  it('turns empty optional fields into undefined', () => {
    const result = cardSchema.parse(validInput);

    expect(result.status).toBeUndefined();
    expect(result.assignee).toBeUndefined();
    expect(result.deadline).toBeUndefined();
    expect(result.priority).toBe('High');
  });

  it('requires title, description and priority', () => {
    const paths = getErrorPaths({
      ...validInput,
      title: '   ',
      description: '',
      priority: '',
    });

    expect(paths).toEqual(
      expect.arrayContaining(['title', 'description', 'priority'])
    );
  });

  it('allows at most 5 tags of up to 20 characters', () => {
    const sixTags = ['a', 'b', 'c', 'd', 'e', 'f'];

    expect(getErrorPaths({ ...validInput, tags: sixTags })).toContain('tags');
    expect(getErrorPaths({ ...validInput, tags: ['x'.repeat(21)] })).toContain(
      'tags'
    );
    expect(getErrorPaths({ ...validInput, tags: ['x'.repeat(20)] })).toEqual(
      []
    );
  });
});
