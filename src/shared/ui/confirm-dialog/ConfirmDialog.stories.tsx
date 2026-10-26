import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../button/Button';
import { ConfirmDialog, type ConfirmDialogProps } from './ConfirmDialog';

const DialogDemo = (args: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="md" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <ConfirmDialog
        {...args}
        open={open}
        onConfirm={() => {
          args.onConfirm();
          setOpen(false);
        }}
        onCancel={() => {
          args.onCancel();
          setOpen(false);
        }}
      />
    </>
  );
};

const meta = {
  title: 'Shared/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    open: false,
    title: 'Log out?',
    description: 'You will need to sign in again to see rates and cards.',
    confirmLabel: 'Log out',
    onConfirm: fn(),
    onCancel: fn(),
  },
  render: (args) => <DialogDemo {...args} />,
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logout: Story = {};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
    title: 'Delete card?',
    confirmLabel: 'Delete',
  },
};
