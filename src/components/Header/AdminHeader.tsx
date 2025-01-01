import { Link } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";

const AdminHeader = () => {
  return (
    <header className="w-full bg-background/95 border-b mb-6">
      <div className="flex items-center justify-between h-14 px-4 md:px-12 lg:px-32">
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-lg font-bold">
            AdminPanel
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/admin/links" className="text-sm hover:underline">
              Links
            </Link>
            <Link to="/admin/profile" className="text-sm hover:underline">
              Profile
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Logout</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;