import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion";

const Roles = () => {
  const supabase = useSupabase();
  const [roles, setRoles] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Obtener roles desde Supabase
  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await supabase.from("role").select("*");
      if (error) {
        console.error("Error fetching roles:", error);
      } else {
        setRoles(data);
      }
    };

    fetchRoles();
  }, [supabase]);

  // Obtener empleados desde Supabase
  useEffect(() => {
    const fetchEmployees = async () => {
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
      <div className="p-4 text-slate-950">
        <h1 className="mb-4 text-2xl font-bold">Roles</h1>
        <Accordion type="single" className="mx-auto mt-3 max-w-2xl" collapsible>
          {roles.map((role) => (
            <AccordionItem
              className="text-slate-950"
              key={role.id}
              value={`role-${role.id}`}
            >
              <AccordionTrigger>{role.name}</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2 text-sm text-slate-950">
                  {role.description}
                </p>
                <ul role="list" className="divide-y divide-gray-950">
                  {employees
                    .filter(
                      (employee) =>
                        employee.role &&
                        employee.role.toLowerCase() === role.name.toLowerCase()
                    )
                    .map((employee) => (
                      <li
                        key={employee.id}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <img
                            alt=""
                            src={
                              employee.image_url ||
                              "https://via.placeholder.com/48"
                            }
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
                      </li>
                    ))}
                  {employees.filter(
                    (employee) =>
                      employee.role &&
                      employee.role.toLowerCase() === role.name.toLowerCase()
                  ).length === 0 && (
                    <li className="py-3 text-sm text-gray-500">
                      No employees found for this role.
                    </li>
                  )}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Roles;
