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
  const { id } = req.params;
  const userData = req.body;
  userData.id_producto = id;

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
  try {
    const users = await getProductos();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
