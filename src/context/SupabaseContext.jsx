import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createClient } from '@supabase/supabase-js';

export const SupabaseContext = createContext();

let supabaseClient;

export const SupabaseProvider = ({ children }) => {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    if (!supabaseClient) {
      supabaseClient = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );
    }
    setSupabase(supabaseClient);
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
};

SupabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};