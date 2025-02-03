import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

const Employees = () => {
  const supabase = useSupabase();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!supabase) {
        console.error("Supabase client is not initialized");
        return;
      }
      const { data, error } = await supabase.from("employees").select("*");
      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(data);
      }
    };

    fetchEmployees();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold">Employees</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <li key={employee.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  alt=""
                  src={employee.image_url || "https://via.placeholder.com/48"}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">
                    {employee.first_name} {employee.last_name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500">
                    {employee.email}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm text-gray-900">{employee.role}</p>
                {employee.last_seen ? (
                  <p className="mt-1 text-xs text-gray-500">
                    Last seen{" "}
                    <time dateTime={employee.last_seen_date_time}>
                      {employee.last_seen}
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

export default Employees;
