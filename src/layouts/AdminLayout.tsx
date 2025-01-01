import { Outlet, Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHeader from "@/components/header/AdminHeader";

const AdminLayout = () => {
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
