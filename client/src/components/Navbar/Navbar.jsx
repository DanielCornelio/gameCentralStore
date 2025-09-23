import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../../context/GlobalContext";
import "./Navbar.css";

function Navbar() {
  const { user, setUser } = useContext(GlobalContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="gc-navbar">
      <div className="gc-navbar-inner">
        <NavLink to="/" className="gc-brand">🎮 GameCentral</NavLink>

        <nav className="gc-nav">
          <NavLink to="/" end className="gc-nav-link">Home</NavLink>
          <NavLink to="/gallery" className="gc-nav-link">Galería</NavLink>
          <NavLink to="/create" className="gc-nav-link">Crear</NavLink>

          {user ? (
            <>
              <NavLink to="/profile" className="gc-nav-link">Perfil</NavLink>
              <button onClick={handleLogout} className="gc-btn gc-btn-logout">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="gc-nav-link">Login</NavLink>
              <NavLink to="/register" className="gc-nav-link">Registro</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

