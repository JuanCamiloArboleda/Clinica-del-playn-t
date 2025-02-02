import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Customers from './components/Customers';
import Products from './components/Products';
import Orders from './components/Orders';
import Repairs from './components/Repairs';
import Invoices from './components/Invoices';
import FinancialReports from './components/FinancialReports';
import Roles from './components/Roles';
import { useAuth } from './context/useAuth';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/employees"
        element={
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <Customers />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        }
      />
      <Route
        path="/repairs"
        element={
          <PrivateRoute>
            <Repairs />
          </PrivateRoute>
        }
      />
      <Route
        path="/invoices"
        element={
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        }
      />
      <Route
        path="/financial-reports"
        element={
          <PrivateRoute>
            <FinancialReports />
          </PrivateRoute>
        }
      />
      <Route
        path="/roles"
        element={
          <PrivateRoute>
            <Roles />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;