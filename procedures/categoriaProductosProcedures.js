const sequelize = require("../config/database");

async function createCategoriaProducto(userData) {
  // Convertimos los datos del usuario en JSON
  const jsonData = JSON.stringify(userData);

  // Ejecutamos la consulta con parámetros de salida
  const [results] = await sequelize.query(
      `
      DECLARE @code INT;
      DECLARE @message NVARCHAR(MAX);
      
      EXEC InsertarCategoriaProducto
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

async function changeCategoriaProducto(userData){
    //Convertimos los datos del usuario en JSON
    const jsonData = JSON.stringify(userData);

    const[results] = await sequelize.query(
        `
        DECLARE @code INT;
        DECLARE @message NVARCHAR(MAX);
        
        EXEC ActualizarCategoriaProducto
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

async function desactiveCategoriaProducto(id_categoria_producto){
  const [results] = await sequelize.query(
    `
    DECLARE @code INT;
    DECLARE @message NVARCHAR(MAX);

    EXEC EliminarCategoriaProducto
        @id_categoria_producto = :id_categoria_producto,
        @code = @code OUTPUT,
        @message = @message OUTPUT;

    SELECT @code AS code, @message AS message;
    `,
    {
        replacements: { id_categoria_producto: id_categoria_producto }, // Pasar el ID como parámetro
        type: sequelize.QueryTypes.SELECT, // Tipo de consulta para SELECT
    }
);
    return results;
}


async function getCategoriaProducto(id_categoria_producto) {
  const [results] = await sequelize.query(
    `EXEC BuscarCategoriaProductoPorId
    @id_categoria_producto = :id_categoria_producto
    `,  {
      replacements: {id_categoria_producto}
    });
    return results;
}


async function getCategoriasProductos() {
    const [results] = await sequelize.query("EXEC ListarCategoriasProductos");
    return results;
}



module.exports = { createCategoriaProducto, changeCategoriaProducto, desactiveCategoriaProducto, getCategoriaProducto, getCategoriasProductos };

