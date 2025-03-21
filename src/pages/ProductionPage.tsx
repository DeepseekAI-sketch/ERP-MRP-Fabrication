
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  ClipboardCheck, 
  AlertTriangle,
  Search,
  Filter,
  ChevronRight,
  Plus
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for the production orders
const productionOrders = [
  {
    id: "PO-2023-0125",
    product: "Acme Widget X500",
    quantity: 150,
    completed: 0,
    status: "not-started",
    startDate: "2023-07-12",
    dueDate: "2023-07-20",
    customer: "TechCorp Industries",
    priority: "high"
  },
  {
    id: "PO-2023-0124",
    product: "Super Gadget Pro",
    quantity: 75,
    completed: 30,
    status: "in-progress",
    startDate: "2023-07-10",
    dueDate: "2023-07-18",
    customer: "Mega Electronics",
    priority: "medium"
  },
  {
    id: "PO-2023-0123",
    product: "Precision Tool T100",
    quantity: 200,
    completed: 200,
    status: "completed",
    startDate: "2023-07-05",
    dueDate: "2023-07-15",
    customer: "BuildRight LLC",
    priority: "medium"
  },
  {
    id: "PO-2023-0122",
    product: "Connector XL-550",
    quantity: 300,
    completed: 145,
    status: "in-progress",
    startDate: "2023-07-08",
    dueDate: "2023-07-16",
    customer: "Assembly Solutions",
    priority: "low"
  },
  {
    id: "PO-2023-0121",
    product: "Power Unit P1000",
    quantity: 50,
    completed: 0,
    status: "delayed",
    startDate: "2023-07-01",
    dueDate: "2023-07-10",
    customer: "Energy Systems Inc.",
    priority: "high"
  },
  {
    id: "PO-2023-0120",
    product: "Control Module C200",
    quantity: 100,
    completed: 100,
    status: "completed",
    startDate: "2023-06-28",
    dueDate: "2023-07-08",
    customer: "Automation Pro",
    priority: "medium"
  },
];

const ProductionPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredOrders = productionOrders.filter(order => 
    order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusCounts = () => {
    return {
      notStarted: productionOrders.filter(order => order.status === "not-started").length,
      inProgress: productionOrders.filter(order => order.status === "in-progress").length,
      completed: productionOrders.filter(order => order.status === "completed").length,
      delayed: productionOrders.filter(order => order.status === "delayed").length,
    };
  };
  
  const statusCounts = getStatusCounts();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Production</h1>
          <p className="text-muted-foreground">Manage manufacturing orders and operations</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Order
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        <StatusCard 
          title="Not Started" 
          count={statusCounts.notStarted} 
          icon={<ClipboardCheck className="h-5 w-5" />} 
          color="secondary"
        />
        <StatusCard 
          title="In Progress" 
          count={statusCounts.inProgress} 
          icon={<Clock className="h-5 w-5" />} 
          color="primary"
        />
        <StatusCard 
          title="Completed" 
          count={statusCounts.completed} 
          icon={<CheckCircle2 className="h-5 w-5" />} 
          color="success"
        />
        <StatusCard 
          title="Delayed" 
          count={statusCounts.delayed} 
          icon={<AlertTriangle className="h-5 w-5" />} 
          color="danger"
        />
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sm:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Not Started</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>Delayed</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>High</DropdownMenuItem>
              <DropdownMenuItem>Medium</DropdownMenuItem>
              <DropdownMenuItem>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-350px)] rounded-md border">
              <div className="p-4 space-y-4">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <ProductionOrderCard key={order.id} order={order} />
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No production orders found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="active">
            <ScrollArea className="h-[calc(100vh-350px)] rounded-md border">
              <div className="p-4 space-y-4">
                {filteredOrders.filter(order => order.status !== "completed").length > 0 ? (
                  filteredOrders
                    .filter(order => order.status !== "completed")
                    .map((order) => (
                      <ProductionOrderCard key={order.id} order={order} />
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No active production orders found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="completed">
            <ScrollArea className="h-[calc(100vh-350px)] rounded-md border">
              <div className="p-4 space-y-4">
                {filteredOrders.filter(order => order.status === "completed").length > 0 ? (
                  filteredOrders
                    .filter(order => order.status === "completed")
                    .map((order) => (
                      <ProductionOrderCard key={order.id} order={order} />
                    ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No completed production orders found</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const StatusCard = ({ 
  title, 
  count, 
  icon, 
  color 
}: { 
  title: string; 
  count: number; 
  icon: React.ReactNode; 
  color: "primary" | "secondary" | "success" | "danger";
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-300";
      case "danger":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-300";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{count}</p>
          </div>
          <div className={`p-2 rounded-full ${getColorClasses()}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  completed: number;
  status: string;
  startDate: string;
  dueDate: string;
  customer: string;
  priority: string;
}

const ProductionOrderCard = ({ order }: { order: ProductionOrder }) => {
  const getStatusBadge = () => {
    switch (order.status) {
      case "not-started":
        return <Badge variant="secondary">Not Started</Badge>;
      case "in-progress":
        return <Badge variant="default">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "delayed":
        return <Badge variant="destructive">Delayed</Badge>;
      default:
        return <Badge variant="outline">{order.status}</Badge>;
    }
  };
  
  const getPriorityBadge = () => {
    switch (order.priority) {
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-500">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Low</Badge>;
      default:
        return null;
    }
  };
  
  const getProgressPercentage = () => {
    return Math.round((order.completed / order.quantity) * 100);
  };
  
  return (
    <Card className="mobile-erp-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.product}</CardTitle>
            <CardDescription>{order.id} • Customer: {order.customer}</CardDescription>
          </div>
          <div className="flex space-x-2">
            {getStatusBadge()}
            {getPriorityBadge()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-lg font-medium">{order.quantity}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-lg font-medium">{order.completed}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-lg font-medium">{order.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Due Date</p>
            <p className="text-lg font-medium">{order.dueDate}</p>
          </div>
        </div>
        
        {order.status === "in-progress" && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="ml-auto">
          Details
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductionPage;
