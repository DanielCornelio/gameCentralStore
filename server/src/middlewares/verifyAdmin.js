export const verifyAdmin = (req, res, next) => {
  // Verificar que existe información del usuario (del middleware verifyToken)
  if (!req.user) {
    return res.status(401).json({ 
      message: "Acceso denegado: usuario no autenticado" 
    });
  }

  // Verificar que el usuario tenga rol de administrador
  if (req.user.rol !== "admin") {
    return res.status(403).json({ 
      message: "Acceso denegado: se requieren permisos de administrador"
    });
  }

  next();
};