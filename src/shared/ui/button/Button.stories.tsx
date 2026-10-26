import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Create Card',
    variant: 'primary',
    size: 'lg',
    isLoading: false,
    disabled: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
};

export const Medium: Story = {
  args: { size: 'md', children: 'Edit Card' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Login' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
