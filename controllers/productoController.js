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

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({ message: "Los parámetros 'page' y 'limit' deben ser mayores a 0." });
  }

  try {
    const productos = await getProductos();

    if (!productos || productos.length === 0) {
      return res.status(404).json({ message: "No hay productos disponibles." });
    }

    console.log("Productos obtenidos:", productos);

    // Calcular índices de paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProductos = productos.slice(startIndex, endIndex);

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
