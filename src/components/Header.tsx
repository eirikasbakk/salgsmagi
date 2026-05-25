import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo">Salgsmagi</Link>
      <nav className="site-nav">
        <Link to="/om">Om</Link>
      </nav>
    </header>
  );
}
