import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import NavBar from "../components/NavBar";
import { Divider } from "@/components/Divider";
export const DividerHero = () => <Divider />;
const Dashboard = () => {
  const { user, permissions, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const canViewEmployees = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_employees"
  );
  const canViewCustomers = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_customers"
  );
  const canViewProducts = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_products"
  );
  const canViewOrders = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_orders"
  );
  const canViewRepairs = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_repairs"
  );
  const canViewInvoices = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_invoices"
  );
  const canViewFinancialReports = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_financial_reports"
  );
  const canViewRoles = permissions.some(
    (permission) =>
      permission.permission === "view_all" ||
      permission.permission === "view_roles"
  );

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Dashboard;
