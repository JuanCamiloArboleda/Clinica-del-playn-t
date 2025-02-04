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
  const [stores, setStores] = useState([]);
  const [newRepair, setNewRepair] = useState({
    id_product: "",
    id_order: "",
    repair_status: "",
    description: "",
    warranty_status: "",
    repairment_cost: "",
    repair_date: "",
    id_store: "",
  });
  const [editingRepairId, setEditingRepairId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchRepairs = async () => {
      const { data, error } = await supabase.from("repairs").select("*");
      if (error) {
        console.error("Error fetching repairs:", error);
      } else {
        setRepairs(data);
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

    fetchRepairs();
    fetchStores();
  }, [supabase]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveClick = async (repairId) => {
    const { error } = await supabase
      .from("repairs")
      .update({ repair_status: newStatus })
      .eq("id", repairId);

    if (error) {
      console.error("Error updating repair status:", error);
    } else {
      setRepairs(
        repairs.map((repair) =>
          repair.id === repairId ? { ...repair, repair_status: newStatus } : repair
        )
      );
      setEditingRepairId(null);
      setNewStatus("");
    }
  };

  const handleAddRepair = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("repairs")
      .insert([newRepair]);

    if (error) {
      console.error("Error adding repair:", error);
    } else {
      setRepairs([...repairs, data[0]]);
      setNewRepair({
        id_product: "",
        id_order: "",
        repair_status: "",
        description: "",
        warranty_status: "",
        repairment_cost: "",
        repair_date: "",
        id_store: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRepair({ ...newRepair, [name]: value });
  };

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
                <TableHeaderCell className="text-right">Repair Cost</TableHeaderCell>
                <TableHeaderCell className="text-right">Repair Date</TableHeaderCell>
                <TableHeaderCell>Store</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairs.map((repair) => (
                <TableRow key={repair.id}>
                  <TableCell>{repair.id}</TableCell>
                  <TableCell>{repair.id_product}</TableCell>
                  <TableCell>{repair.id_order}</TableCell>
                  <TableCell>
                    {editingRepairId === repair.id ? (
                      <input
                        type="text"
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      repair.repair_status
                    )}
                  </TableCell>
                  <TableCell>{repair.description}</TableCell>
                  <TableCell>{repair.warranty_status}</TableCell>
                  <TableCell className="text-right">${repair.repairment_cost}</TableCell>
                  <TableCell className="text-right">{repair.repair_date}</TableCell>
                  <TableCell>{repair.id_store}</TableCell>
                  <TableCell>
                    {editingRepairId === repair.id ? (
                      <button
                        onClick={() => handleSaveClick(repair.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingRepairId(repair.id);
                          setNewStatus(repair.repair_status);
                        }}
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

        {/* Formulario para agregar nuevas reparaciones */}
        <div className="mt-8 max-w-lg mx-auto p-4 border rounded shadow dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold dark:text-white">Agregar Nueva Reparación</h2>
          <form onSubmit={handleAddRepair} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Product ID</label>
              <input
                type="text"
                name="id_product"
                value={newRepair.id_product}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Order ID</label>
              <input
                type="text"
                name="id_order"
                value={newRepair.id_order}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Status</label>
              <input
                type="text"
                name="repair_status"
                value={newRepair.repair_status}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Description</label>
              <input
                type="text"
                name="description"
                value={newRepair.description}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Warranty Status</label>
              <input
                type="text"
                name="warranty_status"
                value={newRepair.warranty_status}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Repair Cost</label>
              <input
                type="number"
                name="repairment_cost"
                value={newRepair.repairment_cost}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Repair Date</label>
              <input
                type="date"
                name="repair_date"
                value={newRepair.repair_date}
                onChange={handleInputChange}
                required
                className="border rounded px-2 py-1"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">Store</label>
              <select
                name="id_store"
                value={newRepair.id_store}
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
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Agregar Reparación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Repairs;