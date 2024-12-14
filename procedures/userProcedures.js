const sequelize = require("../config/database");

async function getUsers() {
  const [results] = await sequelize.query("EXEC ListarUsuarios");
  return results;
}

async function getUser(id_usuario) {
  const [results] = await sequelize.query(
    `EXEC ConsultarUsuarioPorID
    @id_usuario = :id_usuario
    `,  {
      replacements: {id_usuario}
    });
    return results;
}

async function createUser(correo, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, id_rol, id_cliente, id_estado) {
  const [results] = await sequelize.query(
    `EXEC InsertarUsuario 
    @correo = :correo,
    @nombre_completo = :nombre_completo,
    @password = :password,
    @telefono = :telefono,
    @fecha_nacimiento = :fecha_nacimiento,
    @fecha_creacion = :fecha_creacion,
    @id_rol = :id_rol,
    @id_cliente = :id_cliente,
    @id_estado = :id_estado
    `, {
    replacements: { correo, nombre_completo,  password, telefono, fecha_nacimiento, fecha_creacion, id_rol, id_cliente, id_estado  },
  });
  return results;
}

async function desactiveUser(id_usuario){
  const [results] = await sequelize.query(
    `EXEC EliminarUsuario
    @id_usuario = :id_usuario
    `,  {
      replacements: {id_usuario}
    });
    return results;
}

async function changeUser(id_usuario, correo, nombre_completo, password, telefono, fecha_nacimiento, id_rol, id_cliente, id_estado){
  const [results] = await sequelize.query(
    `EXEC ActualizarUsuario
    @id_usuario = :id_usuario, 
    @correo = :correo,
    @nombre_completo = :nombre_completo,
    @password = :password,
    @telefono = :telefono,
    @fecha_nacimiento = :fecha_nacimiento,
    @id_rol = :id_rol,
    @id_cliente = :id_cliente,
    @id_estado = :id_estado
    `, {
    replacements: {id_usuario, correo, nombre_completo,  password, telefono, fecha_nacimiento, id_rol, id_cliente, id_estado  },
  });
  return results;
}

 
module.exports = { getUsers, createUser, getUser, desactiveUser, changeUser };




