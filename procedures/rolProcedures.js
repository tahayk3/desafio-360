const sequelize = require("../config/database");

async function createRol(userData) {
    // Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    // Ejecutamos la consulta con parámetros de salida
    const [results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC InsertarRol
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

async function changeRol(userData){
    //Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    const[results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC ActualizarRol
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

async function desactiveRol(id_rol){
    
    const [results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);

        EXEC EliminarRol
            @id_rol = :id_rol,
            @code = @code OUTPUT,
            @message = @message OUTPUT;

        SELECT @code AS code, @message AS message;
        `,
        {
            replacements: { id_rol: id_rol }, // Pasar el ID como parámetro
            type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
        }
    );
    return results;
}

async function getRol(id_rol) {
    const [results] = await sequelize.query(
      `EXEC BuscarRolPorId
      @id_rol = :id_rol
      `,  {
        replacements: {id_rol}
      });
      return results;
}

async function getRoles() {
    const [results] = await sequelize.query("EXEC ListarRoles");
    return results;
}


module.exports = {createRol, changeRol, desactiveRol, getRol, getRoles};