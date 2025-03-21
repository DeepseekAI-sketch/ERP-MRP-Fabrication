
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button 
        className="mt-6"
        onClick={() => navigate("/")}
      >
        <Home className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
