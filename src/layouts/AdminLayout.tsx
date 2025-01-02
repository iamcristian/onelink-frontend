import { Outlet, Navigate } from "react-router";
import AdminHeader from "@/components/header/AdminHeader";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import Loading from "./Loading";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";
import ProfilePreview from "@/components/ProfilePreview";

const AdminLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const NavigateInError = () => {
    localStorage.removeItem("token");
    return isError && <Navigate to="/auth/login" />;
  };

  if (isLoading) return <Loading />;
  if (isError) return <NavigateInError />;

  if (data)
    return (
      <div className="flex flex-col min-h-screen px-4 md:px-12 lg:px-32">
        <AdminHeader />
        <main className="flex-grow flex flex-col items-center justify-center">
          <div className="min-w-full mx-auto mt-8 md:mt-0 flex flex-col-reverse md:flex-row gap-8 md:gap-0 md:space-x-8 lg:space-x-24 justify-center">
            <Outlet />
            <ProfilePreview />
          </div>
        </main>
        <Toaster position="top-right" richColors />
        <Footer />
      </div>
    );
};

export default AdminLayout;
