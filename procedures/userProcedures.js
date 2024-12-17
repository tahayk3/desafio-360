const sequelize = require("../config/database");

async function createUser(userData) {
  // Convertimos los datos del usuario en JSON
  const jsonData = JSON.stringify(userData);

  // Ejecutamos la consulta con parámetros de salida
  const [results] = await sequelize.query(
      `
      DECLARE @code INT;
      DECLARE @message NVARCHAR(MAX);
      
      EXEC InsertarUsuario
          @data = :data,
          @code = @code OUTPUT,
          @message = @message OUTPUT;
      
      SELECT @code AS code, @message AS message;
      `,
      {
          replacements: { data: jsonData }, // Pasar los datos al procedimiento
          type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
      }
  );

  // Devuelve los resultados (código y mensaje)
  return results;
}

async function changeUser(userData){
    //Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    const[results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC ActualizarUsuario
            @data = :data,
            @code = @code OUTPUT,
            @message = @message OUTPUT;
        
        SELECT @code AS code, @message AS message;
        `,
        {
            replacements: { data: jsonData }, // Pasar los datos al procedimiento
            type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
        }
    );
    return results;
}

async function desactiveUser(id_usuario){
  const [results] = await sequelize.query(
    `
    DECLARE @code INT;
    DECLARE @message NVARCHAR(MAX);

    EXEC EliminarUsuario
        @id_usuario = :id_usuario,
        @code = @code OUTPUT,
        @message = @message OUTPUT;

    SELECT @code AS code, @message AS message;
    `,
    {
        replacements: { id_usuario: id_usuario }, // Pasar el ID como parámetro
        type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
    }
);
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

module.exports = { createUser, getUser, desactiveUser, changeUser, getUsers };




