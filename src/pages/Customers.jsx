import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

const Customers = () => {
  const supabase = useSupabase();
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });
  const [showAddCustomer, setShowAddCustomer] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!supabase) {
        console.error("Supabase client is not initialized");
        return;
      }
      const { data, error } = await supabase.from("customers").select("*");
      if (error) {
        console.error("Error fetching customers:", error);
      } else {
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, [supabase]);

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("customers").insert([newCustomer]);
    if (error) {
      console.error("Error adding customer:", error);
    } else {
      setCustomers([...customers, data[0]]);
      setNewCustomer({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
      });
      setShowAddCustomer(false);
    }
  };

  const handleDeleteCustomer = async (id) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) {
      console.error("Error deleting customer:", error);
    } else {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold text-white">Customers</h1>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowAddCustomer(!showAddCustomer)}
        >
          {showAddCustomer ? "Cancel" : "Add Customer"}
        </button>
        {showAddCustomer && (
          <form onSubmit={handleAddCustomer} className="mb-4 space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">First Name</label>
              <input
                type="text"
                name="first_name"
                value={newCustomer.first_name}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={newCustomer.last_name}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Email</label>
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={newCustomer.phone_number}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Address</label>
              <input
                type="text"
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Customer
            </button>
          </form>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {customers.map((customer) => (
            <li key={customer.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-white">
                    {customer.first_name} {customer.last_name}
                  </p>
                  <p className="mt-1 truncate text-xs text-white">
                    {customer.email}
                  </p>
                  <p className="mt-1 truncate text-xs text-white">
                    {customer.phone_number}
                  </p>
                  <p className="mt-1 truncate text-xs text-white">
                    {customer.address}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Customers;
