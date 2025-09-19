import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Navbar() {
  const { user, setUser } = useContext(GlobalContext);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#222", color: "#fff" }}>
      <h2 style={{ display: "inline", marginRight: "20px" }}>🎮 GameCentral</h2>
      <Link to="/" style={{ marginRight: "10px", color: "#fff" }}>Home</Link>
      <Link to="/gallery" style={{ marginRight: "10px", color: "#fff" }}>Galería</Link>
      <Link to="/create" style={{ marginRight: "10px", color: "#fff" }}>Crear</Link>

      {user ? (
        <>
          <Link to="/profile" style={{ marginRight: "10px", color: "#0f0" }}>
            Perfil
          </Link>
          <button onClick={handleLogout} style={{ background: "red", color: "white" }}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "10px", color: "#0ff" }}>Login</Link>
          <Link to="/register" style={{ color: "#0ff" }}>Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
