import { Outlet, Link, Navigate } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="links" className="mb-6">
            <TabsList>
              <TabsTrigger value="links" asChild>
                <Link to="/admin/links">Links</Link>
              </TabsTrigger>
              <TabsTrigger value="profile" asChild>
                <Link to="/admin/profile">My Profile</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>
      </div>
    );
};

export default AdminLayout;
