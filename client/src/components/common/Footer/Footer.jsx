import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#fff",
        padding: "15px",
        textAlign: "center",
        marginTop: "20px",
      }}
    >
      <p>© {new Date().getFullYear()} GameCentral Store - Todos los derechos reservados</p>
    </footer>
  );
};
