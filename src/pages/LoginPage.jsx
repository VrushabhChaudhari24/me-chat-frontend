import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../state/AuthContext";
import { isValidMobileNumber } from "../utils/validators";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobile.length < 10) {
      setError("Mobile number must be at least 10 digits");
      return;
    }
    
    if (!isValidMobileNumber(mobile)) {
      toast.error("Please enter a valid mobile number");
      return; 
    }
    
    setLoading(true);

    try {
      await login(mobile);
      toast.success("Login successful");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Login to Mechat
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button type="submit" >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <a href="/signup" className="text-primary font-medium">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
