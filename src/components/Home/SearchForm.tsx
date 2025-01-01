import { Link } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function SearchForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex items-center w-full border rounded-lg overflow-hidden">
          <span className="p-2">onelink.app/</span>
          <Input
            type="text"
            placeholder="username"
            className="w-full border-none focus:!ring-transparent focus:!border-none"
          />
        </div>
        <Button size="lg">
          <Link to="/auth/register">Claim your Onelink</Link>
        </Button>
      </div>
      <p className="text-sm text-secondary">
        Start your personalized link page for free!
      </p>
    </div>
  );
}

export default SearchForm;
