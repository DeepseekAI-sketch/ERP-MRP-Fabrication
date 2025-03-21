
import { useLocation, Link } from "react-router-dom";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  RefreshCw, 
  Boxes, 
  Warehouse, 
  Truck, 
  ClipboardCheck, 
  Users, 
  ShoppingCart, 
  ListOrdered, 
  PackageOpen, 
  Percent, 
  TicketCheck, 
  Star, 
  UserCog, 
  Activity, 
  Shield, 
  GitBranch, 
  Settings, 
  LogOut,
  Hammer,
  PieChart,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold">ERP System</h2>
      </SidebarHeader>
      
      <SidebarMenu>
        <SidebarMenuItem>
          <Link 
            to="/dashboard" 
            className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
              isActive('/dashboard') || isActive('/') ? "bg-secondary" : "hover:bg-secondary/80")}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuItem>
        
        <SidebarMenuItem>
          <Link 
            to="/production" 
            className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
              isActive('/production') ? "bg-secondary" : "hover:bg-secondary/80")}
          >
            <Hammer className="h-5 w-5" />
            <span>Production</span>
          </Link>
        </SidebarMenuItem>
        
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          
          <SidebarMenuItem>
            <Link 
              to="/inventory" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/inventory') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Package className="h-5 w-5" />
              <span>Inventory</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/inventory/categories" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/inventory/categories') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Tags className="h-5 w-5" />
              <span>Categories</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/inventory/transfers" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/inventory/transfers') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <RefreshCw className="h-5 w-5" />
              <span>Transfers</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          
          <SidebarMenuItem>
            <Link 
              to="/warehouses" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/warehouses') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Warehouse className="h-5 w-5" />
              <span>Warehouses</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/suppliers" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/suppliers') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Truck className="h-5 w-5" />
              <span>Suppliers</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/purchase-orders" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/purchase-orders') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <ClipboardCheck className="h-5 w-5" />
              <span>Purchase Orders</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Sales</SidebarGroupLabel>
          
          <SidebarMenuItem>
            <Link 
              to="/customers" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/customers') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Users className="h-5 w-5" />
              <span>Customers</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/orders" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/orders') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Orders</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          
          <SidebarMenuItem>
            <Link 
              to="/users" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/users') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <UserCog className="h-5 w-5" />
              <span>Users</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/reports" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/reports') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <PieChart className="h-5 w-5" />
              <span>Reports</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/app-settings" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/app-settings') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <Settings className="h-5 w-5" />
              <span>App Settings</span>
            </Link>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Link 
              to="/settings" 
              className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", 
                isActive('/settings') ? "bg-secondary" : "hover:bg-secondary/80")}
            >
              <FileText className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarMenu>
      
      <SidebarFooter>
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
