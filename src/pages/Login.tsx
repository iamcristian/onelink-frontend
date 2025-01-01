import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { loginUserSchema } from "@/schemas/userSchema";
import { isAxiosError } from "axios";
import api from "@/config/axios";

type LoginFormData = z.infer<typeof loginUserSchema>;

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (formdata: LoginFormData) => {
    try {
      const { data } = await api.post("/auth/login", formdata);
      localStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (error) {
      if (isAxiosError(error) && error.response)
        toast.error(error.response.data.message);
      else 
        toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="Enter your email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    placeholder="Enter your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
