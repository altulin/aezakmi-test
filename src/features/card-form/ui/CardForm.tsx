import { useForm, useWatch, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PRIORITIES, STATUSES, ASSIGNEES } from '@/entities/card';
import { Button, TextField, TextArea, Select } from '@/shared/ui';
import {
  cardSchema,
  type CardFormInput,
  type CardFormValues,
} from '../model/cardSchema';
import { TagsInput } from './TagsInput';
import { ImagesInput } from './ImagesInput';
import styles from './CardForm.module.scss';

export const CardForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CardFormInput, unknown, CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: '',
      status: '',
      assignee: '',
      deadline: '',
      tags: [],
      images: [],
    },
  });

  const deadlineValue = useWatch({
    control,
    name: 'deadline',
  });

  const onSubmit = (data: CardFormValues) => {
    console.log(data);
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
                  label="Images"
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="secondary" size="md" type="button">
          Cancel
        </Button>
        <Button variant="primary" size="md" type="submit">
          Create Card
        </Button>
      </div>
    </form>
  );
};
