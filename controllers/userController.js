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

exports.updateUser = async (req, res) =>{
  const {id} = req.params;
  const userData = req.body;
  userData.id_usuario = id;

  console.log(userData);
  
  try{
    const result = await changeUser(userData);
    res.status(200).json(result);
  }catch(error)
  {
    res.status(500).json({error: error.message});
  }
}

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