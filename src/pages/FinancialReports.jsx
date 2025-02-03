"use client";

import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";
import { Card } from "@/components/Card";
import { SparkAreaChart } from "@/components/SparkChart";

// Datos de ejemplo para la gráfica
const dummyChartData = [
  { month: "Jan 21", Performance: 4000 },
  { month: "Feb 21", Performance: 3000 },
  { month: "Mar 21", Performance: 2000 },
  { month: "Apr 21", Performance: 2780 },
  { month: "May 21", Performance: 1890 },
  { month: "Jun 21", Performance: 2390 },
  { month: "Jul 21", Performance: 3490 },
];

const FinancialReports = () => {
  const supabase = useSupabase();
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase
        .from("financialreports")
        .select("*");
      if (error) {
        console.error("Error fetching financial reports:", error);
      } else {
        setReports(data);
      }
    };

    fetchReports();
  }, [supabase]);

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
        <div className="space-y-4">
          {currentReports.map((report) => (
            <Card
              key={report.id}
              className="mx-auto flex max-w-lg items-center justify-between px-4 py-3.5"
            >
              {/* Izquierda: Nombre o ID de la sede y fecha del reporte */}
              <div className="flex flex-col">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {report.id_store ? `Store ${report.id_store}` : "Store"}
                </p>
                {report.report_date && (
                  <p className="text-xs text-gray-500">{report.report_date}</p>
                )}
              </div>
              {/* Centro: Gráfica de rendimiento */}
              <SparkAreaChart
                data={dummyChartData}
                categories={["Performance"]}
                index="month"
                colors={["emerald"]}
                className="h-8 w-20 sm:h-10 sm:w-36"
              />
              {/* Derecha: Balance financiero (Profit) */}
              <div className="flex items-center space-x-2.5">
                <span className="font-medium text-slate-50 dark:text-gray-300">
                  ${report.profit}
                </span>
              </div>
            </Card>
          ))}
        </div>
        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialReports;
