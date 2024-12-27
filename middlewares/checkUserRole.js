const { getUser } = require("../procedures/userProcedures"); // Ajusta la ruta según corresponda

// Middleware para verificar el rol del usuario
exports.checkUserRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      // Obtener el usuario desde el token
      const userFromToken = await getUser(req.user.id);

      if (!userFromToken || userFromToken.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const userRole = userFromToken[0].id_rol;

      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
      }

      next(); // Si tiene el rol adecuado, continuar con la siguiente función
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};