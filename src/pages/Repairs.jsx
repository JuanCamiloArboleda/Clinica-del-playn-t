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

const Repairs = () => {
  const supabase = useSupabase();
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const fetchRepairs = async () => {
      const { data, error } = await supabase.from("repairs").select("*");
      if (error) {
        console.error("Error fetching repairs:", error);
      } else {
        setRepairs(data);
      }
    };

    fetchRepairs();
  }, [supabase]);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold dark:text-green-400">Repairs</h1>
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Repair ID</TableHeaderCell>
                <TableHeaderCell>Product ID</TableHeaderCell>
                <TableHeaderCell>Order ID</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Description</TableHeaderCell>
                <TableHeaderCell>Warranty Status</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Repair Cost
                </TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Repair Date
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairs.map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>{repair.id}</TableCell>
                  <TableCell>{repair.id_product}</TableCell>
                  <TableCell>{repair.id_order}</TableCell>
                  <TableCell>{repair.repair_status}</TableCell>
                  <TableCell>{repair.description}</TableCell>
                  <TableCell>{repair.warranty_status}</TableCell>
                  <TableCell className="text-right">
                    ${repair.repairment_cost}
                  </TableCell>
                  <TableCell className="text-right">
                    {repair.repair_date}
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

export default Repairs;
