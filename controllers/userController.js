const {
  createUser,
  getUser,
  desactiveUser,
  changeUser,
  getUsers,
} = require("../procedures/userProcedures");

exports.addUser = async (req, res) => {
  const userData = req.body;

  console.log(userData);
  try {
    const result = await createUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params; // ID del registro que se quiere modificar
  const userData = req.body; // Datos enviados para actualización
  userData.id_usuario = id; // Asociar explícitamente el ID del usuario a los datos

  const idJwt = req.user.id; // ID del usuario autenticado (JWT)
  const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
  const activoJwt = req.user.activo; // estado del usuario

  console.log("idJwt (usuario autenticado):", idJwt);
  console.log("rolJwt (rol del JWT):", rolJwt);
  console.log("activoJwt (activo del JWT):", activoJwt);
  console.log("id (registro a modificar):", id);
  console.log("userData recibido:", userData);

  try {
    if (activoJwt === false) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }

    // Reglas para un cliente
    if (rolJwt === 2 && parseInt(idJwt) !== parseInt(id)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para modificar este usuario." });
    }

    // Reglas para un operador
    if (rolJwt === 1 && parseInt(idJwt) !== parseInt(id)) {
      const allowedFields = [
        "id_usuario",
        "activo",
        "correo",
        "nombre_completo",
        "telefono",
        "fecha_nacimiento",
        "razon_social",
        "nombre_comercial",
        "direccion_entrega",
        "id_usuario",
      ];
      const updateFields = Object.keys(userData);

      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(
        (field) => !allowedFields.includes(field)
      );
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);

      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como operador, solo puedes modificar el campo: ${allowedFields.join(
            ", "
          )}.`,
        });
      }
    }

    console.log("Pasó la validación de permisos. Procediendo a actualizar...");
    // Proceder con la actualización
    const result = await changeUser(userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // ID del registro que se quiere modificar

  const idJwt = req.user.id; // ID del usuario autenticado (JWT)
  const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
  const activoJwt = req.user.activo;

  console.log("idJwt (usuario autenticado):", idJwt);
  console.log("rolJwt (rol del JWT):", rolJwt);
  console.log("id (registro a modificar):", id);

  try {
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido o no proporcionado" });
    }

    if (activoJwt === false) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }

    //REGLAS PARA CLIENTE
    if (rolJwt === 2 && parseInt(idJwt) !== parseInt(id)) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para modificar este registro." });
    }

    //REGLAS PARA UN OPERADOR
    if (rolJwt === 1 && parseInt(idJwt) !== parseInt(id)) {
      //AQUI LA COSA
      const result = await desactiveUser(id);
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo;

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);
    console.log("id (registro a modificar):", id);

    //REGLAS PARA CLIENTE
    if (
      rolJwt === 2 &&
      activoJwt === true &&
      parseInt(idJwt) === parseInt(id)
    ) {
      const result = await getUser(id);
      res.status(201).json(result);
    }

    //REGLAS PARA OPERADOR
    else if (rolJwt === 1 && activoJwt === true) {
      const result = await getUser(id);
      res.status(201).json(result);
    } else {
      return res
        .status(403)
        .json({
          message: "No tienes permisos para acceder a esta informacion.",
        });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
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
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo;

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    // REGLAS PARA OPERADOR
    if (rolJwt === 1 && activoJwt === true) {
      const users = await getUsers(); // Obtén todos los usuarios

      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay usuarios disponibles." });
      }

      // Calcular índices de paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;

      const paginatedUsers = users.slice(startIndex, endIndex);

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(users.length / limit),
        totalRecords: users.length,
        data: paginatedUsers,
      });
    } else {
      return res
        .status(403)
        .json({
          message: "No tienes permisos para acceder a esta información.",
        });
    }
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios." });
  }
};
