import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const FinancialReports = () => {
  const supabase = useSupabase();
  const [reports, setReports] = useState([]);
  const [stores, setStores] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [repairs, setRepairs] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [chartData, setChartData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('financialreports').select('*');
      if (error) {
        console.error('Error fetching financial reports:', error);
      } else {
        setReports(data);
        generateChartData(data);
      }
    };

    const fetchStores = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('stores').select('*');
      if (error) {
        console.error('Error fetching stores:', error);
      } else {
        setStores(data);
      }
    };

    const fetchEmployees = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('employees').select('*');
      if (error) {
        console.error('Error fetching employees:', error);
      } else {
        setEmployees(data);
      }
    };

    const fetchOrders = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('orders').select('*');
      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        setOrders(data);
      }
    };

    const fetchRepairs = async () => {
      if (!supabase) return;
      const { data, error } = await supabase.from('repairs').select('*');
      if (error) {
        console.error('Error fetching repairs:', error);
      } else {
        setRepairs(data);
      }
    };

    fetchReports();
    fetchStores();
    fetchEmployees();
    fetchOrders();
    fetchRepairs();
  }, [supabase]);

  const generateChartData = (data) => {
    const groupedData = data.reduce((acc, report) => {
      const month = new Date(report.month).toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = { month, Profit: 0, Loss: 0 };
      }
      acc[month].Profit += report.profit;
      acc[month].Loss += report.total_expenses;
      return acc;
    }, {});

    // Agregar los salarios de los empleados como pérdidas
    employees.forEach(employee => {
      const month = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });
      if (!groupedData[month]) {
        groupedData[month] = { month, Profit: 0, Loss: 0 };
      }
      groupedData[month].Loss += employee.salary;
    });

    setChartData(Object.values(groupedData));
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
    const filteredReports = reports.filter(report => report.id_store === parseInt(e.target.value));
    generateChartData(filteredReports);
  };

  // Filtrar datos según la tienda seleccionada
  const filteredEmployees = selectedStore ? employees.filter(employee => employee.id_store === parseInt(selectedStore)) : employees;
  const filteredOrders = selectedStore ? orders.filter(order => order.id_store === parseInt(selectedStore)) : orders;
  const filteredRepairs = selectedStore ? repairs.filter(repair => repair.id_store === parseInt(selectedStore)) : repairs;

  // Cálculos para la paginación
  const totalPages = Math.ceil(reports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReports = reports.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-bold dark:text-green-400">
          Financial Reports
        </h1>
        <div className="mb-4">
          <label className="mr-2 font-medium dark:text-white">Select Store:</label>
          <select value={selectedStore} onChange={handleStoreChange} className="border rounded px-2 py-1">
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store.id} value={store.id}>{store.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold dark:text-white">Ganancias y Pérdidas Mensuales</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Profit" fill="#82ca9d" />
                <Bar dataKey="Loss" fill="#ff6b6b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">No data available</p>
          )}
        </div>
        {/* Listado de Empleados */}
        {selectedStore && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold dark:text-white">Empleados</h2>
            <ul className="space-y-2">
              {filteredEmployees.map(employee => {
                const store = stores.find(store => store.id === employee.id_store);
                return (
                  <li key={employee.id} className="flex justify-between items-center p-4 border rounded">
                    <div>
                      <p className="font-medium text-white">{employee.first_name} {employee.last_name}</p>
                      <p className="text-sm text-white">Store: {store ? store.name : "N/A"}</p>
                      <p className="text-sm text-white">Concept: Salary</p>
                    </div>
                    <div className="text-sm text-white">-${employee.salary ? employee.salary.toFixed(2) : '0.00'}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {/* Listado de Órdenes */}
        {selectedStore && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold dark:text-white">Órdenes</h2>
            <ul className="space-y-2">
              {filteredOrders.map(order => (
                <li key={order.id} className="flex justify-between items-center p-4 border rounded">
                  <div>
                    <p className="font-medium text-white">Order ID: {order.id}</p>
                    <p className="text-sm text-white">Store: {order.id_store}</p>
                    <p className="text-sm text-white">Total: ${order.total ? order.total.toFixed(2) : '0.00'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Listado de Reparaciones */}
        {selectedStore && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold dark:text-white">Reparaciones</h2>
            <ul className="space-y-2">
              {filteredRepairs.map(repair => (
                <li key={repair.id} className="flex justify-between items-center p-4 border rounded">
                  <div>
                    <p className="font-medium text-white">Repair ID: {repair.id}</p>
                    <p className="text-sm text-white">Store: {repair.id_store}</p>
                    <p className="text-sm text-white">Cost: ${repair.repairment_cost ? repair.repairment_cost.toFixed(2) : '0.00'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReports;