
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductionPage from "./pages/ProductionPage";
import InventoryPage from "./pages/InventoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import InventoryCategoriesPage from "./pages/InventoryCategoriesPage";
import SuppliersPage from "./pages/SuppliersPage";
import CustomersPage from "./pages/CustomersPage";
import OrdersPage from "./pages/OrdersPage";
import InventoryTransfersPage from "./pages/InventoryTransfersPage";
import WarehousesPage from "./pages/WarehousesPage";
import SupportTicketsPage from "./pages/SupportTicketsPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import PromotionsPage from "./pages/PromotionsPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import ReviewsPage from "./pages/ReviewsPage";
import ShippingMethodsPage from "./pages/ShippingMethodsPage";
import SecurityLogsPage from "./pages/SecurityLogsPage";
import ProfilesPage from "./pages/ProfilesPage";
import ActivityLogsPage from "./pages/ActivityLogsPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import WorkflowsPage from "./pages/WorkflowsPage";
import AppSettingsPage from "./pages/AppSettingsPage";
import WarehouseInventoryPage from "./pages/WarehouseInventoryPage";
import OrderItemsPage from "./pages/OrderItemsPage";
import UsersPage from "./pages/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="production" element={<ProductionPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="inventory/categories" element={<InventoryCategoriesPage />} />
            <Route path="inventory/transfers" element={<InventoryTransfersPage />} />
            <Route path="warehouses" element={<WarehousesPage />} />
            <Route path="warehouse-inventory" element={<WarehouseInventoryPage />} />
            <Route path="suppliers" element={<SuppliersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="order-items" element={<OrderItemsPage />} />
            <Route path="support-tickets" element={<SupportTicketsPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="promotions" element={<PromotionsPage />} />
            <Route path="purchase-orders" element={<PurchaseOrdersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="shipping-methods" element={<ShippingMethodsPage />} />
            <Route path="security-logs" element={<SecurityLogsPage />} />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route path="activity-logs" element={<ActivityLogsPage />} />
            <Route path="subscriptions" element={<SubscriptionsPage />} />
            <Route path="workflows" element={<WorkflowsPage />} />
            <Route path="app-settings" element={<AppSettingsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
