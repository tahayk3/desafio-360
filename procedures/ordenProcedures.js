const sequelize = require('../config/database');

async function createOrden(userData){
    //Convertimos los datos del producto en JSON
    const jsonData = JSON.stringify(userData);

    //Ejecutamos la consulta con los parametros de salida
    // Ejecutamos la consulta con parámetros de salida
    const [results] = await sequelize.query(
    `
    DECLARE @code INT;
    DECLARE @message NVARCHAR(MAX);
    
    EXEC InsertarOrden
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

async function changeOrden(userData) {
    // Convertimos los datos de la orden en JSON
    const jsonData = JSON.stringify(userData);

    const [results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);

        EXEC ActualizarOrden
            @data = :data,
            @code = @code OUTPUT,
            @message = @message OUTPUT;

        SELECT @code AS code, @message AS message;
        `,
        {
            replacements: { data: jsonData }, // Pasar el JSON al procedimiento
            type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
        }
    );
    return results;
}


async function getOrden(id_orden) {
    const [results] = await sequelize.query(
        `EXEC BuscarOrden
            @id_orden = :id_orden
        `,  {
            replacements: {id_orden}
          });
          return results;
    }

async function getOrdenes(){
    const [results] = await sequelize.query(`EXEC ListarOrdenes`);
    return results;
}

module.exports = { createOrden, changeOrden, getOrden, getOrdenes }

