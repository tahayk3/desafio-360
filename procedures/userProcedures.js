const sequelize = require("../config/database");


async function createUser(userData) {
  // Convertimos los datos del usuario en JSON
  const jsonData = JSON.stringify(userData);

  const [results] = await sequelize.query(
    `
    EXEC InsertarUsuario 
    @data = :data
    `, 
    {
      replacements: { data: jsonData }, 
    }
  );
  return results;
}

async function changeUser(userData){
  //Convertimos los datos del usuario en JSON
  const jsonData = JSON.stringify(userData);

  const [results] = await sequelize.query(
    `EXEC ActualizarUsuario
    @data = :data
    `, {
    replacements: {data:jsonData  },
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


async function getUser(id_usuario) {
  const [results] = await sequelize.query(
    `EXEC ConsultarUsuarioPorID
    @id_usuario = :id_usuario
    `,  {
      replacements: {id_usuario}
    });
    return results;
}


async function getUsers() {
  const [results] = await sequelize.query("EXEC ListarUsuarios");
  return results;
}



module.exports = { getUsers, createUser, getUser, desactiveUser, changeUser };




