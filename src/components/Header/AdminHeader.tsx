import { Link, useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState } from "react";

const AdminHeader = () => {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/");
  };

  return (
    <header className="z-50 w-full bg-background/95 border-b">
      <div className="flex items-center justify-between h-14">
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

          {/* Foto de perfil o icono */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-white"
            >
              {/* Aquí puede ser una foto de perfil o un ícono */}
              <span className="text-lg font-semibold">
                {user.handle.charAt(0).toUpperCase()}
              </span>
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 border rounded-md shadow-lg">
                <div className="py-2 px-4 text-sm">
                  <div className="font-medium">{user.handle}</div>
                  <div className="">{user.email}</div>
                </div>
                <div className="border-t border-neutral-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full text-left"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
