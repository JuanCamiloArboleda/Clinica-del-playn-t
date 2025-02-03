import React, { useEffect, useState } from "react";
import { useSupabase } from "../context/useSupabase";
import NavBar from "../components/NavBar";

const FinancialReports = () => {
  const supabase = useSupabase();
  const [reports, setReports] = useState([]);

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

  return (
    <div>
      <NavBar />
      <h1>Financial Reports</h1>
      <ul>
        {reports.map((report) => (
          <li key={report.id}>
            <h2>Store ID: {report.id_store}</h2>
            <p>Month: {report.month}</p>
            <p>Total Sales: ${report.total_sales}</p>
            <p>Total Expenses: ${report.total_expenses}</p>
            <p>Profit: ${report.profit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialReports;
