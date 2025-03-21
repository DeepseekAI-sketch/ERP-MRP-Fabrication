
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Factory, 
  Package, 
  ShoppingCart, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

// Sample data that would normally come from an API
const summaryData = {
  production: { 
    total: 24,
    completed: 18,
    inProgress: 4,
    notStarted: 2,
    delayed: 1
  },
  inventory: {
    totalItems: 156,
    lowStock: 12,
    outOfStock: 3,
    value: 125600
  },
  sales: {
    totalOrders: 48,
    pending: 12,
    completed: 36,
    todaySales: 4,
    value: 15240
  }
};

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your manufacturing operations</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="Production Orders" 
          value={summaryData.production.total.toString()} 
          description="Manufacturing orders" 
          icon={<Factory className="h-4 w-4" />}
          trend={"+2 from yesterday"}
          trendUp={true}
        />
        
        <DashboardCard 
          title="Inventory Status" 
          value={summaryData.inventory.totalItems.toString()} 
          description="Total items in stock" 
          icon={<Package className="h-4 w-4" />}
          alert={summaryData.inventory.lowStock > 0 ? `${summaryData.inventory.lowStock} low stock items` : undefined}
        />
        
        <DashboardCard 
          title="Sales Orders" 
          value={summaryData.sales.totalOrders.toString()} 
          description="Total customer orders" 
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={`+${summaryData.sales.todaySales} today`}
          trendUp={true}
        />
      </div>
      
      <Tabs defaultValue="production" className="space-y-4">
        <TabsList>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Status</CardTitle>
              <CardDescription>Overview of all production orders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion Rate</span>
                  <span className="font-medium">{Math.round((summaryData.production.completed / summaryData.production.total) * 100)}%</span>
                </div>
                <Progress value={(summaryData.production.completed / summaryData.production.total) * 100} />
              </div>
              
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Completed</span>
                  <p className="text-2xl font-bold flex items-center">
                    {summaryData.production.completed}
                    <CheckCircle className="ml-1 h-4 w-4 text-green-500" />
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">In Progress</span>
                  <p className="text-2xl font-bold flex items-center">
                    {summaryData.production.inProgress}
                    <Clock className="ml-1 h-4 w-4 text-blue-500" />
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Not Started</span>
                  <p className="text-2xl font-bold">
                    {summaryData.production.notStarted}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Delayed</span>
                  <p className="text-2xl font-bold flex items-center">
                    {summaryData.production.delayed}
                    <AlertTriangle className="ml-1 h-4 w-4 text-red-500" />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Production Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ProductionOrderItem 
                    id="PO-2023-0125" 
                    product="Acme Widget X500" 
                    qty={150} 
                    status="in-progress" 
                    dueDate="Tomorrow"
                  />
                  <ProductionOrderItem 
                    id="PO-2023-0124" 
                    product="Super Gadget Pro" 
                    qty={75} 
                    status="completed" 
                    dueDate="Today"
                  />
                  <ProductionOrderItem 
                    id="PO-2023-0123" 
                    product="Precision Tool T100" 
                    qty={200} 
                    status="not-started" 
                    dueDate="Next week"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResourceUtilization name="CNC Machine 1" utilization={85} />
                <ResourceUtilization name="Assembly Line A" utilization={72} />
                <ResourceUtilization name="Paint Booth 2" utilization={45} />
                <ResourceUtilization name="Quality Control" utilization={60} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Alerts</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <InventoryAlert 
                  item="Aluminum Sheet 3mm" 
                  sku="AL-3MM-1250"
                  level="low" 
                  quantity={15}
                  reorderPoint={25}
                />
                <InventoryAlert 
                  item="Steel Rod 12mm" 
                  sku="SR-12MM-500"
                  level="out" 
                  quantity={0}
                  reorderPoint={20}
                />
                <InventoryAlert 
                  item="Bearings Type A" 
                  sku="BRG-A-100"
                  level="low" 
                  quantity={42}
                  reorderPoint={50}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Stock Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <InventoryItem 
                    name="Electric Motors 1.5kW" 
                    quantity={48} 
                    value={5280} 
                  />
                  <InventoryItem 
                    name="Control Boards V2" 
                    quantity={120} 
                    value={4800} 
                  />
                  <InventoryItem 
                    name="Titanium Components" 
                    quantity={65} 
                    value={3900} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Stock Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <StockMovement 
                    item="Power Supplies" 
                    type="in" 
                    quantity={50} 
                    time="2 hours ago" 
                  />
                  <StockMovement 
                    item="Circuit Boards" 
                    type="out" 
                    quantity={25} 
                    time="3 hours ago" 
                  />
                  <StockMovement 
                    item="Plastic Housings" 
                    type="in" 
                    quantity={200} 
                    time="Yesterday" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Summary</CardTitle>
              <CardDescription>Order status and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Total Orders</span>
                  <p className="text-2xl font-bold">{summaryData.sales.totalOrders}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Pending</span>
                  <p className="text-2xl font-bold">{summaryData.sales.pending}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Completed</span>
                  <p className="text-2xl font-bold">{summaryData.sales.completed}</p>
                </div>
                
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Today's Sales</span>
                  <p className="text-2xl font-bold flex items-center">
                    {summaryData.sales.todaySales}
                    <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Order Fulfillment Rate</span>
                  <span className="font-medium">{Math.round((summaryData.sales.completed / summaryData.sales.totalOrders) * 100)}%</span>
                </div>
                <Progress value={(summaryData.sales.completed / summaryData.sales.totalOrders) * 100} />
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <SalesOrderItem 
                    id="SO-2023-0048" 
                    customer="Acme Corporation" 
                    amount={2450} 
                    status="pending" 
                    date="Today"
                  />
                  <SalesOrderItem 
                    id="SO-2023-0047" 
                    customer="TechInnovate Inc." 
                    amount={1875} 
                    status="processing" 
                    date="Yesterday"
                  />
                  <SalesOrderItem 
                    id="SO-2023-0046" 
                    customer="Global Solutions Ltd." 
                    amount={3200} 
                    status="completed" 
                    date="2 days ago"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <CustomerItem 
                    name="Acme Corporation" 
                    orders={12} 
                    revenue={28450} 
                  />
                  <CustomerItem 
                    name="TechInnovate Inc." 
                    orders={8} 
                    revenue={15920} 
                  />
                  <CustomerItem 
                    name="Global Solutions Ltd." 
                    orders={6} 
                    revenue={9800} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Dashboard components
const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendUp, 
  alert 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  alert?: string;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-1">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`text-xs mt-2 flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
            {trendUp ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingUp className="mr-1 h-3 w-3 transform rotate-180" />}
            {trend}
          </div>
        )}
        {alert && (
          <div className="text-xs mt-2 flex items-center text-amber-500">
            <AlertTriangle className="mr-1 h-3 w-3" />
            {alert}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProductionOrderItem = ({ 
  id, 
  product, 
  qty, 
  status, 
  dueDate 
}: { 
  id: string; 
  product: string; 
  qty: number; 
  status: "completed" | "in-progress" | "not-started" | "delayed"; 
  dueDate: string;
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "completed":
        return <span className="mobile-erp-badge mobile-erp-badge-success">Completed</span>;
      case "in-progress":
        return <span className="mobile-erp-badge mobile-erp-badge-primary">In Progress</span>;
      case "delayed":
        return <span className="mobile-erp-badge mobile-erp-badge-danger">Delayed</span>;
      default:
        return <span className="mobile-erp-badge mobile-erp-badge-secondary">Not Started</span>;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{product}</p>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">{id}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Qty: {qty}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {getStatusBadge()}
        <span className="text-xs text-muted-foreground mt-1">Due: {dueDate}</span>
      </div>
    </div>
  );
};

const ResourceUtilization = ({ 
  name, 
  utilization 
}: { 
  name: string; 
  utilization: number;
}) => {
  const getUtilizationColor = () => {
    if (utilization >= 90) return "text-red-500";
    if (utilization >= 75) return "text-amber-500";
    if (utilization >= 50) return "text-green-500";
    return "text-blue-500";
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{name}</span>
        <span className={`font-medium ${getUtilizationColor()}`}>{utilization}%</span>
      </div>
      <Progress value={utilization} />
    </div>
  );
};

const InventoryAlert = ({ 
  item, 
  sku,
  level, 
  quantity,
  reorderPoint
}: { 
  item: string; 
  sku: string;
  level: "low" | "out"; 
  quantity: number;
  reorderPoint: number;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{item}</p>
        <span className="text-xs text-muted-foreground">{sku}</span>
      </div>
      <div className="flex flex-col items-end">
        {level === "low" ? (
          <span className="mobile-erp-badge mobile-erp-badge-warning">Low Stock</span>
        ) : (
          <span className="mobile-erp-badge mobile-erp-badge-danger">Out of Stock</span>
        )}
        <span className="text-xs text-muted-foreground mt-1">
          {quantity} / {reorderPoint} units
        </span>
      </div>
    </div>
  );
};

const InventoryItem = ({ 
  name, 
  quantity, 
  value 
}: { 
  name: string; 
  quantity: number; 
  value: number;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{name}</p>
        <span className="text-xs text-muted-foreground">Qty: {quantity}</span>
      </div>
      <div className="text-right">
        <p className="font-medium">${value.toLocaleString()}</p>
        <span className="text-xs text-muted-foreground">${(value / quantity).toFixed(2)} per unit</span>
      </div>
    </div>
  );
};

const StockMovement = ({ 
  item, 
  type, 
  quantity, 
  time 
}: { 
  item: string; 
  type: "in" | "out"; 
  quantity: number; 
  time: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{item}</p>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
      <div className="flex flex-col items-end">
        {type === "in" ? (
          <span className="mobile-erp-badge mobile-erp-badge-success">Stock In (+{quantity})</span>
        ) : (
          <span className="mobile-erp-badge mobile-erp-badge-secondary">Stock Out (-{quantity})</span>
        )}
      </div>
    </div>
  );
};

const SalesOrderItem = ({ 
  id, 
  customer, 
  amount, 
  status, 
  date 
}: { 
  id: string; 
  customer: string; 
  amount: number; 
  status: "pending" | "processing" | "completed" | "cancelled"; 
  date: string;
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return <span className="mobile-erp-badge mobile-erp-badge-secondary">Pending</span>;
      case "processing":
        return <span className="mobile-erp-badge mobile-erp-badge-primary">Processing</span>;
      case "completed":
        return <span className="mobile-erp-badge mobile-erp-badge-success">Completed</span>;
      default:
        return <span className="mobile-erp-badge mobile-erp-badge-danger">Cancelled</span>;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{customer}</p>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">{id}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        {getStatusBadge()}
        <span className="text-sm font-medium mt-1">${amount.toLocaleString()}</span>
      </div>
    </div>
  );
};

const CustomerItem = ({ 
  name, 
  orders, 
  revenue 
}: { 
  name: string; 
  orders: number; 
  revenue: number;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{name}</p>
        <span className="text-xs text-muted-foreground">{orders} orders</span>
      </div>
      <div className="text-right">
        <p className="font-medium">${revenue.toLocaleString()}</p>
        <span className="text-xs text-muted-foreground">
          ${(revenue / orders).toFixed(2)} avg.
        </span>
      </div>
    </div>
  );
};

export default DashboardPage;
