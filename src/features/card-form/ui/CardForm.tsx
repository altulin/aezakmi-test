import { useMemo } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PRIORITIES,
  STATUSES,
  ASSIGNEES,
  setCard,
  type Card,
  type CardImage,
} from '@/entities/card';
import { Button, TextField, TextArea, Select } from '@/shared/ui';
import {
  cardSchema,
  type CardFormInput,
  type CardFormValues,
} from '../model/cardSchema';
import { TagsInput } from './TagsInput';
import { ImagesInput } from './ImagesInput';
import { mockSaveCard } from '../api/mockSaveCard';
import { formatCardForAlert } from '../lib/formatCardForAlert';
import { useAppDispatch } from '@/app/store/hooks';
import styles from './CardForm.module.scss';

const EMPTY_VALUES: CardFormInput = {
  title: '',
  description: '',
  priority: '',
  status: '',
  assignee: '',
  deadline: '',
  tags: [],
  images: [],
};

const toFormValues = (card: Card): CardFormInput => ({
  ...card,
  status: card.status ?? '',
  assignee: card.assignee ?? '',
  deadline: card.deadline ?? '',
});

const revokeExcept = (images: CardImage[], keep: ReadonlySet<string>) => {
  for (const { url } of images) {
    if (!keep.has(url)) URL.revokeObjectURL(url);
  }
};

interface CardFormProps {
  initialValues?: Card;
  submitLabel?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CardForm = ({
  initialValues,
  submitLabel = 'Create Card',
  onSuccess,
  onCancel,
}: CardFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CardFormInput, unknown, CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: initialValues ? toFormValues(initialValues) : EMPTY_VALUES,
  });

  const persistedUrls = useMemo(
    () => new Set(initialValues?.images.map((image) => image.url)),
    [initialValues]
  );

  const deadlineValue = useWatch({
    control,
    name: 'deadline',
  });

  const onSubmit = async (values: CardFormValues) => {
    const card = await mockSaveCard(values);
    alert(formatCardForAlert(card));

    revokeExcept(
      initialValues?.images ?? [],
      new Set(card.images.map((image) => image.url))
    );
    dispatch(setCard(card));
    onSuccess?.();
  };

  const handleCancel = () => {
    revokeExcept(getValues('images'), persistedUrls);
    reset();
    onCancel?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.card}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <TextField
              label="Title *"
              placeholder="Enter card title"
              size="md"
              error={errors.title?.message}
              {...register('title')}
            />
            <TextArea
              label="Description *"
              placeholder="Enter detailed description..."
              error={errors.description?.message}
              {...register('description')}
            />
            <Select
              label="Priority *"
              placeholder="Select priority"
              options={PRIORITIES}
              size="md"
              error={errors.priority?.message}
              {...register('priority')}
            />
            <Select
              label="Status"
              placeholder="Select status"
              options={STATUSES}
              size="md"
              error={errors.status?.message}
              {...register('status')}
            />
          </div>

          <div className={styles.column}>
            <Select
              label="Assignee"
              placeholder="Select assignee"
              options={ASSIGNEES}
              size="md"
              error={errors.assignee?.message}
              {...register('assignee')}
            />

            <TextField
              label="Deadline"
              type="date"
              size="md"
              isEmpty={!deadlineValue}
              error={errors.deadline?.message}
              {...register('deadline')}
            />

            <Controller
              name="tags"
              control={control}
              render={({ field, fieldState }) => (
                <TagsInput
                  label="Tags"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="images"
              control={control}
              render={({ field, fieldState }) => (
                <ImagesInput
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  persistedUrls={persistedUrls}
                  label="Images"
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="md"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="md"
          type="submit"
          isLoading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
