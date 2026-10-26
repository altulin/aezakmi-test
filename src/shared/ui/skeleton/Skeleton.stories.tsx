import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Shared/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableRows: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}
        >
          <Skeleton style={{ height: 20 }} />
          <Skeleton style={{ height: 20 }} />
        </div>
      ))}
    </div>
  ),
};
