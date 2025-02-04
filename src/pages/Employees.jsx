import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

const Employees = () => {
  const supabase = useSupabase();
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    id_role: "",
    id_store: "",
    salary: "",
    administrator_id: null,
  });
  const [showAddEmployee, setShowAddEmployee] = useState(false);

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

    const fetchRoles = async () => {
      const { data, error } = await supabase.from("role").select("*");
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setRoles(data);
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

    fetchEmployees();
    fetchRoles();
    fetchStores();
  }, [supabase]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from("employees").insert([newEmployee]);
    if (error) {
      console.error("Error adding employee:", error);
    } else {
      setEmployees([...employees, data[0]]);
      setNewEmployee({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        id_role: "",
        id_store: "",
        salary: "",
        administrator_id: null,
      });
      setShowAddEmployee(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) {
      console.error("Error deleting employee:", error);
    } else {
      setEmployees(employees.filter((employee) => employee.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold text-white">Employees</h1>
        <button
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowAddEmployee(!showAddEmployee)}
        >
          {showAddEmployee ? "Cancel" : "Add Employee"}
        </button>
        {showAddEmployee && (
          <form onSubmit={handleAddEmployee} className="mb-4 space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">First Name</label>
              <input
                type="text"
                name="first_name"
                value={newEmployee.first_name}
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
                value={newEmployee.last_name}
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
                value={newEmployee.email}
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
                value={newEmployee.phone_number}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Role</label>
              <select
                name="id_role"
                value={newEmployee.id_role}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Store</label>
              <select
                name="id_store"
                value={newEmployee.id_store}
                onChange={handleInputChange}
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
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Salary</label>
              <input
                type="number"
                name="salary"
                value={newEmployee.salary}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-white">Administrator ID</label>
              <input
                type="number"
                name="administrator_id"
                value={newEmployee.administrator_id || ""}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Employee
            </button>
          </form>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <li key={employee.id} className="flex justify-between gap-x-6 py-5">
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
                    {employee.first_name} {employee.last_name}
                  </p>
                  <p className="mt-1 truncate text-xs text-white">
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
                <button
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteEmployee(employee.id)}
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

export default Employees;
