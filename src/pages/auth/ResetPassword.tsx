import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    // Mock token validation
    if (!token) {
      setValidToken(false);
      toast.error("This password reset link is invalid or has expired");
      return;
    }
  }, [token]);

  const handleInputChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmPassword"
  ) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    // Mock password reset
    setTimeout(() => {
      toast.success("Your password has been updated successfully");
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <Lock className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Invalid Reset Link
            </CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired. Please request
              a new one.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => navigate("/forgot-password")}
              className="w-full"
            >
              Request New Reset Link
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showPasswords.newPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("newPassword")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.newPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPasswords.confirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Password requirements:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li
                  className={
                    passwords.newPassword.length >= 6 ? "text-success" : ""
                  }
                >
                  At least 6 characters long
                </li>
                <li
                  className={
                    passwords.newPassword === passwords.confirmPassword &&
                    passwords.confirmPassword.length > 0
                      ? "text-success"
                      : ""
                  }
                >
                  Passwords match
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              variant="gradient"
              disabled={
                loading ||
                passwords.newPassword.length < 6 ||
                passwords.newPassword !== passwords.confirmPassword
              }
            >
              {loading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
