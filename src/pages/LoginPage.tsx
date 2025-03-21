
import LoginForm from "@/components/auth/LoginForm";
import { Factory } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="flex items-center mb-2">
          <Factory className="h-10 w-10 text-primary mr-2" />
          <h1 className="text-2xl font-bold">MobileERP</h1>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Mobile Access to Your Manufacturing Resources
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
