const sequelize = require("../config/database");

async function createProduct(userData) {
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

async function changeProducto(userData) {
  //Convertimos los datos del usuario en JSON
  const jsonData = JSON.stringify(userData);

  const [results] = await sequelize.query(
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

async function desactiveProducto(id_producto) {
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

async function getProduct(id_producto) {
  const [results] = await sequelize.query(
    `EXEC ConsultarProductoPorID
            @id_producto = :id_producto
        `,
    {
      replacements: { id_producto },
    }
  );
  return results;
}

async function getProductos(filtros) {
  const query = `
          EXEC ListarProductos
            @nombre = :nombre,
            @marca = :marca,
            @precioMin = :precioMin,
            @precioMax = :precioMax,
            @activo = :activo,
            @categoria = :categoria
        `;

  const [results] = await sequelize.query(query, {
    replacements: {
      // Si no hay filtro, mandamos una cadena vacía en lugar de NULL.
      nombre: filtros.nombre || "",
      marca: filtros.marca || "",
      precioMin: filtros.precioMin || null, // Usamos null para este filtro
      precioMax: filtros.precioMax || null, // Usamos null para este filtro
      activo: filtros.activo !== undefined && filtros.activo !== null 
      ? filtros.activo 
      : null,
      categoria: filtros.categoria || null,
    },
  });

  return results;
}

module.exports = {
  createProduct,
  changeProducto,
  desactiveProducto,
  getProduct,
  getProductos,
};
