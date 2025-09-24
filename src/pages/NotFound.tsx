import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link, useLocation } from "react-router";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-white">404</span>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-3">
          <Button
            variant="gradient"
            size="lg"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          <br />
          <Button variant="outline" size="lg" asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
