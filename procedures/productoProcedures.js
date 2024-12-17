const sequelize = require('../config/database');

async function createProduct(userData){
    //Convertimos los datos del producto en JSON
    const jsonData = JSON.stringify(userData);

    //Ejecutamos la consulta con los parametros de salida
    // Ejecutamos la consulta con parámetros de salida
    const [results] = await sequelize.query(
    `
    DECLARE @code INT;
    DECLARE @message NVARCHAR(MAX);
    
    EXEC InsertarProducto
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


async function changeProducto(userData){
    //Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    const[results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC ActualizarProducto
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

async function desactiveProducto(id_producto){
    const [results] = await sequelize.query(
      `
      DECLARE @code INT;
      DECLARE @message NVARCHAR(MAX);
  
      EXEC EliminarProducto
          @id_producto = :id_producto,
          @code = @code OUTPUT,
          @message = @message OUTPUT;
  
      SELECT @code AS code, @message AS message;
      `,
      {
          replacements: { id_producto: id_producto }, // Pasar el ID como parámetro
          type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
      }
  );
      return results;
}


async function getProduct(id_usuario) {
    const [results] = await sequelize.query(
        `EXEC ConsultarUsuarioPorID
            @id_usuario = :id_usuario
        `,  {
            replacements: {id_usuario}
          });
          return results;
    }

async function getProductos(){
    const [results] = await sequelize.query(`EXEC ListarProductos`);
    return results;
}


module.exports = { createProduct, changeProducto, desactiveProducto, getProduct, getProductos }


