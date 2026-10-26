import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TagChip } from './TagChip';

const meta = {
  title: 'Entities/Card/TagChip',
  component: TagChip,
  args: { tag: 'Design' },
} satisfies Meta<typeof TagChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = {
  args: { tag: 'Frontend', onRemove: fn() },
};

export const MockupColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {['Design', 'Frontend', 'Urgent', 'Backend', 'QA'].map((tag) => (
        <TagChip key={tag} tag={tag} />
      ))}
    </div>
  ),
};
