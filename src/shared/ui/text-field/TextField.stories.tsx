import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Shared/TextField',
  component: TextField,
  args: {
    placeholder: 'Email Address',
    'aria-label': 'Email address',
    size: 'lg',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { icon: <span aria-hidden="true">✉️</span> },
};

export const WithLabel: Story = {
  args: {
    label: 'Title',
    placeholder: 'Enter card title',
    'aria-label': undefined,
    size: 'md',
  },
};

export const WithError: Story = {
  args: {
    icon: <span aria-hidden="true">✉️</span>,
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'demo@example.com' },
};
