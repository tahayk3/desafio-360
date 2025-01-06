const {
  createCategoriaProducto,
  changeCategoriaProducto,
  desactiveCategoriaProducto,
  getCategoriaProducto,
  getCategoriasProductos,
} = require("../procedures/categoriaProductosProcedures");

exports.addCategoriaProducto = async (req, res) => {
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

    const result = await createCategoriaProducto(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategoriaProducto = async (req, res) => {
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

    const result = await changeCategoriaProducto(userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategoriaProducto = async (req, res) => {
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
    const result = await desactiveCategoriaProducto(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoriaProductoById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }

  try {
    const result = await getCategoriaProducto(id);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategoriaProducto = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Página solicitada, por defecto 1
  const limit = parseInt(req.query.limit) || 10; // Límite de registros por página, por defecto 10

  if (page <= 0 || limit <= 0) {
    return res
      .status(400)
      .json({
        message: "Los parámetros 'page' y 'limit' deben ser mayores a 0.",
      });
  }

  try {
    // Obtén todas las categorías de productos
    const categorias = await getCategoriasProductos();

    if (!categorias || categorias.length === 0) {
      return res.status(200).json({
        data: [],
        totalPages: 0,
        currentPage: 1,
        totalRecords: 0,
      });
    }

    // Calcular índices de paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedCategorias = categorias.slice(startIndex, endIndex);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(categorias.length / limit),
      totalRecords: categorias.length,
      data: paginatedCategorias,
    });
  } catch (error) {
    console.error("Error al obtener las categorías de productos:", error);
    res
      .status(500)
      .json({ error: "Error al obtener las categorías de productos." });
  }
};
