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
        <h1 className="mb-4 text-2xl font-bold dark:text-green-400">
          Customers
        </h1>
        <ul role="list" className="divide-y divide-gray-100">
          {customers.map((customer) => (
            <li
              key={customer.id}
              className="flex justify-between gap-x-6 py-5 "
            >
              <div className="flex min-w-0 gap-x-4">
                <div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    class="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold dark:text-white">
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
