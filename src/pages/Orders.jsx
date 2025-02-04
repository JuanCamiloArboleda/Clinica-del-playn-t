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
<<<<<<< HEAD
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newOrder, setNewOrder] = useState({
    order_date: "",
    status: "",
    store_id: "",
  });
  const [newOrderProduct, setNewOrderProduct] = useState({
    id_order: "",
    id_product: "",
    quantity: "",
    price_at_purchase: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showAddOrderProduct, setShowAddOrderProduct] = useState(false);
=======
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase.from("orders").select("*");
      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }
    };

<<<<<<< HEAD
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    const fetchStores = async () => {
      const { data, error } = await supabase.from("stores").select("*");
      if (error) {
        console.error("Error fetching stores:", error);
      } else {
        setStores(data);
      }
    };

    const fetchOrderProducts = async () => {
      const { data, error } = await supabase.from("ordersxproducts").select("*");
      if (error) {
        console.error("Error fetching order products:", error);
      } else {
        setOrderProducts(data);
      }
    };

    fetchOrders();
    fetchProducts();
    fetchStores();
    fetchOrderProducts();
=======
    fetchOrders();
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
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

<<<<<<< HEAD
  const handleAddOrder = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("orders")
      .insert([newOrder]);

    if (error) {
      console.error("Error adding order:", error);
    } else {
      setOrders([...orders, data[0]]);
      setNewOrder({
        order_date: "",
        status: "",
        store_id: "",
      });
      alert("Order added successfully!");
    }
  };

  const handleAddOrderProduct = async (e) => {
    e.preventDefault();

    // Check product stock
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("stock")
      .eq("id", newOrderProduct.id_product)
      .single();

    if (productError) {
      console.error("Error fetching product stock:", productError);
      return;
    }

    if (productData.stock < newOrderProduct.quantity) {
      alert("Stock insuficiente. No se puede agregar el producto a la orden.");
      return;
    }

    const { data, error } = await supabase
      .from("ordersxproducts")
      .insert([newOrderProduct]);

    if (error) {
      console.error("Error adding order product:", error);
    } else {
      setOrderProducts([...orderProducts, data[0]]);
      setNewOrderProduct({
        id_order: "",
        id_product: "",
        quantity: "",
        price_at_purchase: "",
      });

      // Update product stock
      const newStock = productData.stock - newOrderProduct.quantity;
      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", newOrderProduct.id_product);

      if (updateError) {
        console.error("Error updating product stock:", updateError);
      } else {
        if (newStock === 0) {
          alert("Producto agotado. Debe pedir más.");
        } else {
          alert("Product added to order successfully!");
        }
      }
    }
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleOrderProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrderProduct({ ...newOrderProduct, [name]: value });
  };

  const handleDetailsClick = async (orderId) => {
    const { data, error } = await supabase
      .from("ordersxproducts")
      .select("*, products(name, description)")
      .eq("id_order", orderId);

    if (error) {
      console.error("Error fetching order details:", error);
    } else {
      setSelectedOrder(orderId);
      setOrderDetails(data);
    }
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setOrderDetails([]);
  };

  const calculateTotal = () => {
    return orderDetails.reduce((total, item) => total + item.quantity * item.price_at_purchase, 0);
  };

=======
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
  return (
    <div>
      <NavBar />
      <div className="p-4">
<<<<<<< HEAD
        <h1 className="mb-4 text-2xl font-bold text-white">Orders</h1>
=======
        <h1 className="mb-4 text-2xl font-bold">Orders</h1>
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Order Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
<<<<<<< HEAD
                <TableHeaderCell>Store</TableHeaderCell>
=======
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
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
<<<<<<< HEAD
                  <TableCell>{order.store_id}</TableCell>
=======
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
                  <TableCell>
                    {editingOrderId === order.id ? (
                      <button
                        onClick={() => handleSaveClick(order.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
<<<<<<< HEAD
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(order.id, order.status)}
                          className="px-3 py-1 bg-gray-500 text-white rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDetailsClick(order.id)}
                          className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                          Details
                        </button>
                      </div>
=======
                      <button
                        onClick={() => handleEditClick(order.id, order.status)}
                        className="px-3 py-1 bg-gray-500 text-white rounded"
                      >
                        Edit
                      </button>
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableRoot>
<<<<<<< HEAD

        {/* Formulario para agregar nuevas órdenes */}
        <div className="mt-8 max-w-lg mx-auto p-4 border rounded shadow dark:border-gray-700">
          <h2
            className="mb-4 text-xl font-semibold dark:text-white cursor-pointer"
            onClick={() => setShowAddOrder(!showAddOrder)}
          >
            Agregar Nueva Orden
          </h2>
          {showAddOrder && (
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Order Date</label>
                <input
                  type="date"
                  name="order_date"
                  value={newOrder.order_date}
                  onChange={handleOrderInputChange}
                  required
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Status</label>
                <input
                  type="text"
                  name="status"
                  value={newOrder.status}
                  onChange={handleOrderInputChange}
                  required
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Store</label>
                <select
                  name="store_id"
                  value={newOrder.store_id}
                  onChange={handleOrderInputChange}
                  required
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select a store</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Agregar Orden
              </button>
            </form>
          )}
        </div>

        {/* Formulario para agregar productos a la orden */}
        <div className="mt-8 max-w-lg mx-auto p-4 border rounded shadow dark:border-gray-700">
          <h2
            className="mb-4 text-xl font-semibold dark:text-white cursor-pointer"
            onClick={() => setShowAddOrderProduct(!showAddOrderProduct)}
          >
            Agregar Producto a la Orden
          </h2>
          {showAddOrderProduct && (
            <form onSubmit={handleAddOrderProduct} className="space-y-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Order ID</label>
                <select
                  name="id_order"
                  value={newOrderProduct.id_order}
                  onChange={handleOrderProductInputChange}
                  required
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select an order</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.id}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Product</label>
                <select
                  name="id_product"
                  value={newOrderProduct.id_product}
                  onChange={handleOrderProductInputChange}
                  required
                  className="border rounded px-2 py-1"
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={newOrderProduct.quantity}
                  onChange={handleOrderProductInputChange}
                  required
                  className="border rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium dark:text-white">Price at Purchase</label>
                <input
                  type="number"
                  name="price_at_purchase"
                  value={newOrderProduct.price_at_purchase}
                  onChange={handleOrderProductInputChange}
                  required
                  className="border rounded px-2 py-1"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Agregar Producto a la Orden
              </button>
            </form>
          )}
        </div>

        {/* Detalles de la orden */}
        {selectedOrder && (
          <div className="mt-8 max-w-lg mx-auto p-4 border rounded shadow dark:border-gray-700 relative">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={handleCloseDetails}
            >
              &times;
            </button>
            <h2 className="mb-4 text-xl font-semibold dark:text-white">Detalles de la Orden {selectedOrder}</h2>
            <TableRoot>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Producto</TableHeaderCell>
                    <TableHeaderCell>Descripción</TableHeaderCell>
                    <TableHeaderCell>Cantidad</TableHeaderCell>
                    <TableHeaderCell>Precio</TableHeaderCell>
                    <TableHeaderCell>Total</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetails.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.products.name}</TableCell>
                      <TableCell>{item.products.description}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price_at_purchase}</TableCell>
                      <TableCell>${item.quantity * item.price_at_purchase}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableRoot>
            <div className="mt-4 text-right">
              <strong className="text-white">Total: ${calculateTotal()}</strong>
            </div>
          </div>
        )}
=======
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Orders;
=======
export default Orders;
>>>>>>> 54ff285a82f3b75f15404a3b5e71ecebb71f0687
