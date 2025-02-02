import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/useSupabase';
import NavBar from './NavBar';

const Customers = () => {
  const supabase = useSupabase();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) {
        console.error('Error fetching customers:', error);
      } else {
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <h1>Customers</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer.id}>
            {customer.first_name} {customer.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;