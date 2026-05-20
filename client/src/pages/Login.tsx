import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GraduationCap, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { useAuth } from "../lib/auth";
import { getTrpcClient } from "../lib/trpc-client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const handleLogin = async (data: LoginForm) => {
    setError("");
    setLoading(true);
    try {
      const client = getTrpcClient();
      const result = await client.public.login.mutate(data);
      login(result.token, result.user as any);
      if ((result.user as any).role === "admin") {
        setLocation("/admin");
      } else {
        setLocation("/student-portal");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    setError("");
    setLoading(true);
    try {
      const client = getTrpcClient();
      const result = await client.public.register.mutate({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      login(result.token, result.user as any);
      setLocation("/student-portal");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-4 bg-gradient-to-br from-gray-50 to-surface">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-3xl font-bold text-primary">
            {isRegister ? "Create Account" : "Student Login"}
          </h1>
          <p className="text-gray-500 mt-2">
            {isRegister
              ? "Register for access to training materials"
              : "Sign in to access your training portal"}
          </p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 text-sm">
                {error}
              </div>
            )}

            {isRegister ? (
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Austin Jackson"
                  error={registerForm.formState.errors.name?.message}
                  {...registerForm.register("name")}
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="ajackstaxservice@gmail.com"
                  error={registerForm.formState.errors.email?.message}
                  {...registerForm.register("email")}
                />
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    error={registerForm.formState.errors.password?.message}
                    {...registerForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Repeat your password"
                  error={registerForm.formState.errors.confirmPassword?.message}
                  {...registerForm.register("confirmPassword")}
                />
                <Button type="submit" variant="gold" className="w-full" size="lg" disabled={loading}>
                  <UserPlus className="w-5 h-5 mr-2" />
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="ajackstaxservice@gmail.com"
                  error={loginForm.formState.errors.email?.message}
                  {...loginForm.register("email")}
                />
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    error={loginForm.formState.errors.password?.message}
                    {...loginForm.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <Button type="submit" variant="gold" className="w-full" size="lg" disabled={loading}>
                  <LogIn className="w-5 h-5 mr-2" />
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError("");
                }}
                className="text-sm text-primary hover:text-gold transition font-medium"
              >
                {isRegister
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Register"}
              </button>
            </div>

            <div className="mt-4 p-4 bg-surface rounded-lg text-xs text-gray-500">
              <p className="font-medium mb-1">Demo Accounts:</p>
              <p>Admin: ajackstaxservice@gmail.com / Admin@123456</p>
              <p>Students: Register a new account to test the student portal</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}