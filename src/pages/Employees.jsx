import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/useSupabase';
import NavBar from './NavBar';

const Employees = () => {
  const supabase = useSupabase();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!supabase) {
        console.error('Supabase client is not initialized');
        return;
      }
      const { data, error } = await supabase.from('employees').select('*');
      if (error) {
        console.error('Error fetching employees:', error);
      } else {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <h1>Employees</h1>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.first_name} {employee.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;