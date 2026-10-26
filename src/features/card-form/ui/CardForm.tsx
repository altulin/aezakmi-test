import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  cardSchema,
  type CardFormInput,
  type CardFormValues,
} from '../model/cardSchema';

export const CardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CardFormInput, unknown, CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: [],
      images: [],
    },
  });

  const onSubmit = (data: CardFormValues) => {
    // data.status имеет тип Status | undefined (без пустых строк)
    console.log(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{/* поля формы */}</form>;
};
