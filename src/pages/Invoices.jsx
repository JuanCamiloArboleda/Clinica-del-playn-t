import React, { useEffect, useState } from 'react';
import { useSupabase } from '../context/useSupabase';
import NavBar from './NavBar';

const Invoices = () => {
  const supabase = useSupabase();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase.from('invoices').select('*');
      if (error) {
        console.error('Error fetching invoices:', error);
      } else {
        setInvoices(data);
      }
    };

    fetchInvoices();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <h1>Invoices</h1>
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id}>
            <h2>Invoice ID: {invoice.id}</h2>
            <p>Order ID: {invoice.id_order}</p>
            <p>Invoice Date: {invoice.invoice_date}</p>
            <p>Amount: ${invoice.amount}</p>
            <p>Payment Status: {invoice.payment_status}</p>
            <p>Customer ID: {invoice.id_customer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Invoices;