import { Outlet, Navigate } from "react-router";
import AdminHeader from "@/components/header/AdminHeader";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/user";
import Loading from "./Loading";

const AdminLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Navigate to="/auth/login" />;
  if (data)
    return (
      <div className="flex flex-col min-h-screen px-4 md:px-12 lg:px-32">
        <AdminHeader />
          <Outlet />
      </div>
    );
};

export default AdminLayout;
