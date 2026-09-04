import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CustomerList from "./pages/customers/CustomerList";
import CustomerForm from "./pages/customers/CustomerForm";
import ProductList from "./pages/products/ProductList";
import ProductForm from "./pages/products/ProductForm";
import OrderList from "./pages/orders/OrderList";
import OrderForm from "./pages/orders/OrderForm";
import BillingList from "./pages/billing/BillingList";
import PaymentList from "./pages/payments/PaymentList";
import SalesmanList from "./pages/salesmen/SalesmanList";
import GpsTracking from "./pages/gps/GpsTracking";
import VisitReports from "./pages/visits/VisitReports";
import InventoryList from "./pages/inventory/InventoryList";
import Manufacturing from "./pages/manufacturing/Manufacturing";
import Dispatch from "./pages/dispatch/Dispatch";
import Employees from "./pages/employees/Employees";
import Expenses from "./pages/expenses/Expenses";
import Complaints from "./pages/complaints/Complaints";
import Ledger from "./pages/ledger/Ledger";
import Reports from "./pages/reports/Reports";
import Analytics from "./pages/analytics/Analytics";
import Settings from "./pages/settings/Settings";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}

        <Route path="/login" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/signup" element={<AuthLayout />}>
          <Route index element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />

            <Route path="customers" element={<CustomerList />} />

            <Route path="customers/new" element={<CustomerForm />} />

            <Route path="customers/:id/edit" element={<CustomerForm />} />

            <Route path="products" element={<ProductList />} />

            <Route path="products/new" element={<ProductForm />} />

            <Route path="products/:id/edit" element={<ProductForm />} />

            <Route path="orders" element={<OrderList />} />

            <Route path="orders/new" element={<OrderForm />} />

            <Route path="billing" element={<BillingList />} />

            <Route path="payments" element={<PaymentList />} />

            <Route path="salesmen" element={<SalesmanList />} />

            <Route path="gps" element={<GpsTracking />} />

            <Route path="visits" element={<VisitReports />} />

            <Route path="inventory" element={<InventoryList />} />

            <Route path="manufacturing" element={<Manufacturing />} />

            <Route path="dispatch" element={<Dispatch />} />

            <Route path="employees" element={<Employees />} />

            <Route path="expenses" element={<Expenses />} />

            <Route path="complaints" element={<Complaints />} />

            <Route path="ledger" element={<Ledger />} />

            <Route path="reports" element={<Reports />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
