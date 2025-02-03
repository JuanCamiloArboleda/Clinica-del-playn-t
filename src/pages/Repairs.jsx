import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

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
      <h1>Repairs</h1>
      <ul>
        {repairs.map((repair) => (
          <li key={repair.id}>
            <h2>Repair ID: {repair.id}</h2>
            <p>Product ID: {repair.id_product}</p>
            <p>Order ID: {repair.id_order}</p>
            <p>Status: {repair.repair_status}</p>
            <p>Description: {repair.description}</p>
            <p>Warranty Status: {repair.warranty_status}</p>
            <p>Repair Cost: ${repair.repairment_cost}</p>
            <p>Repair Date: {repair.repair_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repairs;
