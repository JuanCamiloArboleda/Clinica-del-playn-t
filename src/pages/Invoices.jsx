import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";

const Invoices = () => {
  const supabase = useSupabase();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase.from("invoices").select("*");
      if (error) {
        console.error("Error fetching invoices:", error);
      } else {
        setInvoices(data);
      }
    };

    fetchInvoices();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Invoices</h1>
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Invoice ID</TableHeaderCell>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Invoice Date</TableHeaderCell>
                <TableHeaderCell className="text-right">Amount</TableHeaderCell>
                <TableHeaderCell>Payment Status</TableHeaderCell>
                <TableHeaderCell>Customer ID</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.id_order}</TableCell>
                  <TableCell>{invoice.invoice_date}</TableCell>
                  <TableCell className="text-right">
                    ${invoice.amount}
                  </TableCell>
                  <TableCell>{invoice.payment_status}</TableCell>
                  <TableCell>{invoice.id_customer}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </div>
    </div>
  );
};

export default Invoices;
