import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const NavBar = () => {
  const { permissions } = useAuth();
  const location = useLocation();

  const canViewEmployees = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_employees');
  const canViewCustomers = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_customers');
  const canViewProducts = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_products');
  const canViewOrders = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_orders');
  const canViewRepairs = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_repairs');
  const canViewInvoices = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_invoices');
  const canViewFinancialReports = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_financial_reports');
  const canViewRoles = permissions.some(permission => permission.permission === 'view_all' || permission.permission === 'view_roles');

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">Volver al Dashboard</Link></li>
        {canViewEmployees && location.pathname !== '/employees' && <li><Link to="/employees">Employees</Link></li>}
        {canViewCustomers && location.pathname !== '/customers' && <li><Link to="/customers">Customers</Link></li>}
        {canViewProducts && location.pathname !== '/products' && <li><Link to="/products">Products</Link></li>}
        {canViewOrders && location.pathname !== '/orders' && <li><Link to="/orders">Orders</Link></li>}
        {canViewRepairs && location.pathname !== '/repairs' && <li><Link to="/repairs">Repairs</Link></li>}
        {canViewInvoices && location.pathname !== '/invoices' && <li><Link to="/invoices">Invoices</Link></li>}
        {canViewFinancialReports && location.pathname !== '/financial-reports' && <li><Link to="/financial-reports">Financial Reports</Link></li>}
        {canViewRoles && location.pathname !== '/roles' && <li><Link to="/roles">Roles</Link></li>}
      </ul>
    </nav>
  );
};

export default NavBar;