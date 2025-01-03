import { Link } from "react-router";

export default function NavigationTabs() {

  return (
    <div className="border-b border-neutral-900">
      <nav className="flex space-x-4">
        <Link to="/admin">Links</Link>
        <Link to="/admin/profile">My profile</Link>
      </nav>
    </div>
  );
}
