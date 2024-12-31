import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link to="/" className="text-2xl font-bold text-primary">
        OneLink
      </Link>
      <nav>
        <Button asChild variant="ghost">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="default">
          <Link to="/register">Register</Link>
        </Button>
      </nav>
    </header>
  );
};

export default Header;
