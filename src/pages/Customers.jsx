import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

const Customers = () => {
  const supabase = useSupabase();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from("customers").select("*");
      if (error) {
        console.error("Error fetching customers:", error);
      } else {
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Customers</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {customers.map((customer) => (
            <li key={customer.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src={customer.image_url || "https://via.placeholder.com/48"}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">
                    {customer.first_name} {customer.last_name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {customer.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-900">
                  {customer.role || "Customer"}
                </p>
                {customer.last_seen ? (
                  <p className="mt-1 text-xs text-gray-500">
                    Last seen{" "}
                    <time dateTime={customer.last_seen_date_time}>
                      {customer.last_seen}
                    </time>
                  </p>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Customers;
