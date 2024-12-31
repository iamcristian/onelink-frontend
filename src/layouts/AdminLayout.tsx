import { Outlet, Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
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
  );
};

export default AdminLayout;
