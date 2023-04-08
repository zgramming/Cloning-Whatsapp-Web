import { useEffect, useMemo } from 'react';

import { ContactMe } from '@/interface/contact/contact.me.interface';
import { asyncGetMyContact } from '@/redux-toolkit/feature/contact/contact.thunk';

import { useAppDispatch, useAppSelector } from './use-dispatch-selector';

type GroupedContact = {
  [key: string]: ContactMe[];
};

const useContactSelector = () => {
  const groups = useAppSelector((state) => state.contact.items);
  const dispatch = useAppDispatch();

  const groupedContactByFirstChar = useMemo(() => {
    const grouped: GroupedContact = {};

    groups.forEach((group) => {
      const firstLetter = group.user.name[0].toUpperCase();
      if (grouped[firstLetter]) {
        grouped[firstLetter].push(group);
      } else {
        grouped[firstLetter] = [group];
      }
    });

    // Sort by first letter
    const result = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));

    return result;
  }, [groups]);

  useEffect(() => {
    dispatch(asyncGetMyContact());
    return () => {};
  }, [dispatch]);

  return { groupedContactByFirstChar };
};

export default useContactSelector;
