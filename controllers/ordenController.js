const {
  createOrden,
  changeOrden,
  getOrden,
  getOrdenes,
  changeOrdenEncabezado,
  cancelarOrden
} = require("../procedures/ordenProcedures");

exports.addOrden = async (req, res) => {
  const userData = req.body;
  console.log(userData);

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    //PERMISOS, debe estar activo y ser cliente = 2 para poder añadir
    if (activoJwt === false || rolJwt !== 2) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }
    const result = await createOrden(userData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrden = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la orden
  const userData = req.body; // Obtenemos los datos de la orden desde el cuerpo del request
  userData.id_orden = id; // Agregamos el ID de la orden al objeto de datos

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);

    //operador = 1
    //cliente = 2

    //PERMISOS todos los roles
    if (activoJwt === false) {
      return res
        .status(403)
        .json({ message: "Sin permisos para realizar esta accion" });
    }

    //UN OPERADOR PUEDE MODIFICAR A OTROS ESTADOS COMO EN PAUSA O AUTORIZADA O ENTREGADA O RECHAZADA
    if (rolJwt === 1) {
      const allowedFields = ["id_orden", "nuevo_estado", "cancelar", "id_operador"];
      const updateFields = Object.keys(userData);
    
      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);
    
      // Si hay campos no permitidos, responder con error
      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como operador, solo puedes modificar los campos: ${allowedFields.join(", ")}.`,
        });
      }
    
      // Verificar la regla específica para 'cancelar'
      if ('cancelar' in userData && parseInt(userData.cancelar) !== 1) {
        const result = await changeOrden(userData);
        res.status(200).json(result); // Enviamos la respuesta
      }
    }

    // Reglas para un cliente(cancelar orden), cancelar debe ser 1, entonces aqui es !==1
    //UN CLIENTE PUEDE CANCELAR SU ORDEN Y SOLO LA DE EL
    if (rolJwt === 2) {
      const allowedFields = ["id_orden", "nuevo_estado", "cancelar", "id_operador"];
      const updateFields = Object.keys(userData);
    
      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);
    
      // Si hay campos no permitidos, responder con error
      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como operador, solo puedes modificar los campos: ${allowedFields.join(", ")}.`,
        });
      }
    
      // Verificar la regla específica para 'cancelar'
      if ('cancelar' in userData && parseInt(userData.cancelar) === 1) {
        const result = await changeOrden(userData);
        res.status(200).json(result); // Enviamos la respuesta
      }
    }

  } catch (error) {
    res.status(500).json({ error: error.message }); // Enviamos el error al cliente
  }
};

exports.updateOrdenEncabezado = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la orden
  const userData = req.body; // Obtenemos los datos de la orden desde el cuerpo del request
  userData.id_orden = id; // Agregamos el ID de la orden al objeto de datos

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);
    //cliente
    if (rolJwt === 2 && activoJwt === true) {
      const allowedFields = ["id_orden", "fecha_entrega", "id_cliente"];
      const updateFields = Object.keys(userData);
    
      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);
    
      // Si hay campos no permitidos, responder con error
      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como cliente, solo puedes modificar los campos: ${allowedFields.join(", ")}.`,
        });
      }
    
      if (parseInt(idJwt) === 'id_usuario' in userData && parseInt(userData.id_usuario)) {
        const result = await changeOrden(userData);
        res.status(200).json(result); // Enviamos la respuesta
      }
    }
    //operador
    if (rolJwt === 1 && activoJwt === true) {
      const allowedFields = ["id_orden", "fecha_entrega", "total_orden", "activo", "id_operador"];
      const updateFields = Object.keys(userData);
    
      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);
    
      // Si hay campos no permitidos, responder con error
      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como cliente, solo puedes modificar los campos: ${allowedFields.join(", ")}.`,
        });
      }
    
      const result = await changeOrden(userData);
      res.status(200).json(result); // Enviamos la respuesta
    }

    const result = await changeOrdenEncabezado(userData);
    res.status(200).json(result); // Enviamos la respuesta al cliente
  } catch (error) {
    res.status(500).json({ error: error.message }); // Enviamos el error al cliente
  }
};

exports.getOrdenById = async (req, res) => {
  const { id } = req.params; // ID de la orden a buscar
  const { id: idJwt, id_rol: rolJwt } = req.user; // ID y rol del usuario autenticado

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID de la orden inválido o no proporcionado" });
  }

  try {
    // Obtener la orden por el ID
    const result = await getOrden(id);

    if (!result) {
      return res.status(404).json({ message: "Orden no encontrada." });
    }

    const idCliente = result[0]?.id_cliente;

    // Verificar permisos según el rol
    if (rolJwt === 2) {
      // Cliente solo puede acceder a sus propias órdenes
      if (parseInt(idCliente) !== parseInt(idJwt)) {
        return res.status(403).json({ message: "No tienes permiso para acceder a esta orden." });
      }
    }

    // Los operadores (rol 1) pueden ver cualquier orden sin restricciones

    // Respuesta exitosa
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener la orden:", error);
    res.status(500).json({ error: "Error al obtener la orden." });
  }
};

exports.getAllOrdenes = async (req, res) => {
  const { id: idJwt, id_rol: rolJwt } = req.user; // Extraer ID y rol del usuario autenticado
  const page = parseInt(req.query.page) || 1; // Página solicitada, por defecto 1
  const limit = parseInt(req.query.limit) || 10; // Límite de registros por página, por defecto 10

  if (page <= 0 || limit <= 0) {
    return res.status(400).json({ message: "Los parámetros 'page' y 'limit' deben ser mayores a 0." });
  }

  try {
    const ordenes = await getOrdenes();

    if (!ordenes || ordenes.length === 0) {
      return res.status(404).json({ message: "No hay órdenes disponibles." });
    }

    console.log("Órdenes obtenidas:", ordenes);

    // Filtrar órdenes según el rol
    let filteredOrdenes;
    if (rolJwt === 2) {
      // Clientes solo pueden ver órdenes asociadas a su ID
      filteredOrdenes = ordenes.filter(orden => orden.id_cliente === parseInt(idJwt));
    } else if (rolJwt === 1) {
      // Operadores pueden ver todas las órdenes
      filteredOrdenes = ordenes;
    } else {
      // Otros roles no tienen acceso
      return res.status(403).json({ message: "No tienes permisos para ver las órdenes." });
    }

    // Calcular índices de paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedOrdenes = filteredOrdenes.slice(startIndex, endIndex);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(filteredOrdenes.length / limit),
      totalRecords: filteredOrdenes.length,
      data: paginatedOrdenes,
    });
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    res.status(500).json({ error: "Error al obtener las órdenes." });
  }
};

//Cancelar orden 
exports.updateCancelarOrden = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la orden

  try {
    const idJwt = req.user.id; // ID del usuario autenticado (JWT)
    const rolJwt = req.user.id_rol; // Rol del usuario autenticado (JWT)
    const activoJwt = req.user.activo; // estado del usuario

    console.log("idJwt (usuario autenticado):", idJwt);
    console.log("rolJwt (rol del JWT):", rolJwt);
    console.log("activoJwt (activo del JWT):", activoJwt);
    //cliente
    if (rolJwt === 2 && activoJwt === true) {
      console.log("lo que se esta enviando es:", id);
      const result = await cancelarOrden(id);
      res.status(200).json(result); // Enviamos la respuesta
    }
    else{
      return res.status(403).json({ message: "No tienes permiso para acceder a esta orden." });
    }

  } catch (error) {
    res.status(500).json({ error: error.message }); // Enviamos el error al cliente
  }
};


