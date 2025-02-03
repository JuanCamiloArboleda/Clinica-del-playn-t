import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import { Badge } from "@/components/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";

const Orders = () => {
  const supabase = useSupabase();
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error("Error fetching orders:", error);
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
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Error updating order status:", error);
    } else {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setEditingOrderId(null);
      setNewStatus("");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Orders</h1>
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Order Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.order_date}</TableCell>
                  <TableCell>
                    {editingOrderId === order.id ? (
                      <input
                        type="text"
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      <Badge
                        variant={
                          order.status === "Inactive" ? "warning" : "default"
                        }
                      >
                        {order.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingOrderId === order.id ? (
                      <button
                        onClick={() => handleSaveClick(order.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(order.id, order.status)}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Edit
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
      </div>
    </div>
  );
};

export default Orders;
