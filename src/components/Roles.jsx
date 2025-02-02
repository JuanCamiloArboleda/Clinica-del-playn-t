import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/useSupabase';
import NavBar from './NavBar';

const Roles = () => {
  const supabase = useSupabase();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase.from('role').select('*');
      if (error) {
        console.error('Error fetching roles:', error);
      } else {
        setRoles(data);
      }
    };

    fetchRoles();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <h1>Roles</h1>
      <ul>
        {roles.map(role => (
          <li key={role.id}>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roles;