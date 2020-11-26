import { ApiContext } from '@/presentation/contexts';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

type CallbackType = () => void;
type ResultType = CallbackType

export const useLogout = (): ResultType => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  return (): void => {
    setCurrentAccount(undefined);
    history.replace('/login');
  };
};
