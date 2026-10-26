import { z } from 'zod';
import { PRIORITIES, STATUSES, ASSIGNEES } from '@/entities/card';

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z
    .enum(values)
    .or(z.literal(''))
    .optional()
    .transform((v) => v || undefined);

const requiredEnum = <T extends readonly [string, ...string[]]>(
  values: T,
  error: string
) =>
  z
    .enum(values, { error })
    .or(z.literal(''))
    .transform((v, ctx) => {
      if (v === '') {
        ctx.addIssue({ code: 'custom', message: error });
        return z.NEVER;
      }
      return v;
    });

export const cardSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  priority: requiredEnum(PRIORITIES, 'Please select a priority'),
  status: optionalEnum(STATUSES),
  assignee: optionalEnum(ASSIGNEES),
  deadline: z
    .string()
    .optional()
    .transform((v) => v || undefined),
  tags: z
    .array(z.string().max(20, 'Tag must be 20 characters or less'))
    .max(5, 'You can add up to 5 tags'),
  images: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
    })
  ),
});

export type CardFormInput = z.input<typeof cardSchema>;
export type CardFormValues = z.output<typeof cardSchema>;
