import { ShieldOff } from "lucide-react";

export default function PreventAccessRoutes() {
  return (
    <div className="flex items-center justify-center h-[400px]">
      <div className="text-center">
        <ShieldOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Access Denied</h3>
        <p className="text-muted-foreground">
          You don't have permission to access this page.
        </p>
      </div>
    </div>
  );
}
