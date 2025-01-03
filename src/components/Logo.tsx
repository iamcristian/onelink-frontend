import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.svg" className="w-full block" alt="Logotipo DevTree" />
    </Link>
  );
}

export default Logo;
