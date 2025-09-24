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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          404
        </h1>
        <p className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
          Oops! Page not found
        </p>

        <Button
          variant="outline"
          size="lg"
          className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:text-amber-600"
          asChild
        >
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
