import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/useSupabase';
import NavBar from './NavBar';

const Orders = () => {
  const supabase = useSupabase();
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, [supabase]);

  const handleEditClick = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveClick = async (orderId) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
    } else {
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
      setEditingOrderId(null);
      setNewStatus('');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <h2>Order ID: {order.id}</h2>
            <p>Order Date: {order.order_date}</p>
            <p>Status: {editingOrderId === order.id ? (
              <input
                type="text"
                value={newStatus}
                onChange={handleStatusChange}
              />
            ) : (
              order.status
            )}</p>
            {editingOrderId === order.id ? (
              <button onClick={() => handleSaveClick(order.id)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(order.id, order.status)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;