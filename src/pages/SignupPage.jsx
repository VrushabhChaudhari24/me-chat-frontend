import { useState } from "react";
import AuthLayout from "../components/layout/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { registerUser } from "../services/auth.service";
import { isValidMobileNumber } from "../utils/validators";
import { toast } from "react-toastify";
import { useAuth } from "../state/AuthContext";

const SignupPage = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !mobile.trim()) {
      toast.error("Name is required");
      setError("Name is required");
      return;
    }
    if (!isValidMobileNumber(mobile)) {
      toast.error("Please enter a valid mobile number");
      setError("Please enter a valid mobile number");
      return;
    }
    
    try {
      setLoading(true);
      const data = await registerUser({ name, mobile });
      await login(data.user.mobile);
      toast.success("Account created successfully");
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button type="submit">
          {loading ? "Creating..." : "Sign up"}
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-primary font-medium">
          Login
        </a>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;
