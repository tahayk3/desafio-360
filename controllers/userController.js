const { getUsers, getUser, createUser, desactiveUser, changeUser } = require("../procedures/userProcedures");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) =>{
  const {id} = req.params;

  try{
    const result = await getUser(id);
    res.status(201).json(result);
  } catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.addUser = async (req, res) => {
  const { correo, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, id_rol, id_cliente, id_estado } = req.body;
  console.log(req.body);
  try {
    const result = await createUser(correo, nombre_completo, password, telefono, fecha_nacimiento, fecha_creacion, id_rol, id_cliente, id_estado);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteUser = async (req, res) =>{
  const {id} = req.params;
  try{
    const result = await desactiveUser(id);
    res.status(201).json(result);
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

exports.updateUser = async (req, res) =>{
  const {id} = req.params;
  const { correo, nombre_completo, password, telefono, fecha_nacimiento, id_rol, id_cliente, id_estado } = req.body;
  console.log(req.body);
  try{
    const result = await changeUser(id, correo, nombre_completo, password, telefono, fecha_nacimiento, id_rol, id_cliente, id_estado);
    res.status(201).json(result);
  }
  catch(error){
    res.status(500).json({error: error.message})
  }
}


