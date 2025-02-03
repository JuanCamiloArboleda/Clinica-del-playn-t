import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Repairs from "./pages/Repairs";
import Invoices from "./pages/Invoices";
import FinancialReports from "./pages/FinancialReports";
import Roles from "./pages/Roles";
import { useAuth } from "./context/useAuth";
import Not_found from "./pages/Not_found";

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
      <Route
        path="/Not_found"
        element={
          <PrivateRoute>
            <Not_found />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
