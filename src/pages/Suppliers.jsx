import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';

const Suppliers = () => {
  const supabase = useSupabase();
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact_info: '', address: '' });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase.from('Suppliers').select('*');
      if (error) {
        console.error('Error fetching suppliers:', error);
      } else {
        setSuppliers(data);
      }
    };

    fetchSuppliers();
  }, [supabase]);

  const addSupplier = async () => {
    const { data, error } = await supabase.from('Suppliers').insert([newSupplier]);
    if (error) {
      console.error('Error adding supplier:', error);
    } else {
      setSuppliers([...suppliers, data[0]]);
      setNewSupplier({ name: '', contact_info: '', address: '' });
    }
  };

  const deleteSupplier = async (id) => {
    const { error } = await supabase.from('Suppliers').delete().eq('id', id);
    if (error) {
      console.error('Error deleting supplier:', error);
    } else {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  return (
    <div>
      <h1>Suppliers</h1>
      <ul>
        {suppliers.map(supplier => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.contact_info}
            <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Add Supplier</h2>
      <input
        type="text"
        placeholder="Name"
        value={newSupplier.name}
        onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={newSupplier.contact_info}
        onChange={(e) => setNewSupplier({ ...newSupplier, contact_info: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={newSupplier.address}
        onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
      />
      <button onClick={addSupplier}>Add Supplier</button>
    </div>
  );
};

export default Suppliers;