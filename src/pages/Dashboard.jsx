import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Dashboard = () => {
  const { user, permissions, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const canViewEmployees = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_employees');
  const canViewCustomers = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_customers');
  const canViewProducts = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_products');
  const canViewOrders = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_orders');
  const canViewRepairs = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_repairs');
  const canViewInvoices = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_invoices');
  const canViewFinancialReports = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_financial_reports');
  const canViewRoles = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_roles');

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {canViewEmployees && <li><Link to="/employees">Employees</Link></li>}
        {canViewCustomers && <li><Link to="/customers">Customers</Link></li>}
        {canViewProducts && <li><Link to="/products">Products</Link></li>}
        {canViewOrders && <li><Link to="/orders">Orders</Link></li>}
        {canViewRepairs && <li><Link to="/repairs">Repairs</Link></li>}
        {canViewInvoices && <li><Link to="/invoices">Invoices</Link></li>}
        {canViewFinancialReports && <li><Link to="/financial-reports">Financial Reports</Link></li>}
        {canViewRoles && <li><Link to="/roles">Roles</Link></li>}
      </ul>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Dashboard;