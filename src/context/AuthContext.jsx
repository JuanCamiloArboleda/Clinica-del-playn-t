import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSupabase } from './useSupabase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = useSupabase();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [permissions, setPermissions] = useState(JSON.parse(localStorage.getItem('permissions')) || []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (permissions.length > 0) {
      localStorage.setItem('permissions', JSON.stringify(permissions));
    } else {
      localStorage.removeItem('permissions');
    }
  }, [permissions]);

  const signIn = async (email, join_access) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*, role(*)')
        .eq('email', email)
        .eq('join_access', join_access)
        .single();

      if (error) {
        console.error('Error signing in:', error);
        return { error };
      }

      setUser(data);

      const { data: permissionsData, error: permissionsError } = await supabase
        .from('permissions')
        .select('*')
        .eq('role_id', data.id_role);

      if (permissionsError) {
        console.error('Error fetching permissions:', permissionsError);
      } else {
        setPermissions(permissionsData);
      }

      return { data };
    } catch (error) {
      console.error('Error during sign in:', error);
      return { error };
    }
  };

  const signOut = async () => {
    setUser(null);
    setPermissions([]);
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
  };

  return (
    <AuthContext.Provider value={{ user, permissions, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};