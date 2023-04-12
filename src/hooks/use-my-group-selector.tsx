import { useEffect } from 'react';

import { asyncMyGroup } from '@/redux-toolkit/feature/group/conversation.thunk';

import { useAppDispatch, useAppSelector } from './use-dispatch-selector';

const useMyGroupSelector = () => {
  const dispatch = useAppDispatch();

  const { loading, error, items } = useAppSelector((state) => state.group);

  useEffect(() => {
    dispatch(asyncMyGroup());
    return () => {};
  }, [dispatch]);

  return { loading, error, items };
};

export default useMyGroupSelector;
