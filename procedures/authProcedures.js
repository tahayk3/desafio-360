const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

/**
 * Procedimiento para autenticar un usuario
 * @param {string} correo - Correo del usuario
 * @param {string} password - Contraseña proporcionada
 */


async function loginUser(correo, password) {
    // Buscar al usuario en la base de datos
    const [user] = await sequelize.query(
      `SELECT * FROM Usuarios WHERE correo = :correo AND activo = 1`,
      {
        replacements: { correo },
        type: sequelize.QueryTypes.SELECT,
      }
    );
  
    // Validar si el usuario existe
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
  
    // Validar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Contraseña incorrecta");
    }
  
    return user; // Retornar el usuario para usarlo en la generación del token
  }
  
  module.exports = {
    loginUser,
  }; 