const { createUser, getUser, desactiveUser, changeUser, getUsers } = require("../procedures/userProcedures");

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
  userData.id_usuario = id;  // Asociar explícitamente el ID del usuario a los datos

  const idJwt = req.user.id;        // ID del usuario autenticado (JWT)
  const rolJwt = req.user.id_rol;  // Rol del usuario autenticado (JWT)

  console.log("idJwt (usuario autenticado):", idJwt);
  console.log("rolJwt (rol del JWT):", rolJwt);
  console.log("id (registro a modificar):", id);
  console.log("userData recibido:", userData);

  try {
    // Reglas para un cliente
    if (rolJwt === 2 && parseInt(idJwt) !== parseInt(id)) {
      return res.status(403).json({ message: "No tienes permisos para modificar este usuario." });
    }

    // Reglas para un operador
    if (rolJwt === 1 && parseInt(idJwt) !== parseInt(id)) {
      const allowedFields = ["id_usuario", "activo"];
      const updateFields = Object.keys(userData);

      // Filtrar solo los campos que no están permitidos
      const invalidFields = updateFields.filter(field => !allowedFields.includes(field));
      console.log("Campos a modificar:", updateFields);
      console.log("Campos no permitidos:", invalidFields);

      if (invalidFields.length > 0) {
        return res.status(403).json({
          message: `Como operador, solo puedes modificar el campo: ${allowedFields.join(", ")}.`,
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

exports.deleteUser = async (req, res) =>{
  const {id} = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }
  console.log(id);

  try{
    const result = await desactiveUser(id);
    res.status(201).json(result);
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.getUserById = async (req, res) =>{
  const {id} = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "ID inválido o no proporcionado" });
  }

  try{
    const result = await getUser(id);
    res.status(201).json(result);
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};