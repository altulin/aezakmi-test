import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CardImage } from '../model/types';
import { CardView } from './CardView';

const placeholder = (id: string, color: string): CardImage => ({
  id,
  name: `${id}.png`,
  url: `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="120"><rect width="100%" height="100%" fill="${color}"/></svg>`
  )}`,
});

const meta = {
  title: 'Entities/Card/CardView',
  component: CardView,
  args: {
    card: {
      title: 'Redesign landing page header',
      description:
        'Update the hero section with new brand guidelines. Include updated CTA buttons and responsive layout adjustments.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Alex Johnson',
      deadline: '2026-04-15',
      tags: ['Design', 'Frontend', 'Urgent'],
      images: [
        placeholder('hero', '#cfd8e7'),
        placeholder('cta', '#d8cfe7'),
        placeholder('mobile', '#cfe7d8'),
      ],
    },
  },
} satisfies Meta<typeof CardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const RequiredFieldsOnly: Story = {
  args: {
    card: {
      title: 'Fix login validation',
      description: 'Show the error under the field.',
      priority: 'Low',
      tags: [],
      images: [],
    },
  },
};

export const MediumPriority: Story = {
  args: {
    card: { ...meta.args.card, priority: 'Medium', status: 'To Do' },
  },
};

export const LongText: Story = {
  args: {
    card: {
      ...meta.args.card,
      title: 'A very long title that should wrap nicely inside the card',
      description: `${'Averyveryverylongwordwithoutanyspaces'.repeat(6)}\n\nSecond paragraph after an empty line.`,
    },
  },
};
