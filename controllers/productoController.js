const {
  createProduct,
  changeProducto,
  desactiveProducto,
  getProduct,
  getProductos,
} = require("../procedures/productoProcedures");

exports.addProducto = async (req, res) => {
  const userData = req.body;
  console.log(userData);

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    //PERMISOS, debe estar activo y ser operador = 1 para poder añadir
    if (activoJwt === false || rolJwt !== 1) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }

    const result = await createProduct(userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  const userData = req.body;

  console.log(userData);

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    //PERMISOS, debe estar activo y ser operador = 1 para poder añadir
    if (activoJwt === false || rolJwt !== 1) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }

    const result = await changeProducto(userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }
  console.log(id);

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    //PERMISOS, debe estar activo y ser operador = 1 para poder añadir
    if (activoJwt === false || rolJwt !== 1) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }
    const result = await desactiveProducto(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductoById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }
  console.log(id);

  try {
    const result = await getProduct(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllProductos = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página solicitada, por defecto 1
  const limit = parseInt(req.query.limit) || 10; // Límite de registros por página, por defecto 10

  // Obtener los parámetros de filtro de la solicitud
  const { name, priceMin, priceMax, active, category } = req.query;

  console.log("Los filtros recibidos son:", name, priceMin, priceMax, active, category);

  // Preparar los filtros a pasar a la función `getProductos`
  const filters = {
    nombre: name || "", // Si no hay nombre, ponemos cadena vacía
    precioMin: priceMin || null, // Si no hay precio mínimo, ponemos null
    precioMax: priceMax || null, // Si no hay precio máximo, ponemos null
    activo: active !== undefined ? (active === '1' ? 1 : 0) : null, // Convertimos '1' a 1 (activo) y '0' a 0 (inactivo)
    categoria: category || null,
  };

  // Asegurarse de que los parámetros de paginación son correctos
  if (page <= 0 || limit <= 0) {
    return res
      .status(400)
      .json({ message: "Los parámetros 'page' y 'limit' deben ser mayores a 0." });
  }

  try {
    // Llamar a la función `getProductos` y obtener los resultados de la base de datos
    let productos = await getProductos(filters); 

    // Si no se encuentran productos
    if (!productos || productos.length === 0) {
      return res.status(200).json({
        data: [],
        totalPages: 0,
        currentPage: 1,
        totalRecords: 0,
      });
    }


    

    console.log("Productos obtenidos:", productos);

    // Calcular los índices para la paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Obtener los productos de la página solicitada
    const paginatedProductos = productos.slice(startIndex, endIndex);

    // Enviar la respuesta con los datos de los productos
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(productos.length / limit),
      totalRecords: productos.length,
      data: paginatedProductos,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};

