import { useAppDispatch } from '@/app/store/hooks';
import { clearSession } from '@/entities/session';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(clearSession());
  };
};
