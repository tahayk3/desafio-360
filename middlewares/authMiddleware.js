const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  // Extraer el token sin el prefijo "Bearer"
  const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;

  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded; // Agrega los datos del usuario al request para uso posterior
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};