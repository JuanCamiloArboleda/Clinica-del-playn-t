import { useContext } from 'react';
import { SupabaseContext } from './SupabaseContext';

export const useSupabase = () => {
  return useContext(SupabaseContext);
};