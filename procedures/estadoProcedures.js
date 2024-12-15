const sequelize = require("../config/database");

async function createEstado(userData) {
    // Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    // Ejecutamos la consulta con parámetros de salida
    const [results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC InsertarEstado
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

async function changeEstado(userData){
    //Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    const[results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC ActualizarEstado
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

async function desactiveEstado(id_estado){
    
    const [results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);

        EXEC EliminarEstado
            @id_estado = :id_estado,
            @code = @code OUTPUT,
            @message = @message OUTPUT;

        SELECT @code AS code, @message AS message;
        `,
        {
            replacements: { id_estado: id_estado }, // Pasar el ID como parámetro
            type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
        }
    );
    return results;
}

async function getEstado(id_estado) {
    const [results] = await sequelize.query(
      `EXEC ConsultarEstadoPorID
      @id_estado = :id_estado
      `,  {
        replacements: {id_estado}
      });
      return results;
}

async function getEstados() {
    const [results] = await sequelize.query("EXEC ListarEstados");
    return results;
}


module.exports = {createEstado, changeEstado, desactiveEstado, getEstado, getEstados};