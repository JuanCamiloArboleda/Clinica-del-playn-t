import { useEffect, useState } from 'react';
import { useSupabase } from '../context/SupabaseContext';

const Stores = () => {
  const supabase = useSupabase();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const { data, error } = await supabase.from('Stores').select('*');
      if (error) {
        console.error('Error fetching stores:', error);
      } else {
        setStores(data);
      }
    };

    fetchStores();
  }, [supabase]);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map(store => (
          <li key={store.id}>{store.name} - {store.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stores;